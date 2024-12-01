import { Router } from 'express';
import Authentication from '../controllers/authentication.js';

const router = Router();

router.post('/signup', Authentication.signup);
router.post('/login', Authentication.login);

export default router;
