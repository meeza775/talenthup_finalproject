import { Router } from 'express';
import { getFoods } from '../controllers/foodController';

const router = Router();

router.get('/', getFoods);

export default router;