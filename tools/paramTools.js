function clean(input) {
// takes a stringified JSON object as input and returns a modified (cleaned) version as output, still stringified
    const startIndex = input.indexOf('"param"');
    const endIndex = input.indexOf(':', startIndex) + 1;
    const output = input.slice(0, startIndex) + input.slice(endIndex);
    const equalsIndex = output.indexOf('=', output);
    const finalOutput = output.slice(0, equalsIndex) + '":"' + output.slice(equalsIndex + 1);

    return finalOutput;
}
    module.exports = { clean };