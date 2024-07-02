import { data } from "../../features/addToFavoritesSlice";
import { GameCard } from "../../features/gameCardSlice";


function VideosOfRecommended({someRecs}: {someRecs: GameCard[]}): JSX.Element {



    return (
        <>
                <h2 className="text-3xl p-4 text-[#ffd700]">ВИДЕООБЗОРЫ НА РЕКОМЕНДОВАННЫЕ ИГРЫ:</h2>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {(someRecs && someRecs.map((game: GameCard) => {
                                return (
                                    <iframe
                                    className="w-auto h-[200px]"
                                    src={`https://www.youtube.com/embed/${game.video.slice(17)}`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  ></iframe>
                            )
                    }))}
                </div>
        </>
    );
}

export default VideosOfRecommended;