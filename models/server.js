const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/connection");

class Server {
  //Atributos
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //conectar a la dase de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    //rutas de mi aplicacion
    this.routes();
  }

  //Metodos
  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use("/api/usuarios", require("../routes/usuarios.router"));
  }

  listem() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
