// Stage 0, part two: checks coverage the way the app will use it, band by band,
// and looks at what the country totals are made of. Prints counts only.
// Run from the project folder: node scripts/stage0-band-coverage.mjs
import { readFileSync } from 'node:fs';

const env = Object.fromEntries(
  readFileSync(new URL('../.env', import.meta.url), 'utf8')
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z_]+)\s*=(.*)$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].trim()]),
);
const KEY = env.TICKETMASTER_API_KEY;
const COUNTRIES = ['DE', 'AT', 'CH', 'CZ', 'TR'];
const BANDS = [
  'Metallica', 'Iron Maiden', 'Megadeth', 'Kreator', 'Amon Amarth', 'Sabaton', 'Gojira', 'Ghost',
  'Powerwolf', 'Arch Enemy', 'Behemoth', 'Mayhem', 'Dark Funeral', 'Opeth', 'Blind Guardian', 'Sodom',
  'Heaven Shall Burn', 'Parkway Drive', 'Lamb of God', 'Electric Callboy', 'Nightwish', 'Epica',
  'Dimmu Borgir', 'Watain', 'Cannibal Corpse', 'Obituary', 'Napalm Death', 'Testament', 'Exodus', 'Insomnium',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(path, params) {
  await sleep(260);
  const res = await fetch(
    `https://app.ticketmaster.com/discovery/v2/${path}?${new URLSearchParams({ ...params, apikey: KEY })}`,
  );
  if (!res.ok) throw new Error(`${path} failed with status ${res.status}`);
  return res.json();
}
const total = async (params) => (await get('events.json', { ...params, size: 1 })).page?.totalElements ?? 0;

console.log('--- What the totals are made of ---');
for (const countryCode of COUNTRIES) {
  const row = { all: await total({ countryCode }) };
  for (const classificationName of ['music', 'rock', 'metal']) {
    row[classificationName] = await total({ countryCode, classificationName });
  }
  console.log(countryCode, JSON.stringify(row));
}
for (const source of ['ticketmaster', 'universe', 'frontgate', 'tmr']) {
  console.log('DE source', source, await total({ countryCode: 'DE', source }));
}

console.log('--- Munich by genre ---');
const munich = (await get('events.json', { city: 'Munich', countryCode: 'DE', classificationName: 'music', size: 200 }))
  ._embedded?.events ?? [];
const genreCounts = {};
for (const event of munich) {
  const genre = event.classifications?.[0]?.genre?.name ?? 'none';
  genreCounts[genre] = (genreCounts[genre] ?? 0) + 1;
}
console.log(JSON.stringify(genreCounts));
for (const event of munich) {
  const genre = event.classifications?.[0]?.genre?.name;
  if (['Rock', 'Metal'].includes(genre)) {
    console.log(' ', event.dates?.start?.localDate, '|', event.name, '|', event._embedded?.venues?.[0]?.name, '|', genre);
  }
}

console.log('--- Band by band (exact name match) ---');
let found = 0;
let withEvents = 0;
for (const band of BANDS) {
  const data = await get('attractions.json', { keyword: band, size: 20 });
  const match = (data._embedded?.attractions ?? []).find((a) => a.name.toLowerCase() === band.toLowerCase());
  if (!match) {
    console.log(band, 'NOT FOUND');
    continue;
  }
  found++;
  const events = (await get('events.json', { attractionId: match.id, size: 200 }))._embedded?.events ?? [];
  const inRegion = {};
  for (const event of events) {
    const code = event._embedded?.venues?.[0]?.country?.countryCode;
    if (COUNTRIES.includes(code)) inRegion[code] = (inRegion[code] ?? 0) + 1;
  }
  if (Object.keys(inRegion).length) withEvents++;
  const c = match.classifications?.[0];
  console.log(band, '| world', events.length, '| region', JSON.stringify(inRegion), '|', c?.genre?.name, '/', c?.subGenre?.name);
}
console.log(`found ${found}/${BANDS.length}, with events in our countries ${withEvents}`);
