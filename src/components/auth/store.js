const { Sequelize } = require("sequelize");
const sequelize = require("../../libs/sequelize");

const users = sequelize.define(
  "users",
  {
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = users;
