const { Pool } = require("pg");
require("dotenv").config();

console.log("=================================");
console.log("DATABASE CONFIG");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_SSL:", process.env.DB_SSL);
console.log("DATABASE_URL EXISTS:", !!process.env.DATABASE_URL);
console.log("=================================");

const pool = new Pool(
    process.env.DATABASE_URL
        ? {
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        }
        : {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT || 5432),
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            ssl: process.env.DB_SSL === "true"
                ? { rejectUnauthorized: false }
                : false
        }
);

pool.query(
    "SELECT current_database(), current_user, inet_server_addr(), inet_server_port()"
)
    .then(result => {
        console.log("✅ CONNECTED DATABASE:", result.rows[0]);
    })
    .catch(err => {
        console.error("❌ DATABASE CONNECTION ERROR:", err);
    });

module.exports = pool;