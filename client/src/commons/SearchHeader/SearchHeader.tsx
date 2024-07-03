import { useState } from "react";
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

    function handlerOpenSearch() {
        setOpenSearch(true);
        dispatch(getGames());
    }

    function handlerFoundGame(gameId: number) {
        handlerButtonClose();
        navigate(`/game/${gameId}`);
    }

    return (
        <div>
            { 
                !openSearch ? 
                <div className="w-64 flex justify-end relative">
                    <img
                        className="w-5 cursor-pointer"
                        onClick={handlerOpenSearch}
                        src="https://png.klev.club/uploads/posts/2024-03/png-klev-club-p-lupa-ikonka-png-30.png"
                        alt="search"
                    />

                </div>
                : 
                <div className="w-64 relative">
                    <input
                        type="text"
                        className="text-black rounded-lg w-full"
                        placeholder="Введите название игры"
                        onChange={(event: React.ChangeEvent<HTMLInputElement> ) => changeHandler(event.target.value)}
                    />
                    <span className="text-[#183d50bb] hover:text-yellow-300 bg-yellow-300 hover:bg-[#0B1D26ff] font-black border-2 border-[#183d50bb] rounded-full cursor-pointer absolute right-1 w-7 text-center inset-y-1.5" onClick={handlerButtonClose}>
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