import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const dbConnection = process.env.DATABASE_URL;

export const db = new pg.Pool({
  connectionString: dbConnection,
  ssl: {
    rejectUnauthorized: false 
  }
});