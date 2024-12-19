import 'server-only';
import { drizzle } from 'drizzle-orm/mysql2';
import { createPool, type Pool } from 'mysql2/promise';

import { env } from '@/env.mjs';
import * as schema from './db/schema';

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const conn =
  globalForDb.conn ??
  createPool({
    host: env.DATABASE_HOST,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    port: env.DATABASE_PORT,
    ssl: {
      rejectUnauthorized: false,
    },
  });
if (env.NODE_ENV !== 'production') globalForDb.conn = conn;

export const mysql = drizzle(conn, { schema, mode: 'default' });
