const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

module.exports = sequelize.define(
  "users",
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      defaultValue: 1,
      type: DataTypes.INTEGER,
    },
    username: DataTypes.STRING(100),
    email: DataTypes.STRING(100),
    password: DataTypes.STRING(255),
  },
  { timestamps: false }
);
