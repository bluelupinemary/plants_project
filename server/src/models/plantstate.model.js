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


PlantState.getAllPlants = (result) => {
    dbConn.query("select SEQPLT20, PNAME,PSTATABB, PLFUELCT, LAT, LON from plant_state", (err, res)=>{
        if(err){
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

PlantState.getAllPlantsByState = (state, result) => {
    dbConn.query("select SEQPLT20,PNAME,PSTATABB, LAT, LON,PLFUELCT from plant_state where PSTATABB = ? ", state, (err, res)=>{
        if(err){
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

//get plants by category
PlantState.getAllPlantsByCategory = (category, result) => {
    const categoryMap = {
        'COAL':'PLGENACL',
        'OIL':'PLGENAOL',
        'GAS':'PLGENAGS',
       'NUCLEAR':'PLGENANC',
       'HYDRO':'PLGENAHY',
       'BIOMASS':'PLGENABM',
       'WIND':'PLGENAWI',
       'SOLAR':'PLGENASO',
       'GEOTHERMAL':'PLGENAGT',
       'OFSL':'PLGENAOF',
       'OTHF':'PLGENAOP',
       'RENEWABLE':'PLGENATN',
       'NONRENEWABLE':'PLGENATR',
       'NONHYDRO':'PLGENATH'
    }
    dbConn.query("select SEQPLT20,PSTATABB,PNAME,LAT,LON, PLFUELCT,"+categoryMap[category]+" as val from plant_state where PLFUELCT = ? order by "+categoryMap[category]+" desc", [category], (err, res)=>{
        if(err){
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

PlantState.getAllPlantsByStateByCategory = (category, state, result) => {
    const categoryMap = {
        'COAL':'PLGENACL',
        'OIL':'PLGENAOL',
        'GAS':'PLGENAGS',
        'NUCLEAR':'PLGENANC',
        'HYDRO':'PLGENAHY',
        'BIOMASS':'PLGENABM',
        'WIND':'PLGENAWI',
        'SOLAR':'PLGENASO',
        'GEOTHERMAL':'PLGENAGT',
        'OFSL':'PLGENAOF',
        'OTHF':'PLGENAOP',
        'RENEWABLE':'PLGENATN',
        'NONRENEWABLE':'PLGENATR',
        'NONHYDRO':'PLGENATH'
    }
    let theQuery = "select SEQPLT20,PSTATABB,PNAME,LAT,LON,PLFUELCT, "+categoryMap[category]+" as val from plant_state WHERE PSTATABB=? and PLFUELCT=? order by "+categoryMap[category]+" desc";
    dbConn.query(theQuery, [state,category], (err, res)=>{
        if(err){
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

//get top n plants by net generation
PlantState.getTopPlantsByNetGeneration = (top, result) => {
    const topNetGeneration = {};
    
    dbConn.query("select SEQPLT20,PNAME, PSTATABB, LAT, LON, PLGENACL as val from plant_state order by PLGENACL desc limit ?;  "+
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON , PLGENAOL as val from plant_state order by PLGENAOL desc limit ?;"+
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON , PLGENAGS as val from plant_state order by PLGENAGS desc limit ?;"+ 
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON , PLGENANC as val from plant_state order by PLGENANC desc limit ?;"+ 
    "select SEQPLT20, PNAME, PSTATABB,LAT, LON , PLGENAHY as val from plant_state order by PLGENAHY desc limit ?;"+ 
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON , PLGENABM as val from plant_state order by PLGENABM desc limit ?;"+ 
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON , PLGENAWI as val from plant_state order by PLGENAWI desc limit ?;"+ 
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON , PLGENASO as val from plant_state order by PLGENASO desc limit ?;"+ 
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON , PLGENAGT as val from plant_state order by PLGENAGT desc limit ?;"+ 
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON , PLGENAOF as val from plant_state order by PLGENAOF desc limit ?;"+ 
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON , PLGENAOP as val from plant_state order by PLGENAOP desc limit ?;"+ 
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON , PLGENATN as val from plant_state order by PLGENATN desc limit ?;"+ 
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON , PLGENATR as val from plant_state order by PLGENATR desc limit ?;",
    [parseInt(top),parseInt(top),
        parseInt(top),parseInt(top),
        parseInt(top),parseInt(top),
        parseInt(top),parseInt(top),
        parseInt(top),parseInt(top),
        parseInt(top),parseInt(top),
        parseInt(top)
    ] , (err, res)=>{
        if(err){
            result(null, err);
        }else{
            topNetGeneration["COAL"] = res[0];
            topNetGeneration["OIL"] = res[1];
            topNetGeneration["GAS"] = res[2];
            topNetGeneration["NUCLEAR"] = res[3];
            topNetGeneration["HYDRO"] = res[4];
            topNetGeneration["BIOMASS"] = res[5];
            topNetGeneration["WIND"] = res[6];
            topNetGeneration["SOLAR"] = res[7];
            topNetGeneration["GEOTHERMAL"] = res[8];
            topNetGeneration["OFSL"] = res[9];
            topNetGeneration["OTHF"] = res[10];
            topNetGeneration["NONRENEWABLE"] = res[11];
            topNetGeneration["RENEWABLE"] = res[12];
            result(null, topNetGeneration);
        }
    });

}

PlantState.getTopPlantsByNetGenerationByState = (state, top, result) => {
    let theQuery = "select SEQPLT20,PSTATABB,PNAME,LAT,LON, PLFUELCT from plant_state where PSTATABB=? limit ?";
    
    dbConn.query(theQuery, 
    [state, parseInt(top)] , (err, res)=>{
        if(err){
            result(null, err);
        }else{
            result(null, res);
        }
    });

}

PlantState.getTopPlantsByNetGenerationByCategory = (category, top, result) => {
    const topNetGeneration = {};
    const categoryMap = {
        'COAL':'PLGENACL',
        'OIL':'PLGENAOL',
        'GAS':'PLGENAGS',
       'NUCLEAR':'PLGENANC',
       'HYDRO':'PLGENAHY',
       'BIOMASS':'PLGENABM',
       'WIND':'PLGENAWI',
       'SOLAR':'PLGENASO',
       'GEOTHERMAL':'PLGENAGT',
       'OFSL':'PLGENAOF',
       'OTHF':'PLGENAOP',
       'RENEWABLE':'PLGENATN',
       'NONRENEWABLE':'PLGENATR',
       'NONHYDRO':'PLGENATH'
    }
    let theQuery = "select SEQPLT20,PSTATABB,PNAME,LAT,LON, PLFUELCT, "+categoryMap[category]+" as val from plant_state order by "+categoryMap[category]+" desc limit ?";
    
    dbConn.query(theQuery, 
    [parseInt(top)] , (err, res)=>{
        if(err){
            result(null, err);
        }else{
            
            topNetGeneration[category] = res;
            result(null, topNetGeneration);
        }
    });

}


PlantState.getTopPlantsByNetGenerationByStateByCategory = (state, category, top, result) => {
    const categoryMap = {
        'COAL':'PLGENACL',
        'OIL':'PLGENAOL',
        'GAS':'PLGENAGS',
       'NUCLEAR':'PLGENANC',
       'HYDRO':'PLGENAHY',
       'BIOMASS':'PLGENABM',
       'WIND':'PLGENAWI',
       'SOLAR':'PLGENASO',
       'GEOTHERMAL':'PLGENAGT',
       'OFSL':'PLGENAOF',
       'OTHF':'PLGENAOP',
       'RENEWABLE':'PLGENATN',
       'NONRENEWABLE':'PLGENATR',
       'NONHYDRO':'PLGENATH'
    }
    let theQuery = "select SEQPLT20,PSTATABB,PNAME,LAT,LON,PLFUELCT, "+categoryMap[category]+" as val from plant_state where PSTATABB=? and PLFUELCT=? order by "+categoryMap[category]+" desc limit ?";
    dbConn.query(theQuery,
    [state,category,parseInt(top)] , (err, res)=>{
        if(err){
            result(null, err);
        }else{
            result(null, res);
        }
    });

}

PlantState.getPlantDetails = (id, result) => {
    dbConn.query("SELECT * from plant_state where SEQPLT20 = ?",[parseInt(id)], (err, res)=>{
        if(err){
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

PlantState.getPlantDetailsByType = (id,type, result) => {
    let theQuery;
    if(type === 'net') theQuery = "SELECT PLGENACL,PLGENAOL,PLGENAGS,PLGENANC,PLGENAHY,PLGENABM,PLGENAWI,PLGENASO,PLGENAGT,PLGENAOF,PLGENAOP,PLGENATN,PLGENATR,PLGENATH,PLGENACY, PLGENACN from plant_state where SEQPLT20 = ?";
    else if(type === 'percent')  theQuery = "SELECT PLCLPR, PLOLPR, PLGSPR,PLNCPR,PLHYPR,PLBMPR,PLWIPR,PLSOPR,PLGTPR,PLOFPR,PLOPPR,PLTNPR,PLTRPR,PLTHPR,PLCYPR ,PLCNPR from plant_state where SEQPLT20 = ?";
    dbConn.query(theQuery,[parseInt(id)], (err, res)=>{
        if(err){
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

module.exports = PlantState;