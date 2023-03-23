const  book  = require('./book');
const { nanoid } = require('nanoid');

const books_create = (request, h) =>{
    let respond;
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
    if(name === "" || name == null){
        respond = h.response({
            "status" : "failed" , 
            "message" : "Failed to add the book. Please fill in the name of the book."
        })
        respond.code(400)
        return respond;
    }
    if(readPage > pageCount){
         respond = h.response({
            "status" : "failed" , 
            "message" : "Failed to add the book. readPage cannot be greater than pageCount."
        })
        respond.code(400)
        return respond;
    }
    book.push(new_book);

    const success = book.filter(book=>book.id == id).length>0
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
            "message" : "Book added successfully.",
            data:{
                bookId:id,
            } 
        })
        respond.code(201)
        return respond
    }

}
    const all_books = (response, h) =>({
        "status" : "success" , 
        "message" : "Displaying all books.",
        data:book
    })


    const find_book = (request, h) => {
    const { bookId } = request.params
    const myBook = book.filter((book) => book.id === bookId)[0]
    if (!myBook || myBook === null) {
        respond = h.response({
        status: 'failed',
        message: 'book not found'
    })
    respond.code(404)
    return respond
    }
    return {
        status: 'success',
        message: 'success to find the book',
            data: {
                myBook
            }
        }
   
    }
    const edit_book = (request, h) => {
    const { bookId } = request.params
    
    const {  name  , 
        year ,
        author  , 
        summary  , 
        publisher  , 
        pageCount  ,
        readPage  ,
        reading  
    } = request.payload;
    const isFinished = (readPage, pageCount) => (readPage==pageCount)?true:(readPage<pageCount)?false:null;
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt
    const bookNumber = book.findIndex((book) => book.id === bookId)
    if(name === "" || name == null){
        respond = h.response({
            "status" : "failed" , 
            "message" : "Failed to add the book. Please fill in the name of the book."
        })
        respond.code(400)
        return respond;
    }
    if(readPage > pageCount){
         respond = h.response({
            "status" : "failed" , 
            "message" : "Failed to add the book. readPage cannot be greater than pageCount."
        })
        respond.code(400)
        return respond;
    }
    if (bookNumber >= 0 ) {
    book[bookNumber] = {
      ...book[bookNumber],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    }
    respond = h.response({
      status: 'success',
      message: 'book updated'
    })
    respond.code(200)
    return respond
    }
    respond = h.response({
    status: 'failed',
    message: 'faild to update book, book not found!'
    })
    respond.code(404)
    return respond
  }
  const delete_book = (request, h) => {
  const { bookId } = request.params

  const index = bookselft.findIndex((book) => book.id === bookId)

    if (index !== -1) {
        bookselft.splice(index, 1)

        const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus'
        })
        response.code(200)
        return response
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    })
    response.code(404)
    return response
    }
    

module.exports = {books_create, all_books, find_book, edit_book, delete_book}