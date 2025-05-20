require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const bodyParser = require("body-parser");

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:4200", // o el puerto de tu Angular app
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
); // Permite solicitudes de diferentes dominios (necesario para frontend)
app.use(express.json()); // Parsea el cuerpo de las solicitudes a JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

// Rutas
app.use("/api/auth", authRoutes); //ruta de usuario
app.use("/api/products", productRoutes); // ruta de productos

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
