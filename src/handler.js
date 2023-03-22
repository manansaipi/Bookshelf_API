const  book  = require('./book');
const { nanoid } = require('nanoid');

const books_create = (request, h) =>{
    const {  name  , 
    year ,
    author  , 
    summary  , 
    publisher  , 
    pageCount  ,
    readPage  ,
    reading  } = request.payload;
    const id = nanoid(10);
    const isFinished = (readPage, pageCount) => (readPage==pageCount)?true:(readPage<pageCount)?false:null;
    const finished = isFinished(readPage, pageCount)
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt
    const new_book = {
    id , 
    name, 
    year, 
    author, 
    summary, 
    publisher, 
    pageCount, 
    readPage, 
    finished, 
    reading, 
    insertedAt, 
    updatedAt
    }
    
    book.push(new_book);

    const success = book.filter(book=>book.id == id).length>0
    let respond;
    if(!success){
        respond = h.response({
            "status" : "failed" , 
            "message" : "Failed to add the book."
        })
        respond.code(400)
        return respond
    } else {
        respond = h.response({
            "status" : "success" , 
            "message" : "success to add the book.",
            data:{
                bookId:id,
            } 
        })
        respond.code(201)
        return respond
    }
}
module.exports = {books_create}