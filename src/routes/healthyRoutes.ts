import express from 'express';
import * as HealtController from '../controllers/healthyController';

const router = express.Router();

router.get('/healthy', HealtController.getHealthStatusController);

export default router;