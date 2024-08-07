import { SET_AUTHORS, ADD_AUTHOR, REMOVE_AUTHOR } from "./types";
import { Author } from "../../components/Courses/Courses.types";

export const setAuthors = (authors: Author[]) => ({
    type: SET_AUTHORS,
    payload: authors,
});

export const removeAuthor = (authorId: string) => ({
    type: REMOVE_AUTHOR,
    payload: authorId,
});
