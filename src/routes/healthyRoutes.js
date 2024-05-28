const router = require('express').Router();
const HealtController = require('../controllers/healthyController');

router.get('/healthy', HealtController.getHealthStatusController);

module.exports = router;