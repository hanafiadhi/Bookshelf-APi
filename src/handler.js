/* eslint-disable max-len */
const { nanoid } = require('nanoid');

const books = require('./book');

const createBook = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (name === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  if (pageCount < readPage) {
  return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const finished = (pageCount === readPage);

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt: createdAt, updatedAt,
  };

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }).code(201);
  }
  return h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  }).code(500);
};

const getAllbook = (request, h) => {
  const { name, reading, finished } = request.query;

  let filter = books;

  if (name !== undefined) {
    filter = filter.filter((book) => book
      .name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    filter = filter.filter((book) => book.reading === !!Number(reading));
  }

  if (finished !== undefined) {
    filter = filter.filter((book) => book.finished === !!Number(finished));
  }

  return  h.response({
    status: 'success',
    data: {
      books: filter.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  }).code(200);
};

const getBookById = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((b) => b.id === bookId)[0];

  if (book !== undefined) {
    return h.response({
      status: 'success',
      data: {
        book,
      },
    }).code(200);
  }

 return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};

const updateBookById = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    if (name === undefined) {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      }).code(400);
    }

    if (pageCount < readPage) {
     return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
.code(400);
    }

    const finished = (pageCount === readPage);

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };
   return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  }
 return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
};

const deleteBookById = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((data) => data.id === bookId);
  if (index !== -1) {
    books.shift(index);
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
};
module.exports = {
  createBook, getAllbook, getBookById, updateBookById, deleteBookById,
};
