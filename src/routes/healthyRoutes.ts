import express from 'express';
import { getHealthStatusController } from '@controllers/healthyController';

const router = express.Router();

router.get('/healthy', getHealthStatusController);

export default router;