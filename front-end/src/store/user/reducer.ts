import { SET_AUTH, GET_USER } from "./types";
import { Action } from "../store.types";

const initialState = {
  isAuth: false,
  name: "",
  email: "",
  token: localStorage.getItem("token") || "",
  role: "",
};

export const userReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_AUTH:
            if (action.payload === false) {
                return { ...initialState, toke: ""};
            } else {
                return { ...state, isAuth: action.payload };
            }
        case GET_USER:
            return { ...state, ...action.payload}
        default:
            return state;
    }
};
