const { nanoid } = require("nanoid");
const books = require("./books");

const getCurrentTime = () => new Date().toISOString(); // // Mendapatkan waktu saat ini dalam format ISO

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

  // Validasi input
  if (!name || typeof name !== "string") {
    return h.response({ message: "Nama buku harus diisi" }).code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({ message: "readPage tidak boleh lebih besar dari pageCount" })
      .code(400);
  }

  const id = nanoid();
  const insertedAt = getCurrentTime();
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
  return h.response(newBook).code(201);
};

// Handler untuk menampilkan semua buku
const getAllBooksHandler = (request, h) => {
  return h.response(books).code(200);
};

// Handler untuk menampilkan detail buku berdasarkan ID
const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.find((b) => b.id === id);
  if (!book) {
    return h
      .response({ message: "Buku tidak ditemukan", status: "fail" })
      .code(404);
  }
  return h.response({ status: "success", data: book }).code(200);
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
      .response({ message: "Buku tidak ditemukan", status: "fail" })
      .code(404);
  }

  if (!name || typeof name !== "string") {
    return h
      .response({ message: "Nama buku harus diisi", status: "fail" })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        message: "readPage tidak boleh lebih besar dari pageCount",
        status: "fail",
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

  return h.response({ status: "success", data: books[index] }).code(200);
};

// Handler untuk menghapus buku
// Handler untuk menghapus buku
const deleteBookHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return h
      .response({ message: "Buku tidak ditemukan", status: "fail" })
      .code(404);
  }

  books.splice(index, 1);
  return h
    .response({ status: "success", message: "Buku berhasil dihapus" })
    .code(200);
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler,
};
