const StatesModel = require("../models/states.model");


exports.getStatesList = (req, res) => {
    StatesModel.getAllStates((err, states) => {
        if(err){
            res.send(err);
        }else{
            res.send(states)
        }
    })
}

exports.getStateDetailsList = (req, res) => {
    StatesModel.getStateDetails(req.params.code,(err, states) => {
        if(err){
            res.send(err);
        }else{
            res.send(states)
        }
    })
}