import userRepository from '../repositories/user-repository.js';
import bcrypt from 'bcryptjs';
import AppError from '../../../../shared/error-handling/app-error.js';
import createSendToken from '../utils/jwt-handler.js';
import { signupSchema, loginSchema } from '../validations/auth-validations.js';

export default class Authentication {
  static async signup(req, res, next) {
    try {
      const { error, value } = signupSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const validationErrors = error.details.map((err) => err.message);
        return next(new AppError(validationErrors.join(', '), 400));
      }

      const { firstName, lastName, email, password } = value;
      if (!firstName)
        return next(new AppError('Please enter your first name!', 400));
      if (!lastName)
        return next(new AppError('please enter your lastname!', 400));
      if (!email)
        return next(new AppError('please enter your email address!', 400));
      if (!password) return next(new AppError('please set a password!', 400));

      const userExists = await userRepository.findUserByEmail(email);

      if (userExists) return next(new AppError('email already in use!', 400));

      const user = await userRepository.createUser(
        firstName,
        lastName,
        email,
        password
      );

      return createSendToken(user, 200, res);
    } catch (error) {
      return next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { error, value } = loginSchema.validate(req.body, {
        abortEarly: false,
      });
      
      if (error) {
        const validationErrors = error.details.map((err) => err.message);
        return next(new AppError(validationErrors.join(', '), 400));
      }

      const { email, password } = value;
      if (!email)
        return next(new AppError('please enter your email address', 400));
      if (!password) return next(new AppError('please enter a password', 400));

      const user = await userRepository.findUserByEmail(email);

      let userPass = !user ? 'no_user' : user.password;
      const pass = await bcrypt.compare(password, userPass);

      if (user && pass) return createSendToken(user, 200, res);
      return next(new AppError('incorrect email or password!', 400));
    } catch (error) {
      throw error;
    }
  }
}
