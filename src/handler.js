const  bookselft  = require('./book');
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
            "status" : "fail" , 
            "message" : "fail to add the book. Please fill in the name of the book."
        })
        respond.code(400)
        return respond;
    }
    if(readPage > pageCount){
         respond = h.response({
            "status" : "fail" , 
            "message" : "fail to add the book. readPage cannot be greater than pageCount."
        })
        respond.code(400)
        return respond;
    }
    bookselft.push(new_book);

    const success = bookselft.filter(bookselft=>bookselft.id == id).length>0
    if(!success){
        respond = h.response({
            "status" : "fail" , 
            "message" : "failed to add the book."
        })
        respond.code(400)
        return respond
    } else {
        respond = h.response({
            "status" : "success" , 
            "message" : "Buku berhasil ditambahkan",
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
        data:{
            books: bookselft
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher
          }))
        }
    })


    const find_book = (request, h) => {
    const { bookId } = request.params
    const book = bookselft.filter((bookselft) => bookselft.id === bookId)[0]
    if (!book || book === null) {
        respond = h.response({
        status: 'fail',
        message: 'book not found'
    })
    respond.code(404)
    return respond
    }
    return {
        status: 'success',
        message: 'success to find the book',
            data: {
                book
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
    const bookNumber = bookselft.findIndex((bookselft) => bookselft.id === bookId)
    if(name === "" || name == null){
        respond = h.response({
            "status" : "fail" , 
            "message" : "failed to add the book. Please fill in the name of the book."
        })
        respond.code(400)
        return respond;
    }
    if(readPage > pageCount){
         respond = h.response({
            "status" : "fail" , 
            "message" : "failed to add the book. readPage cannot be greater than pageCount."
        })
        respond.code(400)
        return respond;
    }
    if (bookNumber >= 0 ) {
    bookselft[bookNumber] = {
      ...bookselft[bookNumber],
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
      message: 'Buku berhasil diperbarui'
    })
    respond.code(200)
    return respond
    }
    respond = h.response({
    status: 'fail',
    message: 'faild to update book, book not found!'
    })
    respond.code(404)
    return respond
  }
  const delete_book = (request, h) => {
  const { bookId } = request.params

  const index = bookselft.findIndex((bookselft) => bookselft.id === bookId)
    if (index >= 0) {
        bookselft.splice(index, 1)
        respond = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus'
        })
        respond.code(200)
        return respond
    }
    respond = h.response({
        status: 'fail',
        message: 'failed delete book, book not found'
    })
    respond.code(404)
    return respond
    }
    

module.exports = {books_create, all_books, find_book, edit_book, delete_book}