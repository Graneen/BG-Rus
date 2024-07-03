import QuizPage from "../../pages/QuizPage/QuizPage";

function Step01({quizHandler, quiz, setQuiz}: {quizHandler: void, quiz: boolean, setQuiz: React.Dispatch<React.SetStateAction<boolean>>}) {
    return (
        <>
            <div className="guide" id="guide1">
                <div className="guide_description">
                    <div className="guide_number">01</div>
                    <p className="hero_pre-text">КВИЗ</p>
                    <h1>Какой ты игрок?</h1>
                    <div className="guide_text">Наш интерактивный квиз поможет определить ваши личные игровые предпочтения. Мы зададим вам несколько вопросов о ваших игровых вкусах и на основе ваших ответов подберем подходящие для вас настольные игры из нашей обширной коллекции.</div>
                    <a
                        href='#quiz'
                        className="more"
                        onClick={quizHandler}
                    >
                        <span className="more_text">Пройти квиз</span>
                        <span className="more_icon">
                            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 -6.99382e-07L14.59 1.41L20.17 7L-3.93402e-07 7L-3.0598e-07 9L20.17 9L14.58 14.58L16 16L24 8L16 -6.99382e-07Z" fill="#FBD784" />
                            </svg>
                        </span>
                    </a>
                </div>
                <div className="guide_image"><img className="shadow-2xl shadow-[#f1f1f1]" src='https://trueimages.ru/img/e6/18/46b71766.png' alt="" /></div>
            </div>
            {quiz ? <div id="quiz"><QuizPage setQuiz={setQuiz} /></div> : <></>}
        </>
    );
}

export default Step01;