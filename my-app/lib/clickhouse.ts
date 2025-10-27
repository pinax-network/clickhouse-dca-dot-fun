import { createClient } from '@clickhouse/client-web';

export const clickhouseClient = createClient({
  url: process.env.CLICKHOUSE_URL || 'http://localhost:8123',
  username: process.env.CLICKHOUSE_USERNAME || 'default',
  password: process.env.CLICKHOUSE_PASSWORD || '',
  database: process.env.CLICKHOUSE_DATABASE || 'default',
});

export interface SetTokenProps {
  [key: string]: string | number | null;
}

export async function getSetTokenProps(): Promise<SetTokenProps[]> {
  const resultSet = await clickhouseClient.query({
    query: 'SELECT * FROM set_token_props',
    format: 'JSONEachRow',
  });

  const data = await resultSet.json();
  return data as SetTokenProps[];
}
