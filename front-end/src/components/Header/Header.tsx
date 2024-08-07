import React from "react";
import styles from "./Header.module.css";
import Logo from "./components/Logo/Logo";
import Button from "../../common/Button/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.types";
import { useDispatch } from "../../helpers/useDispatch";
import { logoutThunk } from "../../store/user/thunk";

const Header: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const hideButton =
        location.pathname === "/login" || location.pathname === "/registration";

    const handleLogout = () => {
        dispatch(logoutThunk(user.token));
        navigate("/login");
    };

    return (
        <header className={styles.header}>
            <Link to="/courses" className={styles.logoWrapper}>
                <Logo />
            </Link>

            {!hideButton &&
                (user.token ? (
                    <div className={styles.options}>
                        <p className={styles.user}>{user.name}</p>
                        <Button buttonText="Logout" onClick={handleLogout} />
                    </div>
                ) : (
                    <Link to="/login">
                        <Button buttonText="Login" />
                    </Link>
                ))}
        </header>
    );
};

export default Header;
