const PlantStateModel = require("../models/plantstate.model");

exports.getStatesList = (req, res) => {
    PlantStateModel.getAllDistinctStates((err, distinctStates) => {
        // console.log("all plant state",distinctStates)
        if(err){
            res.send(err);
        }else{
            res.send(distinctStates)
        }
    })
}

exports.getPlantsList = (req, res) => {
    PlantStateModel.getAllPlants((err, plantLocations) => {
        // console.log("all plant locations",plantLocations)
        if(err){
            res.send(err);
        }else{
            res.send(plantLocations)
        }
    })
}

exports.getPlantsByStateList = (req, res) => {
    PlantStateModel.getAllPlantsByState(req.params.state, (err, plantsByState) => {
        // console.log("all plant locations",plantsByState)
        if(err){
            res.send(err);
        }else{
            res.send(plantsByState)
        }
    })
}

exports.getPlantsByCategoryList= (req, res) => {
    PlantStateModel.getAllPlantsByCategory(req.params.category, (err, plantsByCategory) => {
        // console.log("all plant locations",plantsByCategory)
        if(err){
            res.send(err);
        }else{
            res.send(plantsByCategory)
        }
    })
}

exports.getPlantsByStateByCategoryList = (req, res) => {
    PlantStateModel.getAllPlantsByStateByCategory(req.params.category,req.params.state, (err, plantsByStateByCategory) => {
        // console.log("all plant locations",plantsByStateByCategory)
        if(err){
            res.send(err);
        }else{
            res.send(plantsByStateByCategory)
        }
    })
}

exports.getTopPlantsByNetGenerationList = (req, res) => {
    PlantStateModel.getTopPlantsByNetGeneration(req.params.top, (err, topNetGenerationPlants) => {
        // console.log("top n plants by net generation",topNetGenerationPlants)
        if(err){
            res.send(err);
        }else{
            res.send(topNetGenerationPlants)
        }
    })
}

exports.getTopPlantsByNetGenerationByStateList = (req, res) => {
    PlantStateModel.getTopPlantsByNetGenerationByState( req.params.state,req.params.top, (err, topNetGenerationPlantsByState) => {
        // console.log("top n plants by net generation",topNetGenerationPlantsByState)
        if(err){
            res.send(err);
        }else{
            res.send(topNetGenerationPlantsByState)
        }
    })
}

exports.getTopPlantsByNetGenerationByCategoryList = (req, res) => {
    PlantStateModel.getTopPlantsByNetGenerationByCategory( req.params.category,req.params.top, (err, topNetGenerationPlantsByCategory) => {
        // console.log("top n plants by net generation",topNetGenerationPlantsByCategory)
        if(err){
            res.send(err);
        }else{
            res.send(topNetGenerationPlantsByCategory)
        }
    })
}

exports.getTopPlantsByNetGenerationByStateByCategoryList = (req, res) => {
    PlantStateModel.getTopPlantsByNetGenerationByStateByCategory(req.params.state,req.params.category, req.params.top, (err, topNetGenerationPlantsByStateByCategory) => {
        console.log("top n plants by net generation by state by category",topNetGenerationPlantsByStateByCategory)
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




