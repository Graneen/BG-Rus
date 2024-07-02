import { NavLink } from "react-router-dom";

function Step03() {
    return (
        <>
            <div className="guide" id="guide3">
                <div className="guide_description">
                    <div className="guide_number">03</div>
                    <p className="hero_pre-text">СООБЩЕСТВО</p>
                    <h1>Ищи единомышленников рядом</h1>
                    <div className="guide_text">Мы помогаем энтузиастам и клубам настольных игр в организации живых игровых мероприятий - от бронирования площадок до подготовки игровых зон и развлекательной программы.</div>
                    <div className="more">
                        <span className="more_text"><NavLink to="/events">Искать встречи</NavLink></span>
                        <span className="more_icon">
                            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 -6.99382e-07L14.59 1.41L20.17 7L-3.93402e-07 7L-3.0598e-07 9L20.17 9L14.58 14.58L16 16L24 8L16 -6.99382e-07Z" fill="#FBD784" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div className="guide_image"><img className="shadow-2xl  shadow-[#f1f1f1]" src="https://gdeigra.ru/images/about/2.jpg" alt="" /></div>
            </div>
        </>
    );
}

export default Step03;