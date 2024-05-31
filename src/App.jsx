import "./App.css";
import Button from "./components/Button/Button";
import CardButton from "./components/CardButton/CardButton";
import JournalItem from "./components/JournalItem/JournalItem";

function App() {
    const data = [
        {
            title: "Поход в горы",
            text: "Горные походы открывают удивительные природные ландшафты, испытывают туристов физически и морально, дают возможность почувствовать себя первопроходцем. У горных походов свои секреты, приобщиться к которым можно только в команде единомышленников и профессионалов.",
            data: new Date()
        },
        {
            title: "Первая заметка",
            text: "Большое значение в горном туризме придается бытовому обустройству в походе, ведь все необходимое для жизнеобеспечения группы нужно нести с собой в рюкзаке и вес каждого килограмма ноши на высоте ощущается особенно сильно. Существует множество способов существенно облегчить вес рюкзака и тем самым высвободить силы для перехода.",
            data: new Date()
        }
    ];

    return (
        <>
            <Button />
            <CardButton>Новое воспоминание</CardButton>
            <CardButton>
                <JournalItem title={data[0].title} text={data[0].text} data={data[0].date} />
            </CardButton>
            <CardButton>
                <JournalItem title={data[1].title} text={data[1].text} data={data[1].date} />
            </CardButton>
        </>
    );
}

export default App;
