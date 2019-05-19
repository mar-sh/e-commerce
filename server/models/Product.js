const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name cannot be empty'],
  },
  stock: {
    type: Number,
    validate: {
      validator: function (amount) {
        return (amount > 0);
      },
      message: 'Stock cannot be lower than 1',
    }
  },
  price: {
    type: Number,
    validate: {
      validator: function (price) {
        return (price > -1);
      },
      message: 'Price cannot be lower than 0',
    }
  },
  url: String,
  description: String,
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;