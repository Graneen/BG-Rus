import { useNavigate } from "react-router-dom";
import { gameMeetsData } from "../../pages/gameMeet/GameMeet";
import dateRedactor from "../../services/dateRedactor";

function RecentMeets({ gameMeets } : { gameMeets: gameMeetsData[]}) {
    const navigate = useNavigate();

    
    return ( 
        <>
            <h2 id="sessions" className="mt-10 text-3xl text-[#ffd700]">БЛИЖАЙШИЕ ИГРОТЕКИ</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-4">
                {gameMeets && gameMeets.map((game, index) => {
                    return (
                        <div className="group relative p-4" key={index}>
                            <button onClick={() => navigate(`/events`)} className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <div className="text-3xl rounded-lg m-2 shadow-md p-2 bg-[orange] text-[black] absolute bg-white">{dateRedactor(game.date)}</div>
                                <img src={game.img} className="h-full w-full object-cover object-center lg:h-full lg:w-full" alt="Game" />
                            </button>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h2 className="game-title">
                                        {game.gameName}
                                    </h2>
                                    <div className="game-descr pt-[1vh]">
                                        <p><strong>Место проведения: </strong>{game.location}</p>
                                        <p><strong>Начало игры: </strong>{game.time.slice(0, 5)}</p>
                                        <p><strong>Запланированное число участников: </strong>{game.maxPlayers}</p>
                                        <p><strong>Организатор: </strong>{game.name}</p>
                                        <p><strong>Цена: </strong>600 руб./чел.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
     );
}

export default RecentMeets;