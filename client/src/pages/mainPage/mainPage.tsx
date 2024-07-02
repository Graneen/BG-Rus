import { useContext, useEffect, useState } from 'react';
import ArrowIcon from '../../commons/ArrowIcon';
import Steps from '../../steps/Steps';

import './mainPage.css';
import { AuthContext } from '../../app/App';
import CarouselBlock from '../../carousel/CarouselBlock';


function MainPage(): JSX.Element {
    const { user } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [quizFinished, setQuizFinished] = useState<boolean>(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/users/${user}`);

                    if (response.ok) {
                        const data = await response.json();
                        setUsername(data);
                    } else {
                        console.error('Ошибка при загрузке данных');
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    },[user])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/quiz/${user}`);

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data)
                        setQuizFinished(data);
                    } else {
                        console.error('Ошибка при загрузке данных');
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    },[username])


    
    useEffect(() => {
        
        const header:HTMLElement | null = document.querySelector("header");
        const heroText: HTMLElement | null = document.querySelector(".hero_description");
        const heroBG1: HTMLElement | null = document.querySelector(".bg-layer-1 img");
        const heroBG4: HTMLElement | null = document.querySelector(".bg-layer-4 img");
    
        window.addEventListener("scroll", () => {
            let value = window.scrollY;
            if (value > 1100) {
                value = 0;
            }
            header !== null ? header.style.top = `${value / 1.08}px` : '';
            if (value > 350) {
                if (header) header.style.top = '0';
            }
            heroBG1 !== null ? heroBG1.style.top = `-${value / 3}px` : '';
            heroBG4 !== null ? heroBG4.style.top = `${value / 8}px` : '';
            heroBG4 !== null ? heroBG4.style.left = `-${value / 5.5}px` : '';
            heroText !== null ? heroText.style.transform = `translateY(${value / 1.5}px)` : '';
        });
    }, [])

    return (
        <>
            <section className="hero" id="hero">
                <div className="bg-layer-1 HG"><img src="https://furman.top/uploads/posts/2023-04/1682858362_furman-top-p-oboi-na-telefon-oblaka-belie-vkontakte-5.jpg" alt="Background" /></div>
                <div className="bg-layer-2 BG Hero"></div>
                <div className="bg-layer-3 MG"><img className="shadow-2xl" src="https://trueimages.ru/img/8c/46/d4710866.png" alt="Background" /></div>
                <div className="bg-layer-4 VG"><img src="https://trueimages.ru/img/81/77/3ab71766.png" alt="Background" /></div>
                <div className="hero_description">
                    <h1>{user ? `ПРИВЕТ, ${username.toUpperCase()}!`: `ДАВАЙ ЗНАКОМИТЬСЯ?`}</h1>
                    <p className="hero_post-text">
                        <span className="scroll-text">{quizFinished ? `скролль вниз и узнай, что нового в мире настолок` : `крути колесо мыши вниз, и пройди 3 простых шага`}</span>
                        <span className="scroll-icon">
                            <ArrowIcon/>
                        </span>
                    </p>
                </div>
                <div className="height"></div>
            </section>
                {quizFinished ? <CarouselBlock/> : <Steps />}
        </>);
}

export default MainPage;



