import express from 'express';
import { confirmMeasure } from '../controllers/confirmController';

const router = express.Router();

router.patch('/', confirmMeasure);

export default router;