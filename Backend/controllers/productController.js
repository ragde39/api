const mongoose = require("mongoose");
const Products = require("../models/product"); // importa el modelo
const ErrorResponse = require("../utils/errorResponse"); // importa la clase personalizada

exports.register = async (req, res, next) => {
  //exporta la funcion llamada register
  //req(solicitud), res(respuesta), next(siguiente)
  console.log("Solicitud recibida en /api/products/register:", req.body);

  const { name, price, presentation, number } = req.body;

  //ya se hizo el req ahora haremos el res
  // Validación

  try {
    //try maneja eerores de manera segura
    // Crear el producto en la base de datos
    const product = await Products.create({
      name,
      price,
      presentation,
      number,
    });

    // Respuesta exitosa
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    // Pasa el error al middleware de manejo de errores
    next(err);
    // O podrías usar: next(new ErrorResponse("Error al crear el producto", 500));
  }
};

//eliminar producto "productDelete"

exports.productDelete = async (req, res, next) => {
  try {
    // Validar que el ID tenga formato correcto
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new ErrorResponse("ID de producto inválido", 400));
    }

    const product = await Products.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new ErrorResponse("Producto no encontrado", 404));
    }

    res.status(200).json({
      success: true,
      message: "Producto eliminado correctamente",
      deletedId: req.params.id,
    });
  } catch (error) {
    next(error);
  }
};
// @desc    Actualizar usuario
// @route   PUT /api/product/update/:id
// @access  Private
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Intentar actualizar el producto después de pasar la validación
    const result = await Products.updateOne({ _id: id }, { $set: req.body });

    console.log("Resultado de updateOne:", result);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Producto actualizado correctamente",
      data: result,
    });
  } catch (err) {
    console.error("Error en updateProduct:", err);
    next(new ErrorResponse("Error al actualizar el producto", 500));
  }
};

// @desc    Obtener lista de usuarios
// @route   GET /api/auth/users
// @access  Private
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Products.find();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};
