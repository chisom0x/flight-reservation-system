import { Router } from 'express';
import Authentication from '../controllers/authentication.js';
import userController from '../controllers/user-controller.js';

const router = Router();

router.post('/signup', Authentication.signup);
router.post('/login', Authentication.login);
router.get('/:userId', userController.getUserById);

export default router;
