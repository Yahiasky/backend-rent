function average(array) {
    let sum = array.reduce((a, b) => a + b, 0);
    return sum / array.length;
}
module.exports=average