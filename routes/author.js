let express = require('express');
let router = express.Router();
let authorSchema = require("../models/author");

function HandleError(response, reason, message, code){
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({"error": message});
}

module.exports = router;

