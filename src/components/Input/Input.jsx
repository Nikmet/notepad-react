import classNames from "classnames";
import styles from "./Input.module.css";
import { forwardRef } from "react";

const Input = forwardRef(function Input({ isValid = true, appearance, ...props }, ref) {
    return (
        <input
            {...props}
            ref={ref}
            className={classNames({
                [styles.invalid]: !isValid,
                [styles["input-title"]]: appearance === "title",
                [styles["input-date"]]: appearance === "date",
                [styles["input-tag"]]: appearance === "tag"
            })}
        />
    );
});

export default Input;
