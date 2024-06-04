import CardButton from "../CardButton/CardButton";
import "./JournalAddButton.css";

function JournalAddButton({ clearForm }) {
    return (
        <CardButton className="journal-add" onClick={clearForm}>
            <img className="journal-add__img" src="./plus.svg" alt="plus img" />
            <p className="journal-add__text">Новое воспоминание</p>
        </CardButton>
    );
}

export default JournalAddButton;
