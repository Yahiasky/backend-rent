function sortArrayByAttribute(array, attribute) {
    return array.sort((a, b) => {
        if (a[attribute] < b[attribute]) {
            return 1;
        }
        if (a[attribute] > b[attribute]) {
            return -1;
        }
        return 0;
    });
}
module.exports=sortArrayByAttribute