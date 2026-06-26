const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

// Railway fornece DATABASE_URL ou MYSQL_URL no formato: mysql://user:pass@host:port/dbname
let dbConfig;

if (process.env.DATABASE_URL || process.env.MYSQL_URL) {
    const url = new URL(process.env.DATABASE_URL || process.env.MYSQL_URL);
    dbConfig = {
        host: url.hostname,
        port: parseInt(url.port) || 3306,
        database: url.pathname.replace('/', ''),
        username: url.username,
        password: url.password,
    };
} else {
    dbConfig = {
        host: process.env.DB_HOST || 'db',
        port: parseInt(process.env.DB_PORT) || 3306,
        database: process.env.DB_NAME || 'minisitio_local',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
    };
}

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    dialect: 'mysql',
    host: dbConfig.host,
    port: dbConfig.port,
    timezone: '-03:00',
    logging: false,
    dialectOptions: {
        charset: 'utf8mb4',
    },
    pool: {
        max: 20,
        min: 2,
        acquire: 120000,
        idle: 30000,
    },
});

module.exports = sequelize;
