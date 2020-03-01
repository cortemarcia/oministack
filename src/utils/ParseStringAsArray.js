

module.exports= async function parseStringAsArray(ArrayAsString) {
     
    return await ArrayAsString.split(',').map(tech => tech.trim());

}

