import type { Config } from "jest";

const config: Config = {
  globalSetup: "<rootDir>/scripts/jest-global-setup.ts",
  globalTeardown: "<rootDir>/scripts/jest-global-teardown.ts",
};

export default config;
