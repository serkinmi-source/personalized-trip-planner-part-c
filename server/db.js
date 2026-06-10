const sql = require("mssql");
const dbConfig = require("./db.config");

async function connectToDatabase() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log("Successfully connected to SQL Server");
        return pool;
    } catch (error) {
        console.error("Database connection failed:", error.message);
        throw error;
    }
}

module.exports = {
    sql,
    connectToDatabase
};