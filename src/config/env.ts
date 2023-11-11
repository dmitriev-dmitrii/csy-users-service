import dotenv from 'dotenv';
dotenv.config()
export const {
  APP_PORT,
  DB_URL,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env;

