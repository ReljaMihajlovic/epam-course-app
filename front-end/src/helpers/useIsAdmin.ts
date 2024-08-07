import { useSelector } from "react-redux";
import { RootState } from "../store/store.types";

const useIsAdmin = () => {
  const user = useSelector((state: RootState) => state.user); // Adjust the path to user according to your state structure
  return user.role === "admin";
};

export default useIsAdmin;
