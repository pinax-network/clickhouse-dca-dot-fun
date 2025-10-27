#!/usr/bin/env node
/**
 * Database Health Check Script
 * 
 * This script verifies ClickHouse database connectivity before starting
 * or building the application. It checks:
 * 1. DNS resolution for the database host
 * 2. ClickHouse server ping endpoint
 * 
 * Run with: tsx scripts/check-db-health.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { existsSync } from 'fs';

// Load environment variables from .env.local or .env
const envLocalPath = resolve(process.cwd(), '.env.local');
const envPath = resolve(process.cwd(), '.env');

if (existsSync(envLocalPath)) {
  config({ path: envLocalPath });
  console.log('Loaded environment from .env.local');
} else if (existsSync(envPath)) {
  config({ path: envPath });
  console.log('Loaded environment from .env');
} else {
  console.log('No .env file found, using environment variables or defaults');
}

// Import after loading env vars
import { runHealthChecks } from '../lib/db-health.js';

async function main() {
  try {
    const result = await runHealthChecks();
    
    if (!result.overall) {
      console.error('\nDatabase health checks failed. Please verify your ClickHouse connection settings.');
      process.exit(1);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('\nUnexpected error during health check:', error);
    process.exit(1);
  }
}

main();
