import {BOOKS_LOAD, BOOK_LOAD} from "../constants/AppConstants";

export const fetchBooks = (books) => {
    return {
        type: BOOKS_LOAD,
        books
    }
};

export const fetchBookId = (book) => {
  return {
      type: BOOK_LOAD,
      book
  }
};
