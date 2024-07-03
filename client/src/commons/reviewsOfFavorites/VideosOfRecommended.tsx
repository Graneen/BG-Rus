
import { Fragment } from "react/jsx-runtime";
import { data } from "../../features/addToFavoritesSlice";
import { GameCard } from "../../features/gameCardSlice";


function VideosOfRecommended({ someRecs }: { someRecs: GameCard[] }): JSX.Element {


    return (
        <>
            <h2 className="text-3xl p-4 m-10 text-[#ffd700]">ВИДЕООБЗОРЫ НА РЕКОМЕНДОВАННЫЕ ИГРЫ:</h2>
            <div className="m-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 grid-cols-2 md:grid-cols-2 grid-cols-2 lg:grid-cols-2 grid-cols-2 xl:gap-x-8">
                {(someRecs && someRecs.map((game: GameCard) => {
                    return (
                        <>
                        <div key={game.id} className="flex flex-wrap gap-5">
                            <iframe
                                className="w-auto h-[200px]"
                                src={`https://www.youtube.com/embed/${game.video.slice(17)}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            ></iframe>
                            <div className="game-descr pt-[1vh]">
                                <p>{game.description}</p>
                            </div>
                            </div>
                        </>
                    )
                }))}
            </div>
        </>
    );
}

export default VideosOfRecommended;