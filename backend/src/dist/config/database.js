import dotenv from "dotenv";
dotenv.config();
const config = {
    development: {
        use_env_variable: process.env.DB_URL_DEVELOPMENT,
        username: process.env.DB_USERNAME_DEVELOPMENT ?? "root",
        password: process.env.DB_PASSWORD_DEVELOPMENT ?? "root",
        database: process.env.DB_DATABASE_DEVELOPMENT ?? "database_product_development",
        host: process.env.DB_HOST_DEVELOPMENT ?? "127.0.0.1",
        dialect: process.env.DB_DIALECT_DEVELOPMENT ?? "mysql",
        dialectOptions: {
            connectTimeout: 30000,
        },
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: console.log,
    },
    test: {
        use_env_variable: process.env.DB_URL_TEST,
        username: process.env.DB_USERNAME_TEST ?? "root",
        password: process.env.DB_PASSWORD_TEST ?? "root",
        database: process.env.DB_DATABASE_TEST ?? "database_product_test",
        host: process.env.DB_HOST_TEST ?? "127.0.0.1",
        dialect: process.env.DB_DIALECT_TEST ?? "mysql",
    },
    production: {
        use_env_variable: process.env.DB_URL_PRODUCTION,
        username: process.env.DB_USERNAME_PRODUCTION ?? "root",
        password: process.env.DB_PASSWORD_PRODUCTION ?? "root",
        database: process.env.DB_DATABASE_PRODUCTION ?? "database_product_production",
        host: process.env.DB_HOST_PRODUCTION ?? "127.0.0.1",
        dialect: process.env.DB_DIALECT_PRODUCTION ?? "mysql",
    },
};
export default config;
