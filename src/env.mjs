// src/env.mjs
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';
export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),

    // DATABASE_URL: z.string().url(),
    DATABASE_HOST: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_PORT: z.coerce.number().default(3306),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {},
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    // DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PORT: process.env.DATABASE_PORT,
  },
});

export const isProduction = env.NODE_ENV === 'production';
