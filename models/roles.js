const { DataTypes } = require("sequelize");
const { conn } = require("../database/connection");

const Roles = conn.define(
  "role",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "role" }
);

// const ROLE = {
//   admid: "ADMIN_ROLES",
//   user: "USER_ROLES",
// };

module.exports = Roles;
