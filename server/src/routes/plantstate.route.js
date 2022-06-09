const express = require('express');
const router = express.Router();

const plantStateController = require('../controllers/plantstate.controller');

router.get('/', plantStateController.getStatesList);
router.get('/generation/:top', plantStateController.getTopPlantsByNetGenerationList);
router.get('/generation/:top/:state', plantStateController.getTopPlantsByNetGenerationByStateList);
router.get('/generation/:top/all/:category', plantStateController.getTopPlantsByNetGenerationByCategoryList);
router.get('/generation/:top/:state/:category', plantStateController.getTopPlantsByNetGenerationByStateByCategoryList);
router.get('/plants', plantStateController.getPlantsList);
router.get('/plants/:state', plantStateController.getPlantsByStateList);
router.get('/plants/all/:category', plantStateController.getPlantsByCategoryList);
router.get('/plants/:state/:category', plantStateController.getPlantsByStateByCategoryList);

router.get('/plant/:id', plantStateController.getPlantDetails);
router.get('/plant/:id/:type', plantStateController.getPlantDetailsByType);



module.exports = router;