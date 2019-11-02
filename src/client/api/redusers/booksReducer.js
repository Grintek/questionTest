import {BOOKS_LOAD, BOOK_LOAD} from '../../constants/AppConstants';
const initialState = {
    book: { id: 0, name: '', description: '' },
    books: [],
};

export default function booksState(state = initialState, action) {
    switch (action.type) {
        case BOOKS_LOAD:
            return { ...state, books: action.books };
        case BOOK_LOAD:
            return { ...state, book: action.book };
        default:
            return state;
    }
}