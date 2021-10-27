const express = require('express')
const path = require('path')
console.log('using')

module.exports = function(app) {
    app.use('/assets', express.static(path.join(__dirname, 'src/assets')))
}