import { useState } from 'react';
import './Steps.css'
import { useNavigate } from 'react-router-dom';
import Step01 from './GuideSteps/Step01';
import Step02 from './GuideSteps/Step02';
import Step03 from './GuideSteps/Step03';
import ReviewsOfFavorites from '../commons/reviewsOfFavorites/ReviewsOfFavorites';
import VideosOfRecommended from '../commons/reviewsOfFavorites/VideosOfRecommended';
import { GameCard } from '../features/gameCardSlice';
import { gameMeetsData } from '../pages/gameMeet/GameMeet';
import RecentMeets from '../commons/reviewsOfFavorites/RecentMeets';

function Steps({
    quizFinished, 
    someFavorites, 
    someRecs, 
    someMeets
}: {
    quizFinished: boolean; 
    someFavorites: GameCard[]; 
    someRecs: GameCard[]; 
    someMeets: gameMeetsData[];
}) {
    const [ quiz, setQuiz ] = useState<boolean>(false);
    const navigate = useNavigate();

    function quizHandler(): void {
        const user = localStorage.getItem("user");
        if (user) {
            quiz ? setQuiz(false) : setQuiz(true);
        } else {
            navigate("/login");
        }
    }
    return (
        <>
            <section className="main-content">
                <section className="guides">
                        {quizFinished ? <VideosOfRecommended someRecs={someRecs} /> : <Step01 quizHandler={quizHandler} quiz={quiz} setQuiz={setQuiz} />}
                        {someFavorites.length ? <ReviewsOfFavorites someFavorites={someFavorites}/> : <Step02 />}
                        {someMeets.length ? <RecentMeets gameMeets={someMeets}/> : <Step03 />}
                </section>
            </section>
        </>
    );
}

export default Steps;