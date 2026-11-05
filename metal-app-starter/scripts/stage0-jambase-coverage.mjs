// Stage 0, part three: does JamBase list the Munich club shows Ticketmaster missed?
// Prints summary fields only and stores nothing.
// Run from the project folder: node scripts/stage0-jambase-coverage.mjs
import { get, readQuota } from './lib/jambase-client.mjs';

// Metal-leaning shows read once from Backstage's public calendar on 2026-11-04.
const SHOWS = [
  ['Nasty', '2026-11-04'], ['Rising Insane', '2026-11-05'], ['Avalanche Effect', '2026-11-06'],
  ['Walls of Jericho', '2026-11-06'], ['Dust Bolt', '2026-11-07'], ['The Browning', '2026-11-08'],
  ['President', '2026-11-09'], ["Phil Campbell's Bastard Sons", '2026-11-09'], ['Archspire', '2026-11-10'],
  ['Converge', '2026-11-12'], ['Gloryhammer', '2026-11-13'], ['Tanzt', '2026-11-14'], ['ALLT', '2026-11-14'],
];
const VENUES = ['Backstage', 'Feierwerk', 'Strom', 'Olympiahalle'];

const before = await readQuota();
console.log('quota before:', JSON.stringify(before.raw));

const events = (params) => get('events', { perPage: 100, ...params });
const date = (e) => String(e.startDate ?? '').slice(0, 10);
const city = (e) => e.location?.address?.addressLocality ?? '?';
const place = (e) => `${e.location?.name ?? '?'} / ${city(e)}`;

let found = 0;
let inMunich = 0;
let shapeShown = false;
for (const [band, day] of SHOWS) {
  const data = await events({ artistName: band });
  const list = data.events ?? [];
  if (!shapeShown && list[0]) {
    console.log('event fields:', Object.keys(list[0]).join(', '));
    shapeShown = true;
  }
  const same = list.filter((e) => date(e) === day);
  if (same.length) found++;
  if (same.some((e) => /m(ü|ue|u)n(chen|ich)/i.test(city(e)))) inMunich++;
  console.log(`${band} ${day} | results ${data.pagination?.totalItems ?? list.length} | same date: ${same.map(place).join('; ') || 'none'}`);
}
console.log(`same date: ${found}/${SHOWS.length}, same date in Munich: ${inMunich}/${SHOWS.length}`);

for (const venueName of VENUES) {
  const data = await events({ venueName });
  const list = data.events ?? [];
  const munich = list.filter((e) => /m(ü|ue|u)n(chen|ich)/i.test(city(e)));
  console.log(`venue ${venueName} | results ${data.pagination?.totalItems ?? list.length} | Munich on this page ${munich.length}`);
}

const after = await readQuota();
console.log('quota after:', JSON.stringify(after.raw));
