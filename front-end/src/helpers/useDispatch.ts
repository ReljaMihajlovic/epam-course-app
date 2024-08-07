import { useDispatch as useReduxDispatch } from "react-redux";
import { RootState } from "../store/store.types";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

export type AppDispatch = ThunkDispatch<RootState, any, Action>;

export function useDispatch() {
  return useReduxDispatch<AppDispatch>();
}
