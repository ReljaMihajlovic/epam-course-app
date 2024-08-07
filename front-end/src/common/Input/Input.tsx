import React from "react";
import styles from "./Input.module.css";

const Input: React.FC<InputProps> = function ({
    labelText,
    inputId,
    placeholderText,
    errorMsg,
    type = "text",
    onChange,
    value
}) {
    return (
        <div className={styles.wrapper}>
            <label className={styles.label} htmlFor={inputId}>
                {labelText}
            </label>
            {type !== "textarea" ? (
                <input
                    type={type}
                    id={inputId}
                    className={`${styles.input} ${errorMsg && styles.invalid}`}
                    placeholder={placeholderText}
                    onChange={onChange}
                    value={value}
                />
            ) : (
                <textarea
                    className={`${styles.input} ${errorMsg && styles.invalid}`}
                    id={inputId}
                    placeholder={placeholderText}
                    onChange={onChange}
                    value={value}
                />
            )}
            <small className={styles.error}>{errorMsg}</small>
        </div>
    );
};

export default Input;
