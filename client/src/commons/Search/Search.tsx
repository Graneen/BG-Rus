import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { GameCard, getGames, selectAllGames } from "../../features/gamesForSearchSlice";
import { useNavigate } from "react-router-dom";
import "../../pages/QuizPage/QuizPage.css"

function Search() {
    const {list, loading, error} = useAppSelector(selectAllGames);
    const [ openSearch, setOpenSearch ] = useState<boolean>(false);
    const [ openListSearch, setOpenListSearch ] = useState<boolean>(false);
    const [ archiveGame, setArchiveGame ] = useState<GameCard[]>(list);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    function changeHandler(textSearch: string): void {
        const filteredArray = list.filter((element: GameCard) => element.title.toLowerCase().includes(textSearch.toLowerCase()));
        setOpenListSearch(true);
        setArchiveGame(filteredArray);
    }
    
    function handlerButtonClose() {
        setOpenSearch(false);
        setOpenListSearch(false);
    }

    function handlerFoundGame(gameId: number) {
        handlerButtonClose();
        navigate(`/game/${gameId}`);
    }

    // console.log({date: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, archiveGame});

    useEffect(() => {
        dispatch(getGames());
    }, [])

    return (
        <div>
            { 
                !openSearch ? 
                <div className="w-56 flex justify-end relative">
                    <img
                        className="w-5 cursor-pointer"
                        onClick={() => setOpenSearch(true)}
                        src="https://png.klev.club/uploads/posts/2024-03/png-klev-club-p-lupa-ikonka-png-30.png"
                        alt="search"
                    />

                </div>
                : 
                <div className="w-56 relative">
                    <input
                        type="text"
                        className="text-black rounded-lg w-full"
                        placeholder="Введите название игры"
                        onChange={(event: React.ChangeEvent<HTMLInputElement> ) => changeHandler(event.target.value)}
                    />
                    <span className="text-sky bg-gray-900 rounded-full p-0.5 cursor-pointer absolute right-0 w-7 text-center inset-y-2" onClick={handlerButtonClose}>
                        x
                    </span>
                    <div className="absolute overscroll-contain">
                        {!openListSearch ? <></> :
                            <>
                                <div className="bg-gray-900 p-5 flex flex-col gap-y-2 max-w-md mx-auto dark:bg-slate-800 shadow-lg max-h-80 min-h-4 overflow-auto ring-1 ring-slate-900 my-px">
                                    {loading && <div>поиск</div>}
                                    {error && <div>ошибка поиска <div>{`${error}`}</div></div>}
                                    {!archiveGame || !archiveGame.length
                                        ?
                                        <div>{"ничего не найдено"}</div>
                                        : 
                                        archiveGame.map((game) => {
                                            return <div
                                                key={game.id}
                                                className="cursor-pointer bbb"
                                                onClick={() => handlerFoundGame(game.id)}
                                            >{game.title}</div>
                                        })
                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default Search;