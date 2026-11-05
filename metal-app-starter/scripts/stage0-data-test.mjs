// Stage 0 data test: counts what Ticketmaster returns for our launch countries.
// Keeps only counts and summary names in the output; raw events are not stored.
// Run from the project folder: node scripts/stage0-data-test.mjs <output.json>
import { readFileSync, writeFileSync } from 'node:fs';

const env = Object.fromEntries(
  readFileSync(new URL('../.env', import.meta.url), 'utf8')
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z_]+)\s*=(.*)$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].trim()]),
);
const KEY = env.TICKETMASTER_API_KEY;
if (!KEY) throw new Error('TICKETMASTER_API_KEY is empty in .env');

const COUNTRIES = ['DE', 'AT', 'CH', 'CZ', 'TR'];
const MUNICH_VENUES = ['Backstage', 'Feierwerk', 'Strom', 'Olympiahalle', 'Zenith', 'Tonhalle'];
const PAUSE_MS = 260; // Ticketmaster allows 5 requests per second.
const MAX_DEEP = 1000; // Ticketmaster refuses paging past 1000 results per query.

let requests = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(path, params) {
  const query = new URLSearchParams({ ...params, apikey: KEY });
  for (let attempt = 0; attempt < 4; attempt++) {
    await sleep(PAUSE_MS);
    requests++;
    const res = await fetch(`https://app.ticketmaster.com/discovery/v2/${path}?${query}`);
    if (res.status === 429) {
      await sleep(2000);
      continue;
    }
    if (!res.ok) throw new Error(`${path} failed with status ${res.status}`);
    return res.json();
  }
  throw new Error(`${path} kept hitting the rate limit`);
}

const iso = (d) => d.toISOString().replace(/\.\d+Z$/, 'Z');

async function total(params) {
  return (await get('events.json', { ...params, size: 1 })).page?.totalElements ?? 0;
}

// Splits the date range in two whenever a window is too big to page through.
async function collect(params, from, to, out) {
  const window = { ...params, startDateTime: iso(from), endDateTime: iso(to) };
  const count = await total(window);
  if (count === 0) return;
  if (count >= MAX_DEEP) {
    const middle = new Date((from.getTime() + to.getTime()) / 2);
    await collect(params, from, middle, out);
    await collect(params, middle, to, out);
    return;
  }
  for (let page = 0; page * 200 < count; page++) {
    const data = await get('events.json', { ...window, size: 200, page });
    for (const event of data._embedded?.events ?? []) out.set(event.id, event);
  }
}

function summarize(events) {
  const cities = {};
  const venues = {};
  const genres = {};
  const subGenres = {};
  const attractions = {};
  const showKeys = new Set();
  let noAttraction = 0;
  let noVenue = 0;
  let noDate = 0;
  let noUrl = 0;

  const bump = (map, name) => {
    if (name) map[name] = (map[name] ?? 0) + 1;
  };

  for (const event of events) {
    const venue = event._embedded?.venues?.[0];
    const city = venue?.city?.name;
    const date = event.dates?.start?.localDate;
    const acts = event._embedded?.attractions ?? [];
    const classification = event.classifications?.find((c) => c.primary) ?? event.classifications?.[0];

    bump(cities, city);
    bump(venues, venue?.name && `${venue.name} (${city})`);
    bump(genres, classification?.genre?.name);
    bump(subGenres, classification?.subGenre?.name);
    for (const act of acts) bump(attractions, act.name);

    if (!acts.length) noAttraction++;
    if (!venue) noVenue++;
    if (!date) noDate++;
    if (!event.url) noUrl++;

    // Same act, venue and day means one concert listed several times (VIP, parking...).
    showKeys.add(`${acts[0]?.id ?? event.name}|${venue?.id}|${date}`);
  }

  const top = (map, n) =>
    Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n);

  return {
    listings: events.length,
    distinctShows: showKeys.size,
    missing: { attraction: noAttraction, venue: noVenue, date: noDate, url: noUrl },
    cityCount: Object.keys(cities).length,
    topCities: top(cities, 25),
    topVenues: top(venues, 15),
    genres: top(genres, 10),
    subGenres: top(subGenres, 15),
    attractionCount: Object.keys(attractions).length,
    topAttractions: top(attractions, 60),
  };
}

async function munichVenue(keyword) {
  const data = await get('venues.json', { keyword, countryCode: 'DE', size: 50 });
  const matches = (data._embedded?.venues ?? []).filter((v) => /m(ü|ue|u)nchen|munich/i.test(v.city?.name ?? ''));
  const result = [];
  for (const venue of matches) {
    const music = await total({ venueId: venue.id, classificationName: 'music' });
    result.push({ name: venue.name, musicEvents: music });
  }
  return { keyword, matches: result };
}

const now = new Date();
const end = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 365 * 2);
const report = { runAt: iso(now), countries: {}, munich: {} };

for (const countryCode of COUNTRIES) {
  const musicEvents = await total({ countryCode, classificationName: 'music' });
  const metal = new Map();
  await collect({ countryCode, classificationName: 'metal' }, now, end, metal);
  report.countries[countryCode] = { musicEvents, metal: summarize([...metal.values()]) };
  console.log(countryCode, 'music', musicEvents, 'metal listings', metal.size);
}

report.munich.musicEvents = await total({ city: 'München', countryCode: 'DE', classificationName: 'music' });
report.munich.musicEventsMunichSpelling = await total({ city: 'Munich', countryCode: 'DE', classificationName: 'music' });
report.munich.metalEvents = await total({ city: 'München', countryCode: 'DE', classificationName: 'metal' });
report.munich.venues = [];
for (const keyword of MUNICH_VENUES) report.munich.venues.push(await munichVenue(keyword));

report.requests = requests;
writeFileSync(process.argv[2] ?? 'stage0-report.json', JSON.stringify(report, null, 2));
console.log('requests used:', requests);
