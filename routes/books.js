let express = require('express');
let router = express.Router();
let bookSchema = require('../models/book')

// get method for all books
router.get('/', (request, response, next)=>{
    let title = request.query['title']
    if (title){
        console.log(title);
        bookSchema
            .find({'title': title})
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

// get mothod with given _id
router.get('/:id', (request, response, next)=>{
    bookSchema.findById({"_id": request.params.id}, (error, result) =>{
        if (error){
            response.status(500).send(error);
        } else if (result){
            response.send(result);
        } else {
            response.status(404).send({"id": request.params.id, "error": "Not Found"});
        }
    });
});

// post method for book collection
router.post('/', (request, response, next) =>{
    let bodyJson = request.body;
    console.log(request.body)
    if (!bodyJson.title || !bodyJson.author){
        HandleError(response, 'Missing Information', 'Form Data Missing', 500);
    } else {
        let book = new bookSchema({
            title:bodyJson.title,
            description:bodyJson.description || "",
            year: bodyJson.year || 2021,
            author: bodyJson.author,
            hardCover: bodyJson.hardCover || true,
            price: bodyJson.price || 0.0
        })
        book.save((error)=>{
          if (error){
              response.send({"error" : error})
          }  else{
              response.send({"id":book._id})
          }
        })
    }
});



module.exports = router;