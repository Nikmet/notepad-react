import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import "./JournalList.css";

function JournalList({ items }) {
    if (items.length === 0) {
        return <p>Записей пока нет</p>;
    }

    const sortItems = (a, b) => b.date - a.date;

    return (
        <>
            {items.sort(sortItems).map(obj => (
                <CardButton key={obj.id}>
                    <JournalItem title={obj.title} text={obj.text} date={obj.date} />
                </CardButton>
            ))}
        </>
    );
}

export default JournalList;
