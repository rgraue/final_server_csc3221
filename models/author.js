const mongoose = require('mongoose');

let schema = mongoose.schema;

let authorSchema = new schema({
    name : String,
    nationality : String
});

module.exports = mongoose.model('Author', authorSchema);