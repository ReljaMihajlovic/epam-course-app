import { SET_COURSES, ADD_COURSE, DELETE_COURSE, UPDATE_COURSE } from "./types";
import { Course } from "../../components/Courses/Courses.types";

export const setCourses = (courses: Course) => ({
    type: SET_COURSES,
    payload: courses,
});
export const addCourse = (course: Course) => ({
    type: ADD_COURSE,
    payload: course,
});
export const deleteCourse = (id: string) => ({
    type: DELETE_COURSE,
    payload: id,
});

export const updateCourse = (course: Course) => ({
    type: UPDATE_COURSE,
    payload: course,
});