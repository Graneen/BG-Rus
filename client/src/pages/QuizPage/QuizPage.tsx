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

const genreDescriptions: { [key: string]: string } = {
    "Карточные": "Жанр, где вы покупаете наборы карт, чтобы улучшить свой геймплей",
    "Патигеймы": "Жанр настольных игр, в которые можно играть вместе с кучей своих знакомых и друзей, меньше думая и больше веселясь",
    "Филеры": "Жанр, обычно, скромных по размеру, простых по геймплею, и быстрых по времени партии игр, которые играются в промежутках между большими, серьёзными партиями, либо в ожидании вечно опаздывающих товарищей",
    "Евроигры": "Еврогеймы (европейский, немецкий стиль) – игры, которые не сталкивают интересы игроков напрямую, игроки не могут быть исключены из игры, а роль удачи хоть и присутствует, но достаточно мала. Выставление рабочих и голый расчёт",
    "Социальные": "Социальные игры – обширная группа игр, которое отличает сильное взаимодействие между игроками. Обычно это игры разума и элементы блефа",
    "Кооперативные": "Кооперативные: все игроки в одной команде пытаются обыграть саму игру. В таких играх роли распределены между игроками, но даже один игрок может заменить их всех и играть, таким образом, в одиночку. ",
    "Полукооперативные": "Он представляет собой настольные игры, в которых несколько участников объединяют свои силы (выступают в качестве положительных персонажей), против одного игрока, выступающего в роли негативного персонажа – злодея, предателя",
    "Абстрактные": "Это те игры, которые не связаны ни с какой тематикой или сюжетом, либо же тематика используется только как оформление игры.",
    "Варгеймы": "Разновидность стратегических игр Варгеймы призваны имитировать в виде игры военные конфликты: как реальные, так и вымышленные.",
    "Америтреши": "Американский жанр игр, где конфликт игроков подчёркивается, а в игре множество различных возможностей и увеличенная роль удачи. Немалую роль занимает атомофсфера партий",
    "Контроли территорий": "Жанр игр, где процесс удержания стратегически важных точек на игровом поле, что неминуемо ведёт к победе. Зачастую, в таких играх партия ведётся не на очки, а пока один из игроков не выполнит условие победы.",
    "Легаси": " Жанр, позволяющий объединить в серию несколько игровых партий. При этом в каждой следующей партии игра изменяется в зависимости от того, чем закончилась предыдущая.",
    "Roll-and-write": "Жанр настольных игр, где вы бросаете кубики и выпавшие на них значения переносите на игровой лист. Цель таких игр – удачное расположение значений и дальнейшее получение большего количества очков.",
    "Dungeon Crawler": "Жанр в настольных ролевых играх. Представляет собой лабиринтообразное подземелье (пещера, древний храм, катакомбы и т. п.), по которому странствуют герои, уничтожая населяющих подземелье монстров и забирая себе разного рода сокровища.",
};


