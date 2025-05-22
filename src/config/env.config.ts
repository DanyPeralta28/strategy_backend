import { IEnvConfiguration } from './interfaces/env.interface';

export const EnvConfiguration = (): IEnvConfiguration => {
    return {
        port: +process.env.PORT || 3000,
        host_api: process.env.HOST_API,
        api_prefix: process.env.API_PREFIX,
        default_limit: +process.env.DEFAULT_LIMIT || 10,
        default_offset: +process.env.DEFAULT_OFFSET || 0,
        env: process.env.ENV || 'DEV',
        file_log: process.env.FILE_LOG || 'true',
        NAME: process.env.NAME,
        clientsRepository: {
            host: process.env.DB_MYSQL_HOST,
            port: +process.env.DB_MYSQL_PORT || 3306,
            username: process.env.DB_MYSQL_USERNAME,
            password: process.env.DB_MYSQL_PASSWORD,
            database: process.env.DB_MYSQL_DATABASE,
        }
    }
};
