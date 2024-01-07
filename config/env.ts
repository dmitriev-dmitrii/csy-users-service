import dotenv from 'dotenv';
dotenv.config()
const {env} = process
export const   USER_TOKEN_REFRESH_EXPIRES_TIME =   Number(env.USER_TOKEN_REFRESH_EXPIRES_TIME)
export const   USER_TOKEN_ACCESS_EXPIRES_TIME =   Number(env.USER_TOKEN_ACCESS_EXPIRES_TIME)
export const   APP_PORT =   Number(env.APP_PORT)

export const {
  DB_URL,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  USER_TOKEN_ACCESS_KEY = '',
  USER_TOKEN_REFRESH_KEY = '',
} = env;

