import dotenv from 'dotenv';
dotenv.config()
export const {
  APP_PORT,
  DATABASE_URL,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
} = process.env;

