const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity cannot be empty'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount cannot be empty'],
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    default: 'pending',
  },
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
