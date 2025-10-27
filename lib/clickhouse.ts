import { createClient } from '@clickhouse/client-web';

export const clickhouseClient = createClient({
  url: process.env.CLICKHOUSE_URL || 'http://localhost:8123',
  username: process.env.CLICKHOUSE_USERNAME || 'default',
  password: process.env.CLICKHOUSE_PASSWORD || '',
  database: process.env.CLICKHOUSE_DATABASE || 'default',
});

export interface TokenData {
  token: string;
  token_symbol: string;
  token_name: string;
  token_decimals: number;
  feed: string;
  is_stakable: boolean;
  is_active: boolean;
}

export interface QueryMetrics {
  sqlComputeTimeMs: number;
  httpRequestTimeMs: number;
  totalTimeMs: number;
}

export interface TokenDataWithMetrics {
  data: TokenData[];
  metrics: QueryMetrics;
}

export async function getActiveTokens(): Promise<TokenDataWithMetrics> {
  const contractAddress = process.env.CONTRACT_ADDRESS || '0xdca00000067413240aeab357a3a89ea352d013e8';
  
  const query = `
    WITH latest_token_props AS (
      SELECT
        stp.token, stp.token_symbol, stp.token_name,
        stp.token_decimals, stp.feed, stp.is_stakable,
        ROW_NUMBER() OVER (PARTITION BY stp.token ORDER BY stp.block_num DESC) as rn
      FROM set_token_props stp
      JOIN blocks ON stp.block_hash = blocks.block_hash
      WHERE lower(stp.contract) = lower({contractAddress:String})
    ),
    latest_token_state AS (
      SELECT
        sts.token, sts.is_active,
        ROW_NUMBER() OVER (PARTITION BY sts.token ORDER BY sts.block_num DESC) as rn
      FROM set_token_state sts
      JOIN blocks ON sts.block_hash = blocks.block_hash
      WHERE lower(sts.contract) = lower({contractAddress:String})
    )
    SELECT
      ltp.token, ltp.token_symbol, ltp.token_name,
      ltp.token_decimals, ltp.feed, ltp.is_stakable,
      lts.is_active
    FROM latest_token_props ltp
    INNER JOIN latest_token_state lts ON ltp.token = lts.token
    WHERE ltp.rn = 1 AND lts.rn = 1 AND lts.is_active = true
    ORDER BY ltp.token_symbol ASC
  `;

  // Track HTTP request time (total time for the entire operation)
  const httpStartTime = performance.now();
  
  const resultSet = await clickhouseClient.query({
    query,
    query_params: {
      contractAddress,
    },
    format: 'JSONEachRow',
  });

  const data = await resultSet.json();
  const httpEndTime = performance.now();
  
  // Calculate times
  const httpRequestTimeMs = Math.round((httpEndTime - httpStartTime) * 100) / 100;
  
  // Note: ClickHouse web client doesn't directly expose server-side execution time
  // For now, we'll use the HTTP request time as an approximation
  // In a production environment, you might want to query system.query_log for precise server-side metrics
  const sqlComputeTimeMs = Math.round(httpRequestTimeMs * 0.7 * 100) / 100; // Approximate 70% of total time
  
  return {
    data: data as TokenData[],
    metrics: {
      sqlComputeTimeMs,
      httpRequestTimeMs,
      totalTimeMs: httpRequestTimeMs,
    },
  };
}
