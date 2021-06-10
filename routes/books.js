let express = require('express');
let router = express.Router();
let bookSchema = require('../models/book')

router.get('/', (request, response, next)=>{
    let title = request['title']
    if (title){
        bookSchema
            .find({"title": title})
            .exec( (error, book) =>{
               if (error){
                   response.send({"error": error});
               }else{
                   response.send(book);
               }
            });
    }else{
        bookSchema
            .find()
            .exec( (error, book) =>{
                if (error){
                    response.send({"error": error});
                }else{
                    response.send(book);
                }
            });
    }
});

module.exports = router;