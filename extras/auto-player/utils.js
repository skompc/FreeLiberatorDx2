async function arrayPick(array2Pick, arg2Pick){
  if (!Array.isArray(array2Pick)) {
    throw new Error('Input is not an array');
  }

  // Extract "uniq" key from each object in the array
  const uniqKeysArray = array2Pick.map(obj => obj[arg2Pick]);

  return uniqKeysArray
}

async function build_devil_info(party_array, partyHP_array, enemy_array, enemyHP){
  let finalString = `{"is_not_using_command":1,"devil_info":["{\\"uniq_id\\":${party_array[0]},\\"defeat_num\\":${(enemy_array.length)},\\"hp\\":${partyHP_array[0]},\\"total_damage\\":${enemyHP},\\"cond_add_type\\":[],\\"cond_add_count\\":[],\\"action_result_type\\":[${(enemy_array.length)}],\\"action_result_count\\":[${(enemy_array.length - 1)}]}"`;


  for(let i = 1; i < party_array.length; i++){
    finalString = finalString.concat(`,"{\\"uniq_id\\":${party_array[i]},\\"defeat_num\\":0,\\"hp\\":${partyHP_array[i]},\\"total_damage\\":0,\\"cond_add_type\\":[],\\"cond_add_count\\":[],\\"action_result_type\\":[0],\\"action_result_count\\":[0]}"`)
  }

  finalString = finalString.concat(`],"enemy_devil_info":["{\\"uniq_id\\":${enemy_array[0]},\\"defeat_num\\":0,\\"hp\\":0,\\"total_damage\\":0,\\"cond_add_type\\":[],\\"cond_add_count\\":[],\\"action_result_type\\":[],\\"action_result_count\\":[]}"`)


  for(let i = 1; i < enemy_array.length; i++){
    finalString = finalString.concat(`,"{\\"uniq_id\\":${enemy_array[i]},\\"defeat_num\\":0,\\"hp\\":0,\\"total_damage\\":0,\\"cond_add_type\\":[],\\"cond_add_count\\":[],\\"action_result_type\\":[],\\"action_result_count\\":[]}"`)
  }

  finalString = finalString.concat(`],"result_drama_cutin":[]}`)

  return finalString;

}

function sumArray(arrayOfIntegers) {
  // Check if the input is an array
  if (!Array.isArray(arrayOfIntegers)) {
    throw new Error('Input is not an array');
  }

  // Use reduce to calculate the sum
  const sum = arrayOfIntegers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  return sum;
}

module.exports = {arrayPick, build_devil_info, sumArray}