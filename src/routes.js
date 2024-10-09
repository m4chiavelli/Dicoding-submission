const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler,
} = require("./handler");

// Menyimpan seluruh routes yang dibuat di dalam array
const routes = [
  // Menyimpan route untuk menambahkan catatan
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  // Menyimpan route untuk mendapatkan seluruh catatan
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  // Menyimpan route untuk mendapatkan catatan berdasarkan id
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getBookByIdHandler,
  },

  // Menyimpan route untuk mengedit catatan berdasarkan id
  {
    method: "PUT",
    path: "/books/{id}",
    handler: updateBookHandler,
  },

  // Menyimpan route untuk menghapus catatan berdasarkan id
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBookHandler,
  },
];

module.exports = routes;
