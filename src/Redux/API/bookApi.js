import axiosInstance from "./axiosInstance.js";

const booksAPIs = {
  getBooks: () => {
    return axiosInstance.get(`/books`); 
  },

  addBook: (newBook) => {
    return axiosInstance.post(`/books`, newBook);
  },
  
  editBook: (id, bookData) => {
    return axiosInstance.put(`/books/${id}`, bookData);
  },

  deleteBook: (id) => {
    return axiosInstance.delete(`/books/${id}`);
  },
  // Add Code Set to an existing book
  addCodeSetToBook: (id, codeSet) => {
    return axiosInstance.patch(`/books/${id}`, codeSet );
  },

//   addSubUser: (id, data) => {
//     return axiosInstance.post(`/accounts/add-sub-user/${id}`, data);
// },
};

export default booksAPIs;
