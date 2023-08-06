import 'dotenv/config';

const {
  APP_PORT,
  DATABASE_URL,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
} = process.env;

// TO-DO написать валидатор  env перменных

export default Object.freeze({
  APP_PORT: parseInt(APP_PORT, 10),
  DATABASE_URL,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
});
