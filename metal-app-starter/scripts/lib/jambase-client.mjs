// The only way our code may call JamBase. Paid plans and the Developer plan bill extra
// calls instead of stopping, so this asks JamBase for the real monthly usage before every
// call and refuses to go on near the quota. If usage cannot be read, it refuses too.
import { readFileSync } from 'node:fs';

// Calls per billing period; the free quota is 1,000. An override can only lower this.
const requested = Number(process.env.JAMBASE_HARD_LIMIT);
export const HARD_LIMIT = requested > 0 ? Math.min(requested, 900) : 900;
const PAUSE_MS = 1100;
const BASE = 'https://api.data.jambase.com/v3';

const env = Object.fromEntries(
  readFileSync(new URL('../../.env', import.meta.url), 'utf8')
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*([A-Z_]+)\s*=(.*)$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].trim()]),
);
const KEY = env.JAMBASE_API_KEY;
if (!KEY) throw new Error('JAMBASE_API_KEY is empty in .env');

const HEADERS = {
  Authorization: `Bearer ${KEY}`,
  Accept: 'application/json',
  'User-Agent': 'gigdar-coverage-test',
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Free of charge: JamBase does not count this endpoint toward the quota.
export async function readQuota() {
  const res = await fetch(`${BASE}/quota`, { headers: HEADERS });
  const text = await res.text();
  if (!res.ok) throw new Error(`Stopped: quota check failed with status ${res.status}: ${text.slice(0, 200)}`);
  const data = JSON.parse(text);
  const { usedCalls, remainingCalls, overageCalls } = data;
  if (![usedCalls, remainingCalls].every(Number.isFinite)) {
    throw new Error(`Stopped: quota response not understood. Fields: ${Object.keys(data).join(', ')}`);
  }
  return { usedCalls, remainingCalls, overageCalls: overageCalls ?? 0, raw: data };
}

export async function get(path, params = {}) {
  const { usedCalls, remainingCalls, overageCalls } = await readQuota();
  if (overageCalls > 0 || usedCalls >= HARD_LIMIT || remainingCalls <= 100) {
    throw new Error(`Stopped by hard limit: used ${usedCalls}, remaining ${remainingCalls}, overage ${overageCalls}`);
  }
  await sleep(PAUSE_MS);
  const res = await fetch(`${BASE}/${path}?${new URLSearchParams(params)}`, { headers: HEADERS });
  const text = await res.text();
  if (!res.ok) throw new Error(`${path} failed with status ${res.status}: ${text.slice(0, 200)}`);
  return JSON.parse(text);
}
