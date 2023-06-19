const jwt = require("jsonwebtoken");

const generadorJWT = (uid = "") => {
  return new Promise((res, rej) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.warn(erro);
          rej("No se genero el token");
        } else {
          res(token);
        }
      }
    );
  });
};

module.exports = {
  generadorJWT,
};
