const path = require('path'); 
const { addbook, getBookById, editBooks, deleteBooks, getAllBook } = require(path.resolve(__dirname,'./handler.js'));

const routes = [
    {
        method:'POST',
        path: '/books',
        handler: addbook
    },
    {
        method:'GET',
        path: '/books',
        handler: getAllBook
    },
    {
        method:'GET',
        path: '/books/{id}',
        handler: getBookById
    },
    {
        method:'PUT',
        path: '/books/{id}',
        handler: editBooks
    },
    {
        method:'DELETE',
        path: '/books/{id}',
        handler: deleteBooks
    }
];

module.exports = routes;