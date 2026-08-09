const express = require('express');

let app;
try {
    app = express();
} catch (error) {
    console.log('Error initializing express app:', error);
}

module.exports = app;