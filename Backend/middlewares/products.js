const mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");

exports.validateUpdateProduct = (req, res, next) => {
  console.log("Datos recibidos en la API:", req.body); // Agregar para depuración

  const { id } = req.params;
  const { Name1, price, presentation, number } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorResponse("ID de producto inválido", 400));
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return next(
      new ErrorResponse("No se proporcionaron datos para actualizar", 400)
    );
  }

  if (Name1 && typeof Name1 !== "string") {
    return next(new ErrorResponse("El nombre debe ser un texto", 400));
  }

  if (price && (typeof price !== "number" || price <= 0)) {
    return next(
      new ErrorResponse("El precio debe ser un número positivo", 400)
    );
  }

  if (presentation && typeof presentation !== "string") {
    return next(new ErrorResponse("La presentación debe ser un texto", 400));
  }

  if (number && (typeof number !== "number" || number < 0)) {
    return next(
      new ErrorResponse("El número debe ser un valor numérico válido", 400)
    );
  }

  next();
};
