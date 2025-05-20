//middlewares son funciones que se ejecutan entre la solicitud del cliente y la respuesta del servidor. Sirven para modificar, analizar o validar datos antes de que lleguen a su destino final

//sirven autenticacion y seguridad, procesamiento de solicitudes,registro de actividad
//comprension y optamizacion


const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

// Proteger rutas
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Asegurar que existe token
  if (!token) {
    return next(
      new ErrorResponse("No autorizado para acceder a esta ruta", 401)
    );
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(
      new ErrorResponse("No autorizado para acceder a esta ruta", 401)
    );
  }
};
