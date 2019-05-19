const mongoose = require('mongoose');

const Cart = require('../models/Cart');
const Product = require('../models/Product');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  userId: Schema.Types.ObjectId,
  cartId: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  },
  userAddress: {
    type: String,
    required: true,
  },
  userContact: {
    type: String,
    required: true,
  },
  totalCharge: Number,
  status: {
    type: String,
    default: 'delivering',
  },
  confirmed: {
    type: String,
    default: 'false',
  },
}, { timestamps: true });

transactionSchema.pre('save', function(next) {
  const cartId = this.cartId;

  Cart.findById(cartId)
    .populate('productId')
    .then((cart) => {
      if(cart.productId.stock < cart.quantity) {
        next('Not enough item')
      } else {
        next();
      }
    })
})

transactionSchema.post('save', function(doc) {
  const cartId = doc.cartId;
  
  Cart.findById(cartId)
    .populate('productId')
    .then((cart) => {
      Cart.findOneAndUpdate({ _id: cart._id }, { status: 'paid' })
        .exec();
      Product.findOneAndUpdate({ _id: cart.productId._id }, { $inc: { stock: -(cart.quantity) }})
        .exec();
    })
    .catch((error) => {
      next(error);
    })

}) 

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;