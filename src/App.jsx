import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import JournalList from "./components/JournalList/JournalList";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/Leftpanel/Leftpanel";

const INITIAL_DATA = [
    {
        id: 1,
        title: "Поход в горы",
        text: "Горные походы открывают удивительные природные ландшафты, испытывают туристов физически и морально, дают возможность почувствовать себя первопроходцем. У горных походов свои секреты, приобщиться к которым можно только в команде единомышленников и профессионалов.",
        date: new Date()
    },
    {
        id: 2,
        title: "Первая заметка",
        text: "Большое значение в горном туризме придается бытовому обустройству в походе, ведь все необходимое для жизнеобеспечения группы нужно нести с собой в рюкзаке и вес каждого килограмма ноши на высоте ощущается особенно сильно. Существует множество способов существенно облегчить вес рюкзака и тем самым высвободить силы для перехода.",
        date: new Date()
    }
];

function App() {
    const [items, setItem] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("data"));
        if (data) {
            setItem(
                data.map(item => ({
                    ...item,
                    date: new Date(item.date)
                }))
            );
        }
    }, []);

    useEffect(() => {
        if (items.length) {
            localStorage.setItem("data", JSON.stringify(items));
        }
    }, [items]);

    const addItem = item => {
        setItem(oldItems => [
            ...oldItems,
            {
                text: item.text,
                title: item.title,
                date: new Date(item.date),
                id: oldItems.length > 0 ? Math.max(...oldItems.map(i => i.id)) + 1 : 1
            }
        ]);
    };

    return (
        <div className="app">
            <LeftPanel>
                <Header />
                <JournalAddButton />
                <JournalList items={items} />
            </LeftPanel>
            <Body>
                <JournalForm onSubmit={addItem} />
            </Body>
        </div>
    );
}

export default App;
