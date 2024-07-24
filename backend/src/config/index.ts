import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  SECRET_KEY,
  ORIGIN,
  SES_SECRET_KEY,
  SES_ACCESS_KEY,
  SES_REGION,
  SES_SENDER,
} = process.env;
