import dotenv from 'dotenv';
dotenv.config()

export const {
  APP_PORT,
  DB_URL,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  USER_TOKEN_ACCESS_KEY = '',
  USER_TOKEN_REFRESH_KEY = '',
  USER_TOKEN_ACCESS_EXPIRES_TIME,
  USER_TOKEN_REFRESH_EXPIRES_TIME
} = process.env;

