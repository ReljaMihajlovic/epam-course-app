import { ADD_AUTHOR, SET_AUTHORS, REMOVE_AUTHOR, FETCH_AUTHORS } from "./types";
import { Action } from "../store.types";
import { Author } from "../../components/Courses/Courses.types";

const initialState: Author[] = [];

export const authorsReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_AUTHORS:
            return action.payload;
        case ADD_AUTHOR:
            return [...state, action.payload];
        case REMOVE_AUTHOR:
            return state.filter((author) => author.id !== action.payload);
        case FETCH_AUTHORS:
            return action.payload;
        default:
            return state;
    }
};
