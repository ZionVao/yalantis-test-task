import { config } from 'dotenv';

config();

const {
    APP_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_DIALECT
} = process.env;

const ENV = {
    APP: {
      PORT: APP_PORT
    },
    DB: {
      DATABASE: DB_NAME,
      USERNAME: DB_USERNAME,
      PASSWORD: DB_PASSWORD,
      HOST: DB_HOST,
      PORT: DB_PORT,
      DIALECT: DB_DIALECT
    }
}

export { ENV };
