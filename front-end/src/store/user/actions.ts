import { SET_AUTH } from "./types";

export const setAuth = (isAuth: boolean) => ({
    type: SET_AUTH,
    payload: isAuth,
});

export const logout = () => ({
    type: SET_AUTH,
    payload: false,
});

