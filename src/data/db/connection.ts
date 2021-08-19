import { Sequelize, Dialect } from 'sequelize';
import * as dbConfig from './db.config';

const sequelize = new Sequelize(
    dbConfig.database as string,
    dbConfig.username as string,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: Number(dbConfig.port),
        dialect: dbConfig.dialect as Dialect,
    },
);

export { sequelize };
