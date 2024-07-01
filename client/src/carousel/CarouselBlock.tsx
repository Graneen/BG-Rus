
import { useState } from 'react';
import '../steps/Steps.css'
import { NavLink, useNavigate } from 'react-router-dom';


function CarouselBlock() {
    const [ quiz, setQuiz ] = useState<boolean>(false);
    const navigate = useNavigate();

    function quizHandler() {
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
                        <div className="guide" id="guide1">
                            <div className="guide_description">
                                <div className="guide_number">01</div>
                                <p className="hero_pre-text">КВИЗ</p>
                                <h1>Какой ты игрок?</h1>
                                    <CarouselBlock/>
                            </div>
                            <div className="guide_image"><img className="shadow-2xl shadow-[#f1f1f1]" src='https://trueimages.ru/img/e6/18/46b71766.png' alt="" /></div>
                        </div>

                </section>
            </section>
        </>
    );
}

export default CarouselBlock;