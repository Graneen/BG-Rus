import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopList.css';
import FavoritesButton from '../../commons/FavoritesButton';
import { selectFavoritesCard, takeFavorites } from '../../features/addToFavoritesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { AuthContext } from '../../app/App';

interface BoardGameData {
    Users: Array<{toggler: boolean, name: string}>;
    id: number;
    title: string;
    genre: string;
    theme: string;
    difficulty: string;
    poster: string;
}

const TopList: React.FC = () => {
    const { user } = useContext(AuthContext);
    const dispatch = useAppDispatch();
    const takeTheFavorites = useAppSelector(selectFavoritesCard);
    const [boardGameData, setBoardGameData] = useState<BoardGameData[] | null>(null);
    const [sortGames, setSortGames] = useState<BoardGameData[] | null>(null);
    const navigate = useNavigate();
    // console.log(takeTheFavorites)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/boardgames/${user}`);

                if (response.ok) {
                    const data: BoardGameData[] = await response.json();
                    setBoardGameData(data);
                } else {
                    console.error('Ошибка при загрузке данных');
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [takeTheFavorites, user]);

    // const titleGenre: string[] = ["Карточные", "Патигеймы", "Филеры", "Евроигры", "Социальные", "Кооперативные", "Полукооперативные", "Абстрактные", "Варгеймы", "Америтреши", "Контроли территорий", "Легаси", "Roll-and-write", "Dungeon Crawler"];
    // const titleTheme: string[] = ["Исторические", "Экономические", "Фэнтэзи", "Приключения", "Научные", "Реализмы", "Семейные", "Вестерны", "Казуальные"];

// console.log({titleGenre, titleTheme});
    
    function changeHandler(textSearch: string): void {
        if (boardGameData) {
            const filteredArray = boardGameData.filter((element: BoardGameData) => element.title.toLowerCase().includes(textSearch.toLowerCase()));
            // console.log({filteredArray});
            setSortGames(filteredArray);
        } else {
            alert("Список игр пуст!");
        }
    }

    return (
        <>
            <div className="bg-gray">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-3xl p-4 text-[#ffd700]">TOP-100 ЛУЧШИХ ИГР ПО ВЕРСИИ BGRUS</h2>
                    <div>
                        <div>Сортировка игр</div>
                        <input
                            type="text"
                            className="text-black rounded-lg w-80"
                            placeholder="Введите название игры"
                            onChange={(event: React.ChangeEvent<HTMLInputElement> ) => changeHandler(event.target.value)}
                        />
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        { sortGames 
                            ?
                            (sortGames && sortGames.length && sortGames.map((game) => { 
                                return (
                                    <div key={game.id} className=" group relative p-4">
                                        <button onClick={() => navigate(`/game/${game.id}`)} className="aspec t-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                                            <img
                                                src={game.poster}
                                                className="p-8 h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </button>
                                        <div className="mt-4 flex justify-between">
                                            <div>
                                                <h2 className="game-title">
                                                    {game.title}
                                                </h2>
                                                <FavoritesButton favorites={game.Users.length} handler={() => dispatch(takeFavorites({ user_id: user, game_id: game.id, toggler: true }))} />
                                                <div className="game-descr pt-[1vh]">
                                                    <p> <strong>Жанр: </strong> {game.genre}</p>
                                                    <p> <strong>Тематика: </strong>{ game.theme}</p>
                                                    <p> <strong>Сложность: </strong> {game.difficulty}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }))
                            :
                            (boardGameData && boardGameData.map((game) => {
                                return (
                                    <div key={game.id} className=" group relative p-4">
                                        <button onClick={() => navigate(`/game/${game.id}`)} className="aspec t-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                                            <img
                                                src={game.poster}
                                                className="p-8 h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </button>
                                        <div className="mt-4 flex justify-between">
                                            <div>
                                                <h2 className="game-title">
                                                    {game.title}
                                                </h2>
                                                <FavoritesButton favorites={game.Users.length} handler={() => dispatch(takeFavorites({ user_id: user, game_id: game.id, toggler: true }))} />
                                                <div className="game-descr pt-[1vh]">
                                                    <p> <strong>Жанр: </strong> {game.genre}</p>
                                                    <p> <strong>Тематика: </strong>{ game.theme}</p>
                                                    <p> <strong>Сложность: </strong> {game.difficulty}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopList;