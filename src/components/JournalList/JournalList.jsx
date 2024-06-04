import { useContext, useMemo } from "react";
import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import "./JournalList.css";
import { UserContext } from "../../context/user.context";

function JournalList({ items, setItem }) {
    const { userId } = useContext(UserContext);
    const sortItems = (a, b) => b.date - a.date;
    const filteredItems = useMemo(
        () => items.filter((el) => el.userId === userId).sort(sortItems),
        [items, userId]
    );

    if (items.length === 0) {
        return <p>Записей пока нет</p>;
    }

    return (
        <>
            {filteredItems.map((obj) => (
                <CardButton key={obj.id} onClick={() => setItem(obj)}>
                    <JournalItem title={obj.title} text={obj.text} date={obj.date} />
                </CardButton>
            ))}
        </>
    );
}

export default JournalList;
