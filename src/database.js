const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then((db) => console.log("MongoDB conectado!"))
  .catch(error => console.log("error de conexion a MongoDB", error.message));
