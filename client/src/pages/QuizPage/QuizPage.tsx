import "./QuizPage.css";
import { useContext, useState } from "react";
import Modal from "react-modal";
import $api from "../../services/axiosConfig/axiosConfig";
import { AuthContext } from "../../app/App";
import { useNavigate } from "react-router-dom";

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

function QuizPage({setQuiz}: {setQuiz: React.Dispatch<React.SetStateAction<boolean>> | null}) {
    const [genres, setGenres] = useState<typeSelectedValues[]>(initGenres);
    const [themes, setThemes] = useState<typeSelectedValues[]>(initTheme);
    const [players, setPlayers] = useState<string>('1');
    const [showQuizModal, setShowQuizModal] = useState<boolean>(false);
    const [titleModal, setTitleModal] = useState<string>("");
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    function handlerCreateQuizModal(title: string) {
        setTitleModal(title);
        setShowQuizModal(true);
    }

    function handlerCloseQuizModal() {
        setTitleModal("");
        setShowQuizModal(false);
    }

    function handlerSelectedStates(id: number, NameGroup: string): void {
        let newState;
        let countTrue: number = 0;
        
        if (NameGroup === "genre") {
            newState = JSON.parse(JSON.stringify(genres));
        } else if (NameGroup === "theme") {
            newState = JSON.parse(JSON.stringify(themes));
        } else {
            throw Error("Нет названия группы (genre, theme)");
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
            countTrue > 3 ? handlerCreateQuizModal("maxText") : setGenres(newState);
        } else if (NameGroup === "theme") {
            countTrue > 3 ? handlerCreateQuizModal("maxText") : setThemes(newState);
        }
    }

    function arrayReduction(arrayObj: typeSelectedValues[]) {
        const objData: string[] = [];
        arrayObj.forEach((obj: typeSelectedValues) => {
            if (obj.state) {
                objData.push(obj.title);
            }
        })

        const str = objData.join(", ");
        return str;
    }
    
    async function handlerFinaly() {
        if (!user && !Number(localStorage.getItem("user"))) return navigate("/login");

        const finalyData = {
            user_id: user || Number(localStorage.getItem("user")),
            theme: arrayReduction(themes),
            genre: arrayReduction(genres),
            players,
        }

        if (!finalyData.theme || !finalyData.genre) return handlerCreateQuizModal("minText");
        
        const apiResoult = await $api.post("http://localhost:3000/api/quiz", {finalyData});

        if (apiResoult.status === 200) {
            handlerCreateQuizModal("completed");
        } else {
            console.log({apiResoult});
        }
    }

    return (
        <div className={`flex flex-col items-center gap-3 ${setQuiz ? "mb-20" : "mt-40"}`}>
            <h1 className="text-5xl">Какой ты сегодня?</h1>
            <div>Раскажите нам что вам нравится, чтобы мы могли подобрать для вас только самое лучшее!</div>
            <div className="flex flex-col items-center rounded-lg bg-gray-900 mt-5 ml-40 mr-40 p-5">
                <div className="mb-5 text-2xl bbb">Выберите жанры игр которые вам нравятся (не более 3):</div>
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
            <div className="flex flex-col items-center rounded-lg bg-gray-900 mt-5 ml-40 mr-40 p-5">
                <div className="mb-5 text-2xl bbb">Выберите тематику которую вы предпочитаете (не более 3):</div>
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
            <div className="flex flex-col items-center rounded-lg bg-gray-900 mt-5 ml-40 mr-40 p-5">
                <div className="mb-5 text-2xl bbb">Выберите предпочитаемое количество игроков</div>
                <input
                    type="number"
                    onChange={(e) => setPlayers(e.target.value)}
                    min="1"
                    max="100"
                    defaultValue="1"
                    className="text-black rounded-full border-double"
                />
            </div>
            <button
                className="mt-5 rounded-full border-double p-2 bg-sky-500 hover:bg-yellow-500 hover:text-black active:text-yellow-500 active:bg-neutral-900"
                onClick={handlerFinaly}
            >Зафиксировать результат</button>
            
            { setQuiz ? 
                <div>
                    <button
                        onClick={() => setQuiz(false)}
                        className="mt-2 rounded-full border-double p-2 bg-sky-500 hover:bg-yellow-500 hover:text-black active:text-yellow-500 active:bg-neutral-900"
                    >
                        {"Закрыть квиз"}
                    </button>
                </div> : <></>
            }

            <Modal isOpen={showQuizModal}  onRequestClose={handlerCloseQuizModal}>
                <div className="modal-full">
                    <div className="modal-content bg-neutral-900 text-center">
                        {titleModal === "completed" ?
                            <>
                                <div className='text-black text-yellow-400'>{"Квиз пройден. Поздравляю!"}</div>
                                <button onClick={handlerCloseQuizModal} className='text-black text-yellow-400 rounded-full border-double bg-neutral-700 p-1 mt-2'>
                                    <p>{"Ураа!"}</p>
                                </button>
                                
                            </>
                            :
                            <>
                                { titleModal === "minText" ? <div className='text-black text-yellow-400'>{"Дорогой друг ты что-то пропустил, давай вернёмся и выясним что именно было пропущенно"}</div> : <></> }
                                { titleModal === "maxText" ? <div className='text-black text-yellow-400'>{"Что ты делаешь? Мы же с тобой договорились, не более 3 пунктов"}</div> : <></> }
                                <button onClick={handlerCloseQuizModal} className='text-black text-yellow-400 rounded-full border-double bg-neutral-700 p-1 mt-2'>
                                    <p>{"Больше так не буду..."}</p>
                                </button>
                            </>
                        }

                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default QuizPage;