function QuizPage({setQuiz}: {setQuiz: React.Dispatch<React.SetStateAction<boolean>> | null}) {
    const [genres, setGenres] = useState<typeSelectedValues[]>(initGenres);
    const [selectedGenreDescription, setSelectedGenreDescription] = useState<string>("");
    const [themes, setThemes] = useState<typeSelectedValues[]>(initTheme);
    const [players, setPlayers] = useState<string>('1');
    const [showQuizModal, setShowQuizModal] = useState<boolean>(false);
    const [titleModal, setTitleModal] = useState<string>("");
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isGenreDescriptionOpen, setIsGenreDescriptionOpen] = useState<boolean>(false);

    
    function handlerCreateQuizModal(title: string) {
        setTitleModal(title);
        setShowQuizModal(true);
    }

    function handlerCloseQuizModal() { //* handlerCloseQuizModal(isCompleted: string | null)
        setTitleModal("");
        setShowQuizModal(false);
        // if (!setQuiz && checkForNavigateInProfile) navigate("/profile");
    }

    
    function openGenreDescription() {
        setIsGenreDescriptionOpen(true);
    }

    function closeGenreDescription() {
        setIsGenreDescriptionOpen(false);
    }

    function handleGenreDescriptionHover(title: string) {
        setSelectedGenreDescription(genreDescriptions[title]);
    }

    function handleGenreDescriptionLeave() {
        setSelectedGenreDescription("");
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
                element.textColor = "text-black font-bold rounded-full bg-amber-500";
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
        if (Number(players) <= 0) return handlerCreateQuizModal("minPlayers");
        if (Number(players) > 100) return handlerCreateQuizModal("maxPlayers");
        
        const apiResoult = await $api.post(`${import.meta.env.VITE_REACT_APP_API_URL}/quiz`, {finalyData});

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
                        return  <button
                        key={genre.id}
                        className={`p-1 ${genre.textColor}`}
                        onMouseEnter={() => {
                            handleGenreDescriptionHover(genre.title);
                            openGenreDescription();
                        }}
                        onMouseLeave={() => {
                            handleGenreDescriptionLeave();
                            closeGenreDescription();
                        }}
                        onClick={() => handlerSelectedStates(genre.id, "genre")}
                    >
                        {genre.title}
                    </button>
                    })}
                     {isGenreDescriptionOpen && (
                <div className="bg-yellow-300 text-white font-semibold py-2 px-4 rounded-lg mt-6">
                    <p>{selectedGenreDescription}</p>
                </div>
            )}
                </div>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-gray-900 mt-5 ml-40 mr-40 p-5">
                <div className="mb-5 text-2xl bbb">Выберите тематику которую вы предпочитаете (не более 3):</div>
                <div className="flex flex-wrap items-center justify-center w-3/5 gap-3.5">
                    {themes.map((theme) => {
                        return <button
                            key={theme.id}
                            className={`p-1 ${theme.textColor}`}
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
                    className="text-black rounded-full border-double text-center"
                />
            </div>
            <button
                className="bg-yellow-300 text-black font-semibold py-2 px-4 rounded-lg mt-6"
                onClick={handlerFinaly}
            >Зафиксировать результат</button>
            
            { setQuiz ? 
                <div>
                    <button
                        onClick={() => setQuiz(false)}
                        className="mt-2 bg-yellow-300 text-black font-semibold py-2 px-4 rounded-lg mt-6"
                    >
                        {"Закрыть квиз"}
                    </button>
                </div> : <></>
            }

            <Modal isOpen={showQuizModal}  onRequestClose={() => handlerCloseQuizModal()}>
                <div className="modal-full">
                    <div className="modal-content bg-neutral-900 text-center">
                        {titleModal === "completed" ?
                            <>
                                <div className='text-black text-yellow-400'>{"Квиз пройден. Поздравляю! ⸜(｡˃ ᵕ ˂ )⸝♡"}</div>
                                <button onClick={() => handlerCloseQuizModal()} className='bg-yellow-300 text-black font-semibold py-2 px-4 rounded-lg mt-6'>
                                    <p>{"Ураа!"}</p>
                                </button>
                                
                            </>
                            :
                            <>
                                { titleModal === "minText" ? <div className='text-black text-yellow-400'>{"Дорогой друг, ты что-то пропустил, давай вернёмся и выясним что именно было пропущенно. ⸜(｡˃ ᵕ ˂ )⸝♡"}</div> : <></> }
                                { titleModal === "maxText" ? <div className='text-black text-yellow-400'>{"Что ты делаешь? Мы же с тобой договорились, не более 3 пунктов. ¯ \\_(ツ)_/¯"}</div> : <></> }
                                { titleModal === "minPlayers" ? <div className='text-black text-yellow-400'>{"Дорогой друг, как у тебя дела? (つ╥﹏╥)つ Неужели у тебя нет друзей с кем бы ты мог поиграть? Это не беда, наш сайт создан для того чтобы найти новых друзей. Присоединяйся к играм других пользователей и не о чём не беспокойся ┗(＾0＾)┓"}</div> : <></> }
                                { titleModal === "maxPlayers" ? <div className='text-black text-yellow-400'>{"Дорогой друг, боюсь мы не сможем предложить игру на столь большую компанию. ▐ ⊙ ▃ ⊙ ▐"}</div> : <></> }
                                <button onClick={() => handlerCloseQuizModal()} className='bg-yellow-300 text-black font-semibold py-2 px-4 rounded-lg mt-6'>
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
