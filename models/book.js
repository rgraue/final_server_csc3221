const mongoose = require('mongoose')

let schema = mongoose.Scheme;

let bookSchema = new schema({
    title : String,
    description : String,
    year : Number,
    author : String,
    hardCover : Boolean,
    price : Number
})

module.exports = mongoose.model('Book', bookSchema)