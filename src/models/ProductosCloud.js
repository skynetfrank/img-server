const mongoose = require('mongoose');

const ProductosCloud = new mongoose.Schema({
  nombre: { type: String },
  marca: { type: String },
  categoria: { type: String },
  descripcion: { type: String },
  imageCloudUrl: String,
  public_id: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('ProductosCloud', ProductosCloud);
