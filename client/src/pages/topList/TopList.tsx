import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TopList.css';
import FavoritesButton from '../../commons/FavoritesButton';

interface BoardGameData {
    id: number;
    title: string;
    genre: string;
    theme: string;
    difficulty: string;
    poster: string;
}

const TopList: React.FC = () => {
    const [boardGameData, setBoardGameData] = useState<BoardGameData[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/boardgames');
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
    }, []);

    return (
        <>
            <div className="bg-gray">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl p-4 font-bold tracking-tight text-gray-900">TOP-100 лучших игр</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {boardGameData && boardGameData.map((game, index) => (
                            <button key={index} className=" group relative p-4" onClick={() => navigate(`/game/${game.id}`)}>
                                <div className="aspec t-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={game.poster}
                                        className="p-8 h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h2 className="game-title">
                                            {game.title}
                                        </h2>
                                        <FavoritesButton />
                                        <div className="game-descr pt-[1vh]">
                                            <p> <strong>Жанр: </strong> {game.genre}</p>
                                            <p> <strong>Тематика: </strong>{ game.theme}</p>
                                            <p> <strong>Сложность: </strong> {game.difficulty}</p>
                                        </div>
                                    </div>
                                </div>

                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopList;