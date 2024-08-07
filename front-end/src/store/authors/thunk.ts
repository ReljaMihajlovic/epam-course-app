import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { getAuthors, createAuthor } from "../../services";
import { ADD_AUTHOR, FETCH_AUTHORS, REMOVE_AUTHOR } from "./types";
import { RootState } from "../store.types";
import { deleteAuthor } from "../../services";

export const fetchAllAuthors =
    (): ThunkAction<void, RootState, unknown, Action> => async (dispatch) => {
        try {
            const courses = await getAuthors();
            dispatch({ type: FETCH_AUTHORS, payload: courses });
        } catch (error) {
            console.error("Failed to fetch authors:", error);
        }
    };
export const addAuthor =
    (
        name: string,
        token: string
    ): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch) => {
        const resp = await createAuthor(name, token);
        if (resp.successful) {
            dispatch({ type: ADD_AUTHOR, payload: resp.result });
        }
    };
export const removeAuthor =
    (
        id: string,
        token: string
    ): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch) => {
        const resp = await deleteAuthor(id, token);
        if (resp === 200) {
            dispatch({ type: REMOVE_AUTHOR, payload: id });
        }
    };
