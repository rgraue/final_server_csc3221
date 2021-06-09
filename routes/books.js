let express = require('express');
let router = express.Router();
let bookSchema = require('../models/book')

router.get('/', (request, response, next)=>{
    let tile = request.query['title'];
    if (title){
        bookSchema
            .find({"title": title})
            .exec( (error, books) =>{
               if (error){
                   response.send({"error": error});
               }else{
                   response.send(books);
               }
            });
    }else{
        bookSchema
            .find()
            .exec( (error, books) =>{
                if (error){
                    response.send({"error": error});
                }else{
                    response.send(books);
                }
            });
    }
});

module.exports = router;