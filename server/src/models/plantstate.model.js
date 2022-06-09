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
function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)].val, //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i].val > pivot) {
            i++;
        }
        while (items[j].val < pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //swap two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, index, right);
        }
    }
    return items;
}



PlantState.getTopPlantsByNetGeneration = (result) => {
    const mergedArr = [];
    
    dbConn.query("select SEQPLT20,PNAME, PSTATABB, LAT, LON, PLFUELCT, PLGENACL as val, PLCLPR as percent from plant_state where PLGENACL > 0 order by PLGENACL desc;  "+
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON, PLFUELCT, PLGENAOL as val,PLOLPR as percent from plant_state where PLGENAOL > 0 order by PLGENAOL desc;"+
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON, PLFUELCT, PLGENAGS as val,PLGSPR as percent from plant_state where PLGENAGS > 0 order by PLGENAGS desc;"+ 
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON, PLFUELCT, PLGENANC as val,PLNCPR  as percent from plant_state where PLGENANC > 0 order by PLGENANC desc;"+ 
    "select SEQPLT20, PNAME, PSTATABB,LAT, LON, PLFUELCT, PLGENAHY as val,PLHYPR as percent from plant_state where PLGENAHY > 0 order by PLGENAHY desc;"+ 
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON, PLFUELCT, PLGENABM as val,PLBMPR as percent from plant_state where PLGENABM > 0 order by PLGENABM desc;"+ 
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON, PLFUELCT, PLGENAWI as val,PLWIPR as percent from plant_state where PLGENAWI > 0 order by PLGENAWI desc;"+ 
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON, PLFUELCT, PLGENASO as val,PLSOPR as percent from plant_state where PLGENASO > 0 order by PLGENASO desc;"+ 
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON, PLFUELCT, PLGENAGT as val,PLGTPR as percent from plant_state where PLGENAGT > 0 order by PLGENAGT desc;"+ 
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON, PLFUELCT, PLGENAOF as val,PLOFPR as percent from plant_state where PLGENAOF > 0 order by PLGENAOF desc;"+ 
    "select SEQPLT20,PNAME, PSTATABB,LAT, LON, PLFUELCT, PLGENAOP as val,PLOPPR as percent from plant_state where PLGENAOP > 0 order by PLGENAOP desc;",
    [
    ] , (err, res)=>{
        if(err){
            result(null, err);
        }else{
            //make one merged array from arrays
            for(i=0;i<res.length;i++){
                mergedArr.push(...res[i]);
            }
            //sort the merged array to descending order
            var sortedPlants = quickSort(mergedArr, 0, mergedArr.length - 1)
            result(null, sortedPlants);
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
       'NONHYDRO':'PLGENATH',
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