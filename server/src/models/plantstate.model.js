var dbConn = require("../../config/db.config");

var PlantState = (plantstate) => {
    this.SEQPLT20	=	plantstate.SEQPLT20,
    this.YEAR	=	plantstate.YEAR,
    this.PSTATABB	=	plantstate.PSTATABB,
    this.PNAME	=	plantstate.PNAME,
    this.ORISPL	=	plantstate.ORISPL,
    this.OPRNAME	=	plantstate.OPRNAME,
    this.OPRCODE	=	plantstate.OPRCODE,
    this.UTLSRVNM	=	plantstate.UTLSRVNM,
    this.UTLSRVID	=	plantstate.UTLSRVID,
    this.SECTOR	=	plantstate.SECTOR,
    this.BANAME	=	plantstate.BANAME,
    this.BACODE	=	plantstate.BACODE,
    this.NERC	=	plantstate.NERC,
    this.SUBRGN	=	plantstate.SUBRGN,
    this.SRNAME	=	plantstate.SRNAME,
    this.ISORTO	=	plantstate.ISORTO,
    this.FIPSST	=	plantstate.FIPSST,
    this.FIPSCNTY	=	plantstate.FIPSCNTY,
    this.CNTYNAME	=	plantstate.CNTYNAME,
    this.LAT	=	plantstate.LAT,
    this.LON	=	plantstate.LON,
    this.NUMUNT	=	plantstate.NUMUNT,
    this.NUMGEN	=	plantstate.NUMGEN,
    this.PLPRMFL	=	plantstate.PLPRMFL,
    this.PLFUELCT	=	plantstate.PLFUELCT,
    this.PLGENACL	=	plantstate.PLGENACL,
    this.PLGENAOL	=	plantstate.PLGENAOL,
    this.PLGENAGS	=	plantstate.PLGENAGS,
    this.PLGENANC	=	plantstate.PLGENANC,
    this.PLGENAHY	=	plantstate.PLGENAHY,
    this.PLGENABM	=	plantstate.PLGENABM,
    this.PLGENAWI	=	plantstate.PLGENAWI,
    this.PLGENASO	=	plantstate.PLGENASO,
    this.PLGENAGT	=	plantstate.PLGENAGT,
    this.PLGENAOF	=	plantstate.PLGENAOF,
    this.PLGENAOP	=	plantstate.PLGENAOP,
    this.PLGENATN	=	plantstate.PLGENATN,
    this.PLGENATR	=	plantstate.PLGENATR,
    this.PLGENATH	=	plantstate.PLGENATH,
    this.PLGENACY	=	plantstate.PLGENACY,
    this.PLGENACN	=	plantstate.PLGENACN,
    this.PLCLPR	=	plantstate.PLCLPR,
    this.PLOLPR	=	plantstate.PLOLPR,
    this.PLGSPR	=	plantstate.PLGSPR,
    this.PLNCPR	=	plantstate.PLNCPR,
    this.PLHYPR	=	plantstate.PLHYPR,
    this.PLBMPR	=	plantstate.PLBMPR,
    this.PLWIPR	=	plantstate.PLWIPR,
    this.PLSOPR	=	plantstate.PLSOPR,
    this.PLGTPR	=	plantstate.PLGTPR,
    this.PLOFPR	=	plantstate.PLOFPR,
    this.PLOPPR	=	plantstate.PLOPPR,
    this.PLTNPR	=	plantstate.PLTNPR,
    this.PLTRPR	=	plantstate.PLTRPR,
    this.PLTHPR	=	plantstate.PLTHPR,
    this.PLCYPR	=	plantstate.PLCYPR,
    this.PLCNPR	=	plantstate.PLCNPR
}


PlantState.getAllDistinctStates = (result) => {
    dbConn.query("SELECT distinct PSTATABB from plant_state", (err, res)=>{
        if(err){
            console.log("Error while fetching states",err);
            result(null, err);
        }else{
            console.log("fetched successfully");
            result(null, res);
        }
    })
}

PlantState.getAllPlants = (result) => {
    dbConn.query("select PNAME,PSTATABB, PLFUELCT, LAT, LON from plant_state", (err, res)=>{
        if(err){
            console.log("Error while fetching plants location",err);
            result(null, err);
        }else{
            console.log("fetched successfully");
            result(null, res);
        }
    })
}

PlantState.getPlantsByState = (stateAbb, result) => {
    dbConn.query("select PNAME,PSTATABB, LAT, LON from plant_state where PSTATABB = ? ", stateAbb, (err, res)=>{
        if(err){
            console.log("Error while fetching plants location",err);
            result(null, err);
        }else{
            console.log("fetched successfully");
            result(null, res);
        }
    })
}

//get plants by category

//get plants by state by category

