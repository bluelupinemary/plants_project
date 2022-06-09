const PlantStateModel = require("../models/plantstate.model");


exports.getPlantsList = (req, res) => {
    PlantStateModel.getAllPlants((err, plantLocations) => {
        if(err){
            res.send(err);
        }else{
            res.send(plantLocations)
        }
    })
}

exports.getPlantsByStateList = (req, res) => {
    PlantStateModel.getAllPlantsByState(req.params.state, (err, plantsByState) => {
        if(err){
            res.send(err);
        }else{
            res.send(plantsByState)
        }
    })
}

exports.getPlantsByCategoryList= (req, res) => {
    PlantStateModel.getAllPlantsByCategory(req.params.category, (err, plantsByCategory) => {
        if(err){
            res.send(err);
        }else{
            res.send(plantsByCategory)
        }
    })
}

exports.getPlantsByStateByCategoryList = (req, res) => {
    PlantStateModel.getAllPlantsByStateByCategory(req.params.category,req.params.state, (err, plantsByStateByCategory) => {
        if(err){
            res.send(err);
        }else{
            res.send(plantsByStateByCategory)
        }
    })
}

exports.getTopPlantsByNetGenerationList = (req, res) => {
    PlantStateModel.getTopPlantsByNetGeneration((err, topNetGenerationPlants) => {
        if(err){
            res.send(err);
        }else{
            res.send(topNetGenerationPlants)
        }
    })
}

exports.getTopPlantsByNetGenerationByStateList = (req, res) => {
    PlantStateModel.getTopPlantsByNetGenerationByState( req.params.state,req.params.top, (err, topNetGenerationPlantsByState) => {
        if(err){
            res.send(err);
        }else{
            res.send(topNetGenerationPlantsByState)
        }
    })
}

exports.getTopPlantsByNetGenerationByCategoryList = (req, res) => {
    PlantStateModel.getTopPlantsByNetGenerationByCategory( req.params.category,req.params.top, (err, topNetGenerationPlantsByCategory) => {
        if(err){
            res.send(err);
        }else{
            res.send(topNetGenerationPlantsByCategory)
        }
    })
}

exports.getTopPlantsByNetGenerationByStateByCategoryList = (req, res) => {
    PlantStateModel.getTopPlantsByNetGenerationByStateByCategory(req.params.state,req.params.category, req.params.top, (err, topNetGenerationPlantsByStateByCategory) => {
        if(err){
            res.send(err);
        }else{
            res.send(topNetGenerationPlantsByStateByCategory)
        }
    })
}



exports.getPlantDetails = (req, res) => {
    PlantStateModel.getPlantDetails(req.params.id,(err, plantDetails) => {
        if(err){
            res.send(err);
        }else{
            res.send(plantDetails)
        }
    })
}

exports.getPlantDetailsByType = (req, res) => {
    PlantStateModel.getPlantDetailsByType(req.params.id,req.params.type,(err, plantDetailsByType) => {
        if(err){
            res.send(err);
        }else{
            res.send(plantDetailsByType)
        }
    })
}




