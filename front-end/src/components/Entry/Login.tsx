import { useState } from "react";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { performLogin } from "../../services";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../helpers/useDispatch";
import { setAuth } from "../../store/user/actions";
import { getUser } from "../../store/user/thunk";

const Login = function () {
  const dispatch = useDispatch();
  const MIN_CH = 2;
  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(event.target.value);
  };

  const validateEmail = () => {
    const trimmedValue = email.trim();
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

  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError("Password is required");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      const resp = await performLogin(email, password);
      if (resp.successful) {
        const token = resp.result.replace("Bearer ", "");
        dispatch(getUser(token));
        dispatch(setAuth(true));
        localStorage.setItem("token", token);
        let uname = resp.user.name;
        if (typeof uname === "string") {
          uname = uname.replace(/"/g, "");
        }
        navigate("/courses");
      } else {
        window.confirm(`Login failed, ${resp.result}`);
      }
    }
  };
  return (
    <div className={`${styles.wrapper} container`}>
      <h1 className={styles.title}>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <Input
          type="text"
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
        <Button buttonText="Login" />
        <p>
          If you don't have an account you may{" "}
          <b>
            <Link to="/registration">Register</Link>
          </b>
        </p>
      </form>
    </div>
  );
};

export default Login;
