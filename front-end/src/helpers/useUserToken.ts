import { useSelector } from "react-redux";
import { RootState } from "../store/store.types";

const useUserToken = () => {
    const user = useSelector((state: RootState) => state.user); // Adjust the path to user according to your state structure
    return user.token;
};

export default useUserToken;
