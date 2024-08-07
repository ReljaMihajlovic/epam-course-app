import { SET_COURSES, DELETE_COURSE, ADD_COURSE, FETCH_COURSES, UPDATE_COURSE } from "./types";
import { Course } from "../../components/Courses/Courses.types";
import { Action } from "../store.types";

const initialState: Course[] = [];

export const coursesReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_COURSES:
            return action.payload;
        case ADD_COURSE:
            return [...state, action.payload];
        case DELETE_COURSE:
            return state.filter((course) => course.id !== action.payload);
        case FETCH_COURSES:
            return action.payload;
        case UPDATE_COURSE: 
            return state.map(course => course.id === action.payload.id ? action.payload : course);
        default:
            return state;
    }
};
