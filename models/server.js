const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/connection");

class Server {
  //Atributos
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //creacion de path para las rutas
    this.usuarioPath = "/api/usuarios";
    this.authPath = "/api/auth";

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
    this.app.use(this.authPath, require("../routes/auth.router"));

    this.app.use(this.usuarioPath, require("../routes/usuarios.router"));
  }

  listem() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
