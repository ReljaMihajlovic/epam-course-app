import React from "react";
import { ButtonProps } from "./Button.types";
import styles from "./Button.module.css";
const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button
            type={props.type}
            className={`${styles.button} ${props.className}`}
            onClick={props.onClick}>
            {props.buttonText}{" "}
            {props.icon && (
                <span className={styles.icon}>
                    {" "}
                    <props.icon />
                </span>
            )}
        </button>
    );
};
export default Button;
