const mongoose = require("mongoose"); //permite interarctuar con la biblioteca de mongo

const ProductSchema = new mongoose.Schema({
  //product es el nombre de la constaante y Shema es una  una palbra propia de mongodB

  name: { type: String, required: true },
  price: { type: Number, required: true }, //recoerdar que String es S mayuscula
  presentation: { type: String, required: true },
  number: { type: Number, required: true },
});

module.exports = mongoose.model("product", ProductSchema); //exortamos  el modelo a donde sea llamado
