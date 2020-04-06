const mongoose = require('mongoose');
const Mapper = require('../helpers/object-mapper');

const UserModel = mongoose.model('User');

class UserService {
  static async createUser(driver = null, data) {
    const Model = driver || UserModel;
    const user = await Model.create(data);

    return Mapper.except(user.toObject(), ['__v', 'password']);
  }
}

module.exports = UserService;
