const mongoose = require('mongoose');
const { hashPassword } = require('../helpers/entry');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: {
    type:String,
    required: [true, 'Email cannot be empty'],
    validate: {
      validator(email) {
        return /.+@.+\..+/ig.test(email);
      },
      message: 'Invalid email format'
    }
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty']
  },
  role: {
    type: String,
    default: 'user',
  },
}, { timestamps: true });

userSchema.pre('save', function(next) {
  this.password = hashPassword(this.password);
  next();
});

userSchema.path('email').validate(function (email) {
  return User.findOne({ email })
    .then((user) => {
      if (user){
        return false;
      } else {
        return true;
      }
    });
}, 'Email is already in use') ;

userSchema.path('role').validate(function(role) {
  if(role === '@12M1n!') {
    return User.findOne({ role : '@12M1n!'} )
    .then((user) => {
      if(user) {
        return false;
      } else {
        return true;
      }
    })
  } else {
    return true;
  } 
}, 'There can only be one');

const User = mongoose.model('User', userSchema);

module.exports= User;
