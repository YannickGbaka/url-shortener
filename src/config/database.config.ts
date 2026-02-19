import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DATABASE_URL,
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  sync:
    process.env.app === 'production' ? false : process.env.DB_SYNC === 'true',
  autoloadEntities: process.env.DB_AUTO_LOAD_ENTITIES,
  ssl: process.env.DB_SSL == 'true' ? true : false,
  schema: process.env.DB_SCHEMA,
}));
