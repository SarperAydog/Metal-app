// Builds data/cities.json for the home city search from Wikidata (CC0, no attribution needed).
// Covers every municipality, so small festival towns such as Wacken can be found.
// One query per country and place type, with polite pauses.
// Run from the project folder: node scripts/build-cities.mjs
import { writeFileSync } from 'node:fs';

// Direct place types per country: towns and municipalities, not their districts.
// Turkish villages are left out: there are about 18,000 and few hold concerts.
// `big` types are too large for one Wikidata query, so they are fetched in slices of latitude.
const COUNTRIES = [
  {
    code: 'DE',
    qid: 'Q183',
    local: 'de',
    lat: [47, 55.5],
    big: ['Q116457956', 'Q262166', 'Q42744322'],
    types: ['Q22865', 'Q1549591', 'Q515'],
  },
  {
    code: 'AT',
    qid: 'Q40',
    local: 'de',
    lat: [46, 49.5],
    big: ['Q667509'],
    types: ['Q262882', 'Q13539802', 'Q562061', 'Q1549591', 'Q515'],
  },
  {
    code: 'CH',
    qid: 'Q39',
    local: 'de',
    lat: [45.5, 48],
    big: ['Q70208'],
    types: ['Q54935504', 'Q14770218', 'Q1549591', 'Q515'],
  },
  {
    code: 'CZ',
    qid: 'Q213',
    local: 'cs',
    lat: [48, 51.5],
    big: ['Q5153359'],
    types: ['Q15978299', 'Q257978', 'Q1549591', 'Q515'],
  },
  {
    code: 'TR',
    qid: 'Q43',
    local: 'tr',
    lat: [35, 43],
    big: [],
    types: ['Q3957', 'Q515', 'Q1549591', 'Q15284', 'Q2716259', 'Q2460358'],
  },
];
const SLICE_DEGREES = 0.5;
const DISTRICT_NAME = /^(Bezirk|Stadtbezirk|Stadtteil|Kreis) | Metropolitan Municipality$| Belediyesi$| Province$/i;
const SAME_PLACE_KM = 5;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function query(country, type, slice) {
  const latitudeFilter = slice
    ? `FILTER(geof:latitude(?coord) >= ${slice[0]} && geof:latitude(?coord) < ${slice[1]})`
    : '';
  const sparql = `
    PREFIX geof: <http://www.opengis.net/def/geosparql/function/>
    SELECT ?city ?en ?local ?population ?coord WHERE {
      ?city wdt:P31 wd:${type};
            wdt:P17 wd:${country.qid};
            wdt:P625 ?coord.
      ${latitudeFilter}
      FILTER NOT EXISTS { ?city wdt:P576 ?dissolved }
      OPTIONAL { ?city wdt:P1082 ?population }
      OPTIONAL { ?city rdfs:label ?en. FILTER(LANG(?en) = "en") }
      OPTIONAL { ?city rdfs:label ?local. FILTER(LANG(?local) = "${country.local}") }
    }`;
  const res = await fetch('https://query.wikidata.org/sparql', {
    method: 'POST',
    headers: {
      Accept: 'application/sparql-results+json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'GigdarCityBuilder/1.0 (data build script)',
    },
    body: new URLSearchParams({ query: sparql }),
  });
  if (!res.ok) throw new Error(`${country.code} ${type}: status ${res.status}`);
  return (await res.json()).results.bindings;
}

async function queryWithRetry(country, type, slice) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await query(country, type, slice);
    } catch (error) {
      if (attempt === 5) throw error;
      console.log(error.message, '- retrying');
      await sleep(20000 * attempt);
    }
  }
}

function distanceKm(a, b) {
  const x = (b.lon - a.lon) * Math.cos(((a.lat + b.lat) / 2) * (Math.PI / 180));
  return Math.hypot(x, b.lat - a.lat) * 111;
}

const out = [];
for (const country of COUNTRIES) {
  const byId = new Map();
  const jobs = [...country.types.map((type) => ({ type }))];
  for (const type of country.big) {
    for (let from = country.lat[0]; from < country.lat[1]; from += SLICE_DEGREES) {
      jobs.push({ type, slice: [from, from + SLICE_DEGREES] });
    }
  }
  for (const { type, slice } of jobs) {
    const rows = await queryWithRetry(country, type, slice);
    for (const row of rows) {
      const id = row.city.value.split('/').pop();
      const match = row.coord.value.match(/Point\((-?[\d.]+) (-?[\d.]+)\)/);
      const name = (row.en?.value ?? row.local?.value)?.replace(/ district$| Municipality$| \(municipality\)$/i, '');
      if (!match || !name || DISTRICT_NAME.test(name) || /^Q\d+$/.test(name)) continue;
      const population = Math.round(Number(row.population?.value ?? 0));
      const known = byId.get(id);
      if (known && known.population >= population) continue;
      byId.set(id, {
        id,
        name,
        localName: row.local?.value && row.local.value !== name ? row.local.value : undefined,
        country: country.code,
        lat: Number(Number(match[2]).toFixed(3)),
        lon: Number(Number(match[1]).toFixed(3)),
        population,
      });
    }
    await sleep(2500);
  }

  // A town and its district can both appear; same name close together is one place.
  // Same name far apart is a different place and stays (Germany has many of these).
  const kept = new Map();
  const list = [...byId.values()]
    .sort((a, b) => b.population - a.population)
    .filter((city) => {
      const sameName = kept.get(city.name) ?? [];
      if (sameName.some((other) => distanceKm(other, city) < SAME_PLACE_KM)) return false;
      kept.set(city.name, [...sameName, city]);
      return true;
    });
  console.log(country.code, 'places', list.length, '| top:', list.slice(0, 3).map((c) => c.name).join(', '));
  out.push(...list);
}

// People search by province name where it differs from the capital's name.
const ALIASES = { Antakya: 'Hatay' };
for (const city of out) {
  if (city.country === 'TR' && ALIASES[city.name]) city.localName = ALIASES[city.name];
}

writeFileSync(new URL('../data/cities.json', import.meta.url), `${JSON.stringify(out)}\n`);
console.log('total', out.length);
