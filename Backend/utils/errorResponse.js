// Backend/utils/errorResponse.js
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
 //sirve para personalizar los letreros de errores, en vez de salir codigos
 //como 404, se podria colocar  usuario n enccontardo