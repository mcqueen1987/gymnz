const path = require('path');
const webpack = require('webpack');

module.exports = {
    resolve: {
        alias: {
            '-assets': __dirname + '/resources/js/assets',
            '-components': __dirname + '/resources/js/components',
            '-views': __dirname + '/resources/js/views',
            '-variables': __dirname + '/resources/js/variables',
            '-utils': __dirname + '/resources/js/utils',
            '-color': __dirname + '/resources/js/color'
        }
    }
};