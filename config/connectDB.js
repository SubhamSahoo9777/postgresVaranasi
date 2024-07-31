import pg from "pg";
import { Sequelize } from "sequelize";

const { Client } = pg;

const connectDB = async () => {
  // Retrieve connection parameters from environment variables
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not defined');
  }

  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    // Connect to PostgreSQL server
    await client.connect();

    // Check if database exists
    const dbName = process.env.DB_NAME;
    const result = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

    if (result.rowCount === 0) {
      // Create database if it does not exist
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log("Database created successfully");
    } else {
      console.log("Database already exists");
    }
  } catch (error) {
    console.error('Error while creating or checking the database:', error);
  } finally {
    // Close the connection to avoid leaks
    await client.end();
  }

  // Initialize Sequelize with the database name and connection parameters
  const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });

  try {
    // Test the connection
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return sequelize;
};

export default connectDB;
