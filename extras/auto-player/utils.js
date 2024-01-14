async function arrayPick(array2Pick, arg2Pick){
  if (!Array.isArray(array2Pick)) {
    throw new Error('Input is not an array');
  }

  // Extract "uniq" key from each object in the array
  const uniqKeysArray = array2Pick.map(obj => obj[arg2Pick]);

  const arrayLength = array2Pick.length;

  return {
    keys: uniqKeysArray,
    length: arrayLength
  }
}

async function main(){
    let input = [
        {
            uniq: 4,
            id: 11910
        },
        {
            uniq:5,
            id:12345
        },
        {
            uniq:6,
            id:98765
        }
    ]
    
    let a = await arrayPick(input,"uniq")
    let b = await arrayPick(input,"id")
    
    console.log(a)
    console.log(b)
}

main()

module.exports = {arrayPick}