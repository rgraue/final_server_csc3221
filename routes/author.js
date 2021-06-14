let express = require('express');
const author = require('../models/author');
let router = express.Router();
let authorSchema = require("../models/author");

// get method for all or by name
router.get('/', (request, response, next) =>{
    let name = request.query['name']
    if (name){
        authorSchema.find({'name':name}).exec((error,result) =>{
            if (error){
                response.send({'error':error});
            }else {
                response.send(result);
            }
        });
    } else {
        authorSchema.find().exec((error, result)=>{
            if (error){
                response.send({'error':error});
            } else {
                response.send(result);
            }
        });
    }
});

// get for id param
router.get('/:id', (request, response, next) =>{
    authorSchema.findById({"_id":request.params.id}, (error, result) =>{
        if (error){
            response.status(500).send(error);
        }else if (result){
            response.send(result);
        } else {
            response.status(404).send({"id": request.params.id, "error": "Not Found"});
        }
    });
});

// post for adding to author to db. must have name and nationality
router.post('/', (request, response, next) =>{
    bodyJson = request.body;
    if (!bodyJson.name || !bodyJson.nationality){
        HandleError(response, 'Missing Information', 'Form Data Missing', 500);
    } else {
        let author = new authorSchema({
            name : bodyJson.name,
            nationality : bodyJson.nationality
        });
        author.save((error) =>{
            if (error){
                response.send({'error':error});
            } else {
                response.send({'id': author._id});
            }
        });
    }
});

// handle errors from form input
function HandleError(response, reason, message, code){
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({"error": message});
}

module.exports = router;

