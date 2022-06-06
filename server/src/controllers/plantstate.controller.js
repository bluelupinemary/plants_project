const PlantStateModel = require("../models/plantstate.model");

exports.getStatesList = (req, res) => {
    // console.log('all states list');
    PlantStateModel.getAllDistinctStates((err, distinctStates) => {
        console.log("all plant state",distinctStates)
        if(err){
            res.send(err);
        }else{
            res.send(distinctStates)
        }
    })
}

exports.getPlantsList = (req, res) => {
    PlantStateModel.getAllPlants((err, plantLocations) => {
        console.log("all plant locations",plantLocations)
        if(err){
            res.send(err);
        }else{
            res.send(plantLocations)
        }
    })
}

exports.getPlantsByStateList = (req, res) => {
    PlantStateModel.getPlantsByState(req.params.stateAbb, (err, plantsByState) => {
        console.log("all plant locations",plantsByState)
        if(err){
            res.send(err);
        }else{
            res.send(plantsByState)
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

// exports.getTopPlantsByNetGenerationByStateList = (req, res) => {
//     PlantStateModel.getTopPlantsByNetGenerationByState(req.params.top, (err, topNetGenerationPlants) => {
//         console.log("top n plants by net generation",topNetGenerationPlants)
//         if(err){
//             res.send(err);
//         }else{
//             res.send(topNetGenerationPlants)
//         }
//     })
// }



