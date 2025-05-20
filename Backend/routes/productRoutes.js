const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { validateUpdateProduct } = require("../middlewares/products");

const {
  register,
  productDelete,
  updateProduct,
  getProducts,
} = require("../controllers/productController");

router.post("/register", register); //ruta para registra productos
router.delete("/delete/:id", productDelete); //ruta para elminar productos
router.put("/update/:id", validateUpdateProduct, updateProduct); // Actualizar producto
router.get("/", getProducts); // Listar productos

module.exports = router;
//para GET en el psotman body-none se deja en vacio
