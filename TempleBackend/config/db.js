const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

let poolConfig;

if (process.env.DATABASE_URL) {

    console.log("=================================");
    console.log("DATABASE MODE: DATABASE_URL");
    console.log("DATABASE_URL EXISTS: true");
    console.log("=================================");

    poolConfig = {
        connectionString: process.env.DATABASE_URL,

        ssl: isProduction
            ? { rejectUnauthorized: false }
            : false,

        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000
    };

} else {

    console.log("=================================");
    console.log("DATABASE MODE: LOCAL");
    console.log("DB_HOST:", process.env.DB_HOST || "localhost");
    console.log("DB_PORT:", process.env.DB_PORT || 5432);
    console.log("DB_NAME:", process.env.DB_NAME || "MadhavDasJI");
    console.log("DB_USER:", process.env.DB_USER || "postgres");
    console.log("DATABASE_URL EXISTS: false");
    console.log("=================================");

    poolConfig = {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || 5432),
        database: process.env.DB_NAME || "MadhavDasJI",
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD,

        ssl: false,

        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000
    };
}

const pool = new Pool(poolConfig);

pool.on("error", (err) => {
    console.error("Unexpected PostgreSQL Pool Error:", err);
});

pool.query("SELECT current_database(), current_user")
    .then((result) => {
        console.log("✅ PostgreSQL Connected Successfully");
        console.log("✅ CONNECTED DATABASE:", result.rows[0]);
    })
    .catch((err) => {
        console.error("❌ Database Connection Failed");
        console.error(err);
    });

module.exports = pool;