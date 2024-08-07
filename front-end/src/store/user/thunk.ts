import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { getUserInfo } from "../../services";
import { GET_USER, SET_AUTH } from "./types";
import { RootState } from "../store.types";
import { axiosBase } from "../../services";

export const getUser =
    (token: string): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch) => {
        try {
            const userInfo = await getUserInfo(token);
            const { id, password, ...userInfoWithoutSensitiveData } = userInfo;
            dispatch({
                type: GET_USER,
                payload: { ...userInfoWithoutSensitiveData, token },
            });
            dispatch({
                type: SET_AUTH,
                payload: true,
            });
        } catch (error) {
            console.error("Failed to get user info:", error);
        }
    };

export const logoutThunk =
    (token: string): ThunkAction<void, RootState, unknown, Action> =>
    async (dispatch) => {
        try {
            const resp = await axiosBase.delete("/logout", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (resp.status === 200) {
                localStorage.removeItem("token");
                dispatch({
                    type: SET_AUTH,
                    payload: false,
                });
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
