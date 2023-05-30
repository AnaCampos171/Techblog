const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Create a new Sequelize instance based on the environment
if (process.env.JAWSDB_URL) {
  // If JAWSDB_URL is available (indicating a production environment), use it for the database connection
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If JAWSDB_URL is not available (indicating a development environment), use the environment variables for the database connection
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
