import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useContext, useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";
import Input from "../Input/Input";
import { UserContext } from "../../context/user.context";

function JournalForm({ onSubmit, data, onDelete }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;
    const titleRef = useRef();
    const dateRef = useRef();
    const textRef = useRef();
    const { userId } = useContext(UserContext);

    useEffect(() => {
        let timerId;
        if (!isValid.date || !isValid.text || !isValid.title) {
            focusError(isValid);
            timerId = setTimeout(() => {
                dispatchForm({ type: "RESET_VALIDITY" });
            }, 1000);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [isValid]);

    useEffect(() => {
        if (isFormReadyToSubmit) {
            onSubmit(values);
            dispatchForm({ type: "CLEAR" });
            dispatchForm({ type: "SET_VALUE", payload: { userId } });
        }
    }, [isFormReadyToSubmit, values, onSubmit, userId]);

    useEffect(() => {
        dispatchForm({ type: "SET_VALUE", payload: { userId } });
    }, [userId]);

    useEffect(() => {
        if (!data) {
            dispatchForm({ type: "CLEAR" });
            dispatchForm({ type: "SET_VALUE", payload: { userId } });
        }
        dispatchForm({ type: "SET_VALUE", payload: { ...data } });
    }, [data, userId]);

    const addJournalItem = (event) => {
        event.preventDefault();
        dispatchForm({ type: "SUBMIT" });
    };

    const onChange = (e) => {
        dispatchForm({ type: "SET_VALUE", payload: { [e.target.name]: e.target.value } });
    };

    const focusError = (isValid) => {
        switch (true) {
            case !isValid.title:
                titleRef.current.focus();
                break;
            case !isValid.date:
                dateRef.current.focus();
                break;
            case !isValid.text:
                textRef.current.focus();
                break;
            default:
                titleRef.current.focus();
                break;
        }
    };

    const deleteJournalItem = () => {
        onDelete(data.id);
        dispatchForm({ type: "CLEAR" });
        dispatchForm({ type: "SET_VALUE", payload: { userId } });
    };

    return (
        <>
            <form className={styles["journal-form"]} onSubmit={addJournalItem}>
                <div className={styles["form-row"]}>
                    <Input
                        appearance="title"
                        type="text"
                        name="title"
                        ref={titleRef}
                        value={values.title}
                        onChange={onChange}
                        isValid={isValid.title}
                        placeholder="Заголовок"
                    />
                    {data?.id && (
                        <button
                            className={styles.delete}
                            type="button"
                            onClick={() => deleteJournalItem()}
                        >
                            <img src="./archive.svg" alt="delete" />
                        </button>
                    )}
                </div>
                <div className={styles["form-row"]}>
                    <label htmlFor="date" className={styles["form-label"]}>
                        <img src="./calendar.svg" alt="calendar" />
                        <span>Дата</span>
                    </label>
                    <Input
                        appearance="date"
                        type="date"
                        name="date"
                        value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ""}
                        id="date"
                        ref={dateRef}
                        isValid={isValid.date}
                        onChange={onChange}
                    />
                </div>
                <div className={styles["form-row"]}>
                    <label htmlFor="tag" className={styles["form-label"]}>
                        <img src="./folder.svg" alt="folder" />
                        <span>Метки</span>
                    </label>
                    <Input
                        appearance="tag"
                        type="text"
                        name="tag"
                        id="tag"
                        onChange={onChange}
                        value={values.tag}
                        placeholder="Метка"
                    />
                </div>
                <textarea
                    name="text"
                    className={cn(styles["input-text"], {
                        [styles.invalid]: !isValid.text
                    })}
                    value={values.text}
                    ref={textRef}
                    onChange={onChange}
                    placeholder="Текст записи"
                    rows="10"
                ></textarea>
                <Button>Сохранить</Button>
            </form>
        </>
    );
}

export default JournalForm;
