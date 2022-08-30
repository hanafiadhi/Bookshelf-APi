const {
  createBook, getAllbook, getBookById, updateBookById, deleteBookById,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllbook,
  },
  {
    method: 'POST',
    path: '/books',
    handler: createBook,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookById,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookById,
  },
];

module.exports = routes;
