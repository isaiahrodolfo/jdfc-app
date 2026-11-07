import { execFileSync } from "child_process";

export default function globalTeardown() {
  console.log("\nStopping Supabase test database...\n");

  execFileSync("supabase", ["stop"], {
    stdio: "inherit",
  });

  console.log("\nSupabase test database stopped.\n");
}
