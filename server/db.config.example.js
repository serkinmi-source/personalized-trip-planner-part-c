const dbConfig = {
    user: "YOUR_SQL_USER",
    password: "YOUR_SQL_PASSWORD",
    server: "localhost",
    port: 1433,
    database: "personalized_trip_planner",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

module.exports = dbConfig;