import { execFileSync } from "child_process";

export default function globalSetup() {
  console.log("\nStarting Supabase test database...\n");

  execFileSync("supabase", ["start"], {
    stdio: "inherit",
  });

  console.log("\nResetting database without seed data...\n");

  execFileSync("supabase", ["db", "reset", "--no-seed"], {
    stdio: "inherit",
  });

  console.log("\nGenerating Snaplet test data...\n");

  execFileSync("npx", ["tsx", "seed.ts"], {
    stdio: "inherit",
  });

  console.log("\nSupabase test database ready.\n");
}
