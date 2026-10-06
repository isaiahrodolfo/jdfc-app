import { SeedPg } from "@snaplet/seed/adapter-pg";
import { defineConfig } from "@snaplet/seed/config";
import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config({ path: ".env.local" });

const connectionConfig = {
  host: "127.0.0.1",
  port: 54322,
  user: "postgres",
  password: "postgres",
  database: "postgres",
};

/**
 * Creates a separate PostgreSQL client for direct SQL queries.
 */
export async function createDbClient() {
  const client = new Client(connectionConfig);

  await client.connect();

  return client;
}

export default defineConfig({
  adapter: async () => {
    // Snaplet gets its own connection.
    const client = new Client(connectionConfig);

    await client.connect();

    return new SeedPg(client);
  },
});
