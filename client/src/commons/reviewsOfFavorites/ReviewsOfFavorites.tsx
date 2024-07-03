import { useNavigate } from "react-router-dom";
import { GameCard } from "../../features/gameCardSlice";


function ReviewsOfFavorites({someFavorites}: {someFavorites: GameCard[]}): JSX.Element {
    const navigate = useNavigate();

    return (
        <>
                <h2 className="mb-10 text-3xl p-4 text-[#ffd700]">ИГРЫ У ВАС В ИЗБРАННОМ:</h2>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {(someFavorites && someFavorites.map((game: GameCard) => {
                                return (
                    <div key={game.id} className=" group relative p-4">
                        <button onClick={() => navigate(`/game/${game.id}`)} className="aspec t-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                                src={game.poster}
                                className="p-8 h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                        </button>
                        <div className="mt-4 mb-10 flex justify-between">
                            <div>
                                <h2 className="game-title">
                                    {game.title}
                                </h2>
                                <div className="game-descr pt-[1vh]">
                                    <p> <strong>Жанр: </strong> {game.genre}</p>
                                    <p> <strong>Тематика: </strong>{game.theme}</p>
                                    <p> <strong>Сложность: </strong> {game.difficulty}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                            )
                    }))}
                </div>
        </>
    );
}

export default ReviewsOfFavorites;