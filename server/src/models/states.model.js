var dbConn = require("../../config/db.config");

var States = (states) => {
    this.id = states.id,
    this.state=states.state,
    this.lon=states.lon,
    this.lat=states.lat,
    this.name=states.name
}


States.getAllStates = (result) => {
    dbConn.query("SELECT state as PSTATABB, lon, lat, name from states", (err, res)=>{
        if(err){
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

States.getStateDetails = (code, result) => {
    dbConn.query("SELECT state as PSTATABB, lon, lat, name from states where state = ?",[code], (err, res)=>{
        if(err){
            result(null, err);
        }else{
            result(null, res);
        }
    })
}


module.exports = States;
