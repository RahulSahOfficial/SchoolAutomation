require("dotenv").config();
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const checkAndCreateTables = async () => {
  try {
    await client.connect();

    console.log("Connected to database.");

    // Read schema file
    const schemaPath = path.join(__dirname, "schema.sql");
    const schemaSQL = fs.readFileSync(schemaPath, "utf8");

    // Extract table names from schema (simple regex for CREATE TABLE)
    const tableNames = [
      ...schemaSQL.matchAll(/CREATE TABLE IF NOT EXISTS (\w+)/gi),
    ].map((match) => match[1]);

    for (const table of tableNames) {
      const res = await client.query(
        `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1)`,
        [table]
      );

      if (!res.rows[0].exists) {
        console.log(`Creating table: ${table}`);
        await client.query(schemaSQL);
      } else {
        console.log(`Table ${table} already exists, skipping.`);
      }
    }

    console.log("Database initialization complete.");
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    await client.end();
  }
};

checkAndCreateTables();
