const { Sequelize } = require("sequelize");

const conn = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASS,
  {
    host: "localhost",
    dialect: "mysql",
    logging: true,
  }
);

const dbConnection = async () => {
  try {
    await conn.authenticate();
    console.info("conectado a la base de datos");
  } catch (error) {
    throw new Error("no hay conexion a la base de datos");
  }
};

module.exports = {
  dbConnection,
  conn,
};
