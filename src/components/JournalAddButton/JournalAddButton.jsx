import CardButton from "../CardButton/CardButton";
import "./JournalAddButton.css";

function JournalAddButton() {
    return (
        <CardButton className="journal-add">
            <img className="journal-add__img" src="./plus.svg" alt="plus img" />
            <p className="journal-add__text">Новое воспоминание</p>
        </CardButton>
    );
}

export default JournalAddButton;
