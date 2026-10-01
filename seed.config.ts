import { SeedPg } from "@snaplet/seed/adapter-pg";
import { defineConfig } from "@snaplet/seed/config";
import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  adapter: async () => {
    const client = new Client({
      host: "aws-0-us-west-2.pooler.supabase.com",
      port: 5432,
      user: "postgres.rkqwfymfrlqbpbvcozff",
      password: process.env.DATABASE_PASSWORD,
      database: "postgres",
    });

    await client.connect();
    return new SeedPg(client);
  },
});