//get top n plants by net generation
PlantState.getTopPlantsByNetGeneration = (top, result) => {
    const topNetGeneration = {};
    
    dbConn.query("select PNAME, PSTATABB as state, PLGENACL as val from plant_state order by PLGENACL desc limit ?;  "+
    "select PNAME, PSTATABB as state, PLGENAOL as val from plant_state order by PLGENAOL desc limit ?;"+
    "select PNAME, PSTATABB as state, PLGENAGS as val from plant_state order by PLGENAGS desc limit ?;"+ 
    "select PNAME, PSTATABB as state, PLGENANC as val from plant_state order by PLGENANC desc limit ?;"+ 
    "select PNAME, PSTATABB as state, PLGENAHY as val from plant_state order by PLGENAHY desc limit ?;"+ 
    "select PNAME, PSTATABB as state, PLGENABM as val from plant_state order by PLGENABM desc limit ?;"+ 
    "select PNAME, PSTATABB as state, PLGENAWI as val from plant_state order by PLGENAWI desc limit ?;"+ 
    "select PNAME, PSTATABB as state, PLGENASO as val from plant_state order by PLGENASO desc limit ?;"+ 
    "select PNAME, PSTATABB as state, PLGENAGT as val from plant_state order by PLGENAGT desc limit ?;"+ 
    "select PNAME, PSTATABB as state, PLGENAOF as val from plant_state order by PLGENAOF desc limit ?;"+ 
    "select PNAME, PSTATABB as state, PLGENAOP as val from plant_state order by PLGENAOP desc limit ?;"+ 
    "select PNAME, PSTATABB as state, PLGENATN as val from plant_state order by PLGENATN desc limit ?;"+ 
    "select PNAME, PSTATABB as state, PLGENATR as val from plant_state order by PLGENATR desc limit ?;",
    [parseInt(top),parseInt(top),
        parseInt(top),parseInt(top),
        parseInt(top),parseInt(top),
        parseInt(top),parseInt(top),
        parseInt(top),parseInt(top),
        parseInt(top),parseInt(top),
        parseInt(top)
    ] , (err, res)=>{
        if(err){
            console.log("Error while fetching plants location",err);
            result(null, err);
        }else{
            
            topNetGeneration["coal"] = res[0];
            topNetGeneration["oil"] = res[1];
            topNetGeneration["gas"] = res[2];
            topNetGeneration["nuclear"] = res[3];
            topNetGeneration["hydro"] = res[4];
            topNetGeneration["biomass"] = res[5];
            topNetGeneration["wind"] = res[6];
            topNetGeneration["solar"] = res[7];
            topNetGeneration["geothermal"] = res[8];
            topNetGeneration["fossil"] = res[9];
            topNetGeneration["purchasedfuel"] = res[10];
            topNetGeneration["nonrenewable"] = res[11];
            topNetGeneration["renewable"] = res[12];
            console.log("fetched successfully",res);
            result(null, topNetGeneration);
        }
    });

}

// PlantState.getTopPlantsByNetGenerationByState = (state, top, result) => {
//     const topNetGeneration = {};
    
//     dbConn.query("select PSTATABB as state, PLGENACL as val from plant_state where PSTATABB=? order by PLGENACL desc limit ?;  "+
//     "select PSTATABB as state, PLGENAOL as val from plant_state where PSTATABB=? order by PLGENAOL desc limit ?;", 
//     "select PSTATABB as state, PLGENAGS as val from plant_state where PSTATABB=? order by PLGENAGS desc limit ?;", 
//     "select PSTATABB as state, PLGENANC as val from plant_state where PSTATABB=? order by PLGENANC desc limit ?;", 
//     "select PSTATABB as state, PLGENAHY as val from plant_state where PSTATABB=? order by PLGENAHY desc limit ?;", 
//     "select PSTATABB as state, PLGENABM as val from plant_state where PSTATABB=? order by PLGENABM desc limit ?;", 
//     "select PSTATABB as state, PLGENAWI as val from plant_state where PSTATABB=? order by PLGENAWI desc limit ?;", 
//     "select PSTATABB as state, PLGENASO as val from plant_state where PSTATABB=? order by PLGENASO desc limit ?;", 
//     "select PSTATABB as state, PLGENAGT as val from plant_state where PSTATABB=? order by PLGENAGT desc limit ?;", 
//     "select PSTATABB as state, PLGENAOF as val from plant_state where PSTATABB=? order by PLGENAOF desc limit ?;", 
//     "select PSTATABB as state, PLGENAOP as val from plant_state where PSTATABB=? order by PLGENAOP desc limit ?;", 
//     "select PSTATABB as state, PLGENATN as val from plant_state where PSTATABB=? order by PLGENATN desc limit ?;", 
//     "select PSTATABB as state, PLGENATR as val from plant_state where PSTATABB=? order by PLGENATR desc limit ?;", 
//     [state,parseInt(top),state,parseInt(top),
//         state,parseInt(top),state,parseInt(top),
//         state,parseInt(top),state,parseInt(top),
//         state,parseInt(top),state,parseInt(top),
//         state,parseInt(top),state,parseInt(top),
//         state,parseInt(top),state,parseInt(top),
//         state,parseInt(top),
//     ] , (err, res)=>{
//         if(err){
//             console.log("Error while fetching plants location",err);
//             result(null, err);
//         }else{
            
//             topNetGeneration["coal"] = res[0];
//             topNetGeneration["oil"] = res[1];
//             topNetGeneration["gas"] = res[2];
//             topNetGeneration["nuclear"] = res[3];
//             topNetGeneration["hydro"] = res[4];
//             topNetGeneration["biomass"] = res[5];
//             topNetGeneration["wind"] = res[6];
//             topNetGeneration["solar"] = res[7];
//             topNetGeneration["geothermal"] = res[8];
//             topNetGeneration["fossil"] = res[9];
//             topNetGeneration["purchasedfuel"] = res[10];
//             topNetGeneration["nonrenewable"] = res[11];
//             topNetGeneration["renewable"] = res[12];
//             console.log("fetched successfully",res);
//             result(null, topNetGeneration);
//         }
//     });

// }



module.exports = PlantState;