import "./QuizPage.css";
import { useState } from "react";

type typeSelectedValues = {
    id: number,
    title: string,
    textColor: string,
    state: boolean
};

const callbackMap = (genre: string, index: number) => ({
    id: index,
    title: genre,
    textColor: "",
    state: false
});

const titleGenre: string[] = ["Карточные", "Патигеймы", "Филеры", "Евроигры", "Социальные", "Кооперативные", "Полукооперативные", "Абстрактные", "Варгеймы", "Америтреши", "Контроли территорий", "Легаси", "Roll-and-write", "Dungeon Crawler"];
const titleTheme: string[] = ["Исторические", "Экономические", "Фэнтэзи", "Приключения", "Научные", "Реализмы", "Семейные", "Вестерны", "Казуальные"];

const initGenres = titleGenre.map(callbackMap);
const initTheme = titleTheme.map(callbackMap);

function QuizPage() {
    const [genres, setGenres] = useState<typeSelectedValues[]>(initGenres);
    const [themes, setThemes] = useState<typeSelectedValues[]>(initTheme);
    const [players, setPlayers] = useState<string>('');
    
    function handlerSelectedStates(id: number, NameGroup: string): void {
        let newState;
        let countTrue: number = 0;
        
        if (NameGroup === "genre") {
            newState = JSON.parse(JSON.stringify(genres));
        } else if (NameGroup === "theme") {
            newState = JSON.parse(JSON.stringify(themes));
        }

        newState.forEach((element: typeSelectedValues) => {
            if (element.id === id && element.state === true) {
                element.state = false;
                element.textColor = "";
            } else if (element.id === id && element.state === false) {
                element.state = true;
                element.textColor = "text-amber-500";
            }
        });

        newState.forEach((element: typeSelectedValues) => {
            element.state === true ? countTrue += 1 : countTrue;
        });

        if (NameGroup === "genre") {
            countTrue > 3 ? alert("Выбрано больше 3!") : setGenres(newState);
        } else if (NameGroup === "theme") {
            countTrue > 3 ? alert("Выбрано больше 3!") : setThemes(newState);
        }
    }

    function handlerFinaly() {
        //! TODO
        console.log({genres, themes, players});
    }



    return (
        <div className="flex flex-col items-center gap-3 mt-40">
            <h1 className="text-5xl">Какой ты сегодня?</h1>
            <div>Раскажите нам что вам нравится, чтобы мы могли подобрать для вас только самое лучшее!</div>
            <div className="flex flex-col items-center mt-20">
                <div className="mb-5 text-sky-500 text-2xl">Выберите жанры игр которые вам нравятся (не более 3):</div>
                <div className="flex flex-wrap items-center justify-center w-3/5 gap-3.5">
                    {genres.map((genre) => {
                        return <button 
                            key={genre.id}
                            className={genre.textColor}
                            onClick={() => handlerSelectedStates(genre.id, "genre")}
                        >{genre.title}</button>
                    })}
                </div>
            </div>
            <div className="flex flex-col items-center mt-20">
                <div className="mb-5 text-sky-500 text-2xl">Выберите тематику игр которую вы предпочитаете (не более 3):</div>
                <div className="flex flex-wrap items-center justify-center w-3/5 gap-3.5">
                    {themes.map((theme) => {
                        return <button
                            key={theme.id}
                            className={theme.textColor}
                            onClick={() => handlerSelectedStates(theme.id, "theme")}
                        >{theme.title}</button>
                    })}
                </div>
            </div>
            <div className="flex flex-col items-center mt-20">
                <div className="mb-5 text-sky-500 text-2xl">Выберите предпочитаемое количество игроков</div>
                <input
                    type="number"
                    onChange={(e) => setPlayers(e.target.value)}
                    min="1"
                    max="100"
                    defaultValue="1"
                    className="text-black rounded-full border-double" />
            </div>
            <button
                className="mt-10 rounded-full border-double p-2 bg-sky-500 hover:bg-yellow-500 hover:text-black active:text-yellow-500 active:bg-neutral-900"
                onClick={handlerFinaly}
            >Зафиксировать результат</button>
        </div>
    );
}

export default QuizPage;
