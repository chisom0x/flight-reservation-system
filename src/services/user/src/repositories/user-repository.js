import User from '../models/user-model.js';

export default class userRepository {
  static async createUser(firstName, lastName, email, password) {
    try {
      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  }
  static async findUserByEmail(email) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
  static async findUserById(userId) {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
