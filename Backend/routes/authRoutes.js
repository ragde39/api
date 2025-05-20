const mongoose = require("mongoose");

const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateUser,
  getUsers,
  deleteUser,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.put("/update/:id", updateUser); // Actualizar usuario
router.delete("/delete/:id", deleteUser); // Eliminar usuario
router.get("/users", getUsers); // Listar usuarios

//NOTA AL MOMENTO DE USAR DELETE : NO VAN en postman
module.exports = router;
//para GET en el postman body-none se deja en vacio
