import * as dotenv from 'dotenv';
import type { Config } from 'jest';
dotenv.config();

const config: Config = {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'tests/coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testRegex: './*\\.test\\.ts$',
  //rootDir: './tests',
  testTimeout: 180000,
};

export default config;
