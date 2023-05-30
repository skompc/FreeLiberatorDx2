function clean(input, type, weird_lvl) {
// takes a stringified JSON object as input and returns a modified (cleaned) version as output, still stringified
//weird_lvl 0 means nothing else needs fixing
//weird_lvl 1 means the the input has more '&' than needed, since some '=' got changed 
//weird_lvl 2 means the input is uri encoded
//weird_lvl 3 is 1 plus 2
// any weird_lvl above 2 means extra uri decoding is needed
    let string = input
    if (weird_lvl > 0){
        if (weird_lvl > 1){
            let decodeNum = Math.floor(weird_lvl/2)
            string = decodeUriMultipleTimes(string, decodeNum)
        }
        if(weird_lvl % 2 != 0){
            string = paramShift(string)
        }
    }
    if (type = 0){
        const startIndex = string.indexOf('"param"');
        const endIndex = string.indexOf(':', startIndex) + 1;
        const output = string.slice(0, startIndex) + string.slice(endIndex);
        const equalsIndex = output.indexOf('=', output);
        const finalOutput = output.slice(0, equalsIndex) + '":"' + output.slice(equalsIndex + 1);
        return finalOutput;
    }

    if (type = 1){
        let newString = string.replace("param=", "");
        let output = newString.replace("&", "=");
        return output;
    }
}

function decodeUriMultipleTimes(uri, times) {
    let decodedUri = uri;
    
    for (let i = 0; i < times; i++) {
        decodedUri = decodeURIComponent(decodedUri);
    }
    
    return decodedUri;
  }

  function paramShift(input){
    let array = input.split('&');
    const firstThreeElements = array.slice(0, 3);
    const firstThreeElementsString = firstThreeElements.join('&');
    array.splice(0, 3)
    array = array.filter(element => !element.includes('='));
    const combinedArray = [];
    for (let i = 0; i < array.length; i += 2) {
      const combinedElement = array[i] + '=' + array[i + 1];
      combinedArray.push(combinedElement);
    }
    const output = firstThreeElementsString + "&" + combinedArray.join('&');
    return output
  }
module.exports = { clean };