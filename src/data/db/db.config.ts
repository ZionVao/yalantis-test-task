import { ENV } from '../../common/enums';

const {
    DATABASE: database,
    USERNAME: username,
    PASSWORD: password,
    HOST: host,
    PORT: port,
    DIALECT: dialect,
} = ENV.DB;

export { database, username, password, host, port, dialect };
