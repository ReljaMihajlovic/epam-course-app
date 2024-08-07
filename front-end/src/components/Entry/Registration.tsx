import { useState } from "react";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import styles from "./Registration.module.css";
import { Link, useNavigate } from "react-router-dom";
import { performRegistration } from "../../services";

const Registration = function () {
    const forbiddenSymbols = /[@#$%^&]/;
    const MIN_CH = 2;
    const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateName = (value: string): boolean => {
        const trimmedValue = value.trim();
        if (trimmedValue.length === 0) {
            setNameError("Name is required");
            return false;
        } else if (trimmedValue.length < MIN_CH) {
            setNameError(`Name must be at least ${MIN_CH} characters long`);
            return false;
        } else {
            setNameError("");
            return true;
        }
    };

    const validateEmail = (value: string): boolean => {
        const trimmedValue = value.trim();
        if (trimmedValue.length === 0) {
            setEmailError("Email is required");
            return false;
        } else if (trimmedValue.length < MIN_CH) {
            setEmailError(`Email must be at least ${MIN_CH} characters long`);
            return false;
        } else if (!EMAIL_REGEX.test(trimmedValue)) {
            setEmailError("Invalid email format");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    };

    const validatePassword = (value: string): boolean => {
        const trimmedValue = value.trim();
        if (trimmedValue.length === 0) {
            setPasswordError("Password is required");
            return false;
        } else if (trimmedValue.length < MIN_CH) {
            setPasswordError(
                `Password must be at least ${MIN_CH} characters long`
            );
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    const handleNameChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        if (!forbiddenSymbols.test(value)) {
            setName(value);
            validateName(value);
        }
    };

    const handleEmailChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        setPassword(value);
        validatePassword(value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isNameValid = validateName(name);
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        if (!isNameValid || !isEmailValid || !isPasswordValid) return;
        const resp = await performRegistration(email, name, password);
        if (resp.successful) {
            window.confirm(resp.result);
            navigate('/login')
        } else {
            window.confirm(`${resp.result}`);
        }
    };

    return (
        <div className={`${styles.wrapper} container`}>
            <h1 className={styles.title}>Registration</h1>
            <form className="form" onSubmit={handleSubmit}>
                <Input
                    labelText="Name"
                    placeholderText="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                    errorMsg={nameError}
                />
                <Input
                    type="email"
                    labelText="Email"
                    placeholderText="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    errorMsg={emailError}
                />
                <Input
                    type="password"
                    labelText="Password"
                    placeholderText="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    errorMsg={passwordError}
                />
                <Button buttonText="Register" />
                <p>
                    If you have an account you may{" "}
                    <b>
                        <Link to="/login">Login</Link>
                    </b>
                </p>
            </form>
        </div>
    );
};

export default Registration;
