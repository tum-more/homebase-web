import { defineConfig } from 'drizzle-kit';

import { env } from '@/env.mjs';

export default defineConfig({
  schema: './src/lib/db/schema/**/*.ts',
  out: './src/lib/db/drizzle',
  dialect: 'mysql', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    host: env.DATABASE_HOST,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    port: env.DATABASE_PORT,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  verbose: true,
});
