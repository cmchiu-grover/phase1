import "dotenv/config";
import mysql from "mysql2/promise";
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

// Create the connection to database
const pool = mysql.createPool({
  host: "localhost",
  user: dbUsername,
  password: dbPassword,
  database: dbName,
});

export default pool;
