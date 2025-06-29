function formDate(date) {
    return new Date(date).toLocaleString(navigator.language).replace(',', '').replace(/\./g, ':');  

}

module.exports = { formDate };