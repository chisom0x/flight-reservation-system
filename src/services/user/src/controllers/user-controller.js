import userRepository from '../repositories/user-repository.js';
import AppError from '../../../../shared/error-handling/app-error.js';
import { successResponse } from '../../../../shared/error-handling/response.js';

export default class userController {
  static async getUserById(req, res, next) {
    try {
      const userId = req.params.userId;

      if (!userId) return next(new AppError('User id not provided!'));

      const user = await userRepository.findUserById(userId);

      return successResponse(res, user);
    } catch (error) {
      throw error;
    }
  }
}
