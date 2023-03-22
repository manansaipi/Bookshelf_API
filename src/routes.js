const { books_create } = require('./handler');
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
]


module.exports = routes;