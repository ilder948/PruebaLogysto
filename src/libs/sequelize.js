const Sequelize = require("sequelize");
const config = require("../config/index");

const sequelize = new Sequelize(
  config.POSTGRES_DATABASE,
  config.POSTGRES_USER,
  config.POSTGRES_PASS,
  {
    host: `${config.POSTGRES_HOST}`,
    dialect: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = sequelize;
