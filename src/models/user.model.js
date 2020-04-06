const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  // Field will be automatically generated before safe.
  fullname: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
});

// eslint-disable-next-line func-names
userSchema.methods.validatePassword = async function (password) {
  // Check if the password matches the hashed password.
  const isValid = await bcrypt.compare(password, this.password);

  return isValid;
};

// eslint-disable-next-line func-names
userSchema.static('hashPassword', async function (password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
});

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  this.fullname = `${this.firstName} ${this.lastName}`;
  this.password = await bcrypt.hash(this.password, 10);

  return next();
});

module.exports = mongoose.model('User', userSchema);
