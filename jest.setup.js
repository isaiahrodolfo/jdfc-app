const path = require("node:path");
const dotenv = require("dotenv");
const fetch = require("cross-fetch");

dotenv.config({
  path: path.resolve(process.cwd(), ".env.test.local"),
  quiet: true,
});

globalThis.fetch = fetch;
globalThis.Headers = fetch.Headers;
globalThis.Request = fetch.Request;
globalThis.Response = fetch.Response;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const supabaseUrl = process.env.SUPABASE_TEST_URL;
const publishableKey = process.env.SUPABASE_TEST_PUBLISHABLE_KEY;

if (!supabaseUrl || !publishableKey) {
  throw new Error(
    "Set SUPABASE_TEST_URL and SUPABASE_TEST_PUBLISHABLE_KEY in .env.test.local before running Jest.",
  );
}

const hostname = new URL(supabaseUrl).hostname;
if (!["localhost", "127.0.0.1", "::1"].includes(hostname)) {
  throw new Error(
    "Devotional integration tests must use a local Supabase URL to avoid modifying remote data.",
  );
}

process.env.EXPO_PUBLIC_SUPABASE_URL = supabaseUrl;
process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY = publishableKey;
