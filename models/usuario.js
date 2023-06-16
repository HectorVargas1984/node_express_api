const { DataTypes } = require("sequelize");
const { conn } = require("../database/connection");

const Usuario = conn.define(
  "Usuario",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
    },

    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    google: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { tableName: "Usuario" }
);

module.exports = {
  Usuario,
};
