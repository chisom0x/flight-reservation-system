import Joi from 'joi';

export const signupSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    'string.base': 'First name must be a string!',
    'string.empty': 'First name cannot be empty!',
    'string.min': 'First name must be at least 2 characters long!',
    'string.max': 'First name cannot exceed 50 characters!',
    'any.required': 'First name is required!',
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    'string.base': 'Last name must be a string!',
    'string.empty': 'Last name cannot be empty!',
    'string.min': 'Last name must be at least 2 characters long!',
    'string.max': 'Last name cannot exceed 50 characters!',
    'any.required': 'Last name is required!',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string!',
    'string.email': 'Please enter a valid email address!',
    'string.empty': 'Email cannot be empty!',
    'any.required': 'Email is required!',
  }),
  password: Joi.string().min(6).max(30).required().messages({
    'string.base': 'Password must be a string!',
    'string.empty': 'Password cannot be empty!',
    'string.min': 'Password must be at least 6 characters long!',
    'string.max': 'Password cannot exceed 30 characters!',
    'any.required': 'Password is required!',
  }),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.base': 'Email must be a string!',
      'string.email': 'Please enter a valid email address!',
      'string.empty': 'Email cannot be empty!',
      'any.required': 'Email is required!',
    }),
    password: Joi.string().min(6).max(30).required().messages({
      'string.base': 'Password must be a string!',
      'string.empty': 'Password cannot be empty!',
      'string.min': 'Password must be at least 6 characters long!',
      'string.max': 'Password cannot exceed 30 characters!',
      'any.required': 'Password is required!',
    }),
  });
