const { books_create, all_books, find_book, edit_book, delete_book } = require('./handler');
const routes = [
    {
        method:'GET',
        path:'/',
        handler: ()=>{
            return "this is home";
        }
    },
    {
        method:'POST',
        path:'/books',
        handler: books_create
    },
    {
        method:'GET',
        path:'/books',
        handler: all_books
    },
    {
        method:'GET',
        path:'/books/{bookId}',
        handler: find_book
    },
    {
        method:'PUT',
        path:'/books/{bookId}',
        handler: edit_book
    },
    {
        method:'DELETE',
        path:'/books/{bookId}',
        handler: delete_book
    },
    
]


module.exports = routes;
 