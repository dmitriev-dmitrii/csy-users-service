import env from './env';
const { DATABASE_PORT, DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD } = env;
const url: Readonly<string> = `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_URL}:${DATABASE_PORT}/csy-users-service?authSource=admin`;

export default url;
