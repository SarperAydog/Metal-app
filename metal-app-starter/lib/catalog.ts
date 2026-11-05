import genresData from '@/data/genres.json';

export type City = {
  id: string;
  name: string;
  localName?: string;
  country: string;
  lat: number;
  lon: number;
  population: number;
};

export type Subgenre = { id: string; name: string };
export type Genre = { id: string; name: string; subgenres: Subgenre[] };

/** A chosen genre. `subgenreIds: null` means all of its subgenres. */
export type GenreSelection = { genreId: string; subgenreIds: string[] | null };

export const genres = genresData as Genre[];

const MAX_RESULTS = 8;
const BIG_CITY_POPULATION = 100000;
const SMALL_PLACE_POPULATION = 50000;

// The place list is large, so it loads only when first needed, not at app start.
let loadedCities: City[] | null = null;
function allCities(): City[] {
  loadedCities ??= require('@/data/cities.json') as City[];
  return loadedCities;
}

/** Lowers case and removes accents, so "Izmir" finds "İzmir" and "munchen" finds "München". */
function normalize(text: string) {
  return text
    .toLocaleLowerCase('en')
    .replace(/ß/g, 'ss')
    .replace(/ı/g, 'i')
    .normalize('NFD')
    .replace(/\p{M}/gu, '');
}

/** Also spells umlauts the German way, so "muenchen" finds "München". */
function umlautSpelling(text: string) {
  return text.toLocaleLowerCase('en').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue');
}

type IndexEntry = { city: City; keys: string[] };
let searchIndex: IndexEntry[] | null = null;
function getSearchIndex(): IndexEntry[] {
  searchIndex ??= allCities().map((city) => {
    const names = [city.name, city.localName].filter((name): name is string => Boolean(name));
    return {
      city,
      keys: [...new Set(names.flatMap((name) => [normalize(name), normalize(umlautSpelling(name))]))],
    };
  });
  return searchIndex;
}

/** Names starting with the text come first, then any word starting with it; bigger places win ties. */
export function searchCities(text: string): City[] {
  const query = normalize(text.trim());
  if (!query) return [];

  const score = (keys: string[]) => {
    if (keys.some((key) => key.startsWith(query))) return 2;
    if (keys.some((key) => key.split(/[\s-]+/).some((word) => word.startsWith(query)))) return 1;
    return 0;
  };

  return getSearchIndex()
    .map((entry) => ({ city: entry.city, score: score(entry.keys) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || b.city.population - a.city.population)
    .slice(0, MAX_RESULTS)
    .map((entry) => entry.city);
}

export function findCity(id: string | null): City | undefined {
  return id ? allCities().find((city) => city.id === id) : undefined;
}

let bigCities: City[] | null = null;

/** For small places: the closest big city in the same country. Big places return nothing. */
export function nearestBigCity(city: City): City | undefined {
  if (city.population >= SMALL_PLACE_POPULATION) return undefined;
  bigCities ??= allCities().filter((other) => other.population >= BIG_CITY_POPULATION);

  let best: City | undefined;
  let bestDistance = Infinity;
  for (const other of bigCities) {
    if (other.country !== city.country) continue;
    const x = (other.lon - city.lon) * Math.cos((city.lat * Math.PI) / 180);
    const y = other.lat - city.lat;
    const distance = x * x + y * y;
    if (distance < bestDistance) {
      best = other;
      bestDistance = distance;
    }
  }
  return best;
}

export function findGenre(id: string): Genre | undefined {
  return genres.find((genre) => genre.id === id);
}
