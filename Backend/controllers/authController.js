const mongoose = require("mongoose");
const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Registrar usuario
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  const {
    firstName,
    secondName,
    firstLastName,
    secondLastName,
    username,
    email,
    password,
  } = req.body; // esto quiere decir que la informacion de { firstaname.... quedan gyardado en req.body}

  try {
    // Crear usuario
    const user = await User.create({
      firstName,
      secondName,
      firstLastName,
      secondLastName,
      username,
      email,
      password,
    });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Iniciar sesión
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validar email y password
  if (!email || !password) {
    return next(
      new ErrorResponse("Por favor ingrese un email y contraseña", 400)
    );
  }

  try {
    // Verificar usuario
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Credenciales inválidas", 401));
    }

    // Verificar contraseña
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Credenciales inválidas", 401));
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// Obtener token, crear cookie y enviar respuesta
const sendTokenResponse = (user, statusCode, res) => {
  // Crear token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
// @desc    Actualizar usuario
// @route   PUT /api/auth/update/:id
// @access  Private
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return next(new ErrorResponse("Usuario no encontrado", 404));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
// @desc    Eliminar usuario
// @route   DELETE /api/auth/delete/:id
// @access  Private
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new ErrorResponse("MARIKA YAA!!!", 404));
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Obtener lista de usuarios
// @route   GET /api/auth/users
// @access  Private
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};
