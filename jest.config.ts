import type { Config } from "jest";

// Keeps jest-haste-map from scanning build output, where
// .next/standalone/package.json collides with the root package.json.
const modulePathIgnorePatterns = ["<rootDir>/.next/"];
const moduleNameMapper = { "^@/(.*)$": "<rootDir>/src/$1" };

const config: Config = {
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  modulePathIgnorePatterns,
  projects: [
    {
      displayName: "node",
      preset: "ts-jest",
      testEnvironment: "node",
      // Deliberately broad: a narrower glob silently collects a test file into
      // neither project, so it never runs and never fails.
      testMatch: ["<rootDir>/src/**/__tests__/**/*.test.ts"],
      moduleNameMapper,
      modulePathIgnorePatterns,
    },
    {
      displayName: "jsdom",
      preset: "ts-jest",
      testEnvironment: "jest-environment-jsdom",
      testMatch: ["<rootDir>/src/**/__tests__/**/*.test.tsx"],
      moduleNameMapper,
      modulePathIgnorePatterns,
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    },
  ],
};

export default config;
