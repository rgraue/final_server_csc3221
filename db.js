const mongoose = require("mongoose")

const mongoDB = process.env.MONGODB_URI || 'mongodb+srv://admin:Password21@cluster0.hsemw.mongodb.net/library?retryWrites=true&w=majority'

mongoose
    .connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('DB connected');
    })
    .catch(error => {
        console.log('Connection error ${error.message}')
    });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB Connection Error'));

module.exports = db;