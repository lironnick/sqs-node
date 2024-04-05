import { z } from 'zod';

const envSchema = z.object({
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_QUEUEURL: z.string().url(),

  DB_HOST: z.string(),
  DB_DATABASE: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DRIVER: z.string(),

  DB_BASE2_HOST: z.string(),
  DB_BASE2_DATABASE: z.string(),
  DB_BASE2_USERNAME: z.string(),
  DB_BASE2_PASSWORD: z.string(),
  DB_BASE2_DRIVER: z.string(),
});

export const env = envSchema.parse(process.env);
