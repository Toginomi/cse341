const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  category: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  warranty: { type: String, required: true },
  releaseDate: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);