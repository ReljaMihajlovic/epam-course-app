import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { getCourses } from "../../services";
import { FETCH_COURSES } from "./types";
import { RootState } from "../store.types";
import { axiosBase } from "../../services";
import { addCourse, deleteCourse } from "./actions";
import { updateCourse } from "./actions";

type CourseCreate = {
    title: string;
    description: string;
    authors: string[];
    duration: number;
};

export const fetchAllCourses =
    (): ThunkAction<void, RootState, unknown, Action> => async (dispatch) => {
        try {
            const courses = await getCourses();
            dispatch({ type: FETCH_COURSES, payload: courses });
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };

export const createCourse =
    (
        course: CourseCreate,
        token: string
    ): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch) => {
        try {
            const resp = await axiosBase.post("/courses/add", course, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (resp.data.successful) {
                dispatch(addCourse(resp.data.result));
            }
        } catch (error) {
            console.error("Failed to delete course:", error);
        }
    };

export const deleteCourseThunk =
    (
        id: string,
        token: string
    ): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch) => {
        try {
            const resp = await axiosBase.delete(`/courses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (resp.data.successful) {
                const prefix = "Object with id - ";
                const suffix = " was deleted.";
                const id = resp.data.result
                    .replace(prefix, "")
                    .replace(suffix, "");
                dispatch(deleteCourse(id));
            }
        } catch (error) {
            console.error("Failed to delete course:", error);
        }
    };

    export const updateCourseThunk =
        (
            id: string,
            course: CourseCreate,
            token: string
        ): ThunkAction<void, RootState, unknown, Action> =>
        async (dispatch) => {
            try {
                const resp = await axiosBase.put(`/courses/${id}`, course, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (resp.data.successful) {
                    dispatch(updateCourse(resp.data.result));
                }
            } catch (error) {
                console.error("Failed to delete course:", error);
            }
        };