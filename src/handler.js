const { nanoid } = require("nanoid");
const books = require("./books");

const getCurrentTime = () => new Date().toISOString();

// Handler untuk menambahkan buku
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    return h
      .response({
        message: "Gagal menambahkan buku. Mohon isi nama buku",
        status: "fail",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        status: "fail",
      })
      .code(400);
  }

  const id = nanoid();
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: readPage === pageCount,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  console.log(books); // Log semua buku setelah penambahan
  return h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: { bookId: id },
    })
    .code(201);
};

const getAllBooksHandler = (request, h) => {
  const simplifiedBooks = books.map(({ id, name, publisher }) => ({
    id,
    name,
    publisher,
  }));

  return h
    .response({
      status: "success",
      data: {
        books: simplifiedBooks,
      },
    })
    .code(200);
};

// Handler untuk menampilkan detail buku berdasarkan ID
const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  console.log(`Mencari buku dengan ID: ${id}`);

  const book = books.find((b) => b.id === id);

  if (!book) {
    return h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);
  }

  return h
    .response({
      status: "success",
      data: {
        book, // Pastikan ada properti 'book' di sini
      },
    })
    .code(200);
};

// Handler untuk mengubah data buku
const updateBookHandler = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const index = books.findIndex((b) => b.id === id);
  if (index === -1) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      })
      .code(404);
  }

  if (!name || typeof name !== "string") {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  const updatedAt = getCurrentTime();

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: readPage === pageCount,
    reading,
    updatedAt,
  };

  return h
    .response({
      status: "success",
      message: "Buku berhasil diperbarui", // Tambahkan pesan sukses
      data: books[index], // Kembalikan data buku yang diperbarui
    })
    .code(200);
};

const deleteBookHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return h
      .response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
      })
      .code(404);
  }

  books.splice(index, 1);
  return h
    .response({
      status: "success",
      message: "Buku berhasil dihapus",
    })
    .code(200);
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler,
};
