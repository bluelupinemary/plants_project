const express = require('express');
const router = express.Router();

const plantStateController = require('../controllers/plantstate.controller');

router.get('/', plantStateController.getStatesList);
router.get('/generation/:top', plantStateController.getTopPlantsByNetGenerationList);
router.get('/plants', plantStateController.getPlantsList);
router.get('/plants/:stateAbb', plantStateController.getPlantsByStateList);

module.exports = router;