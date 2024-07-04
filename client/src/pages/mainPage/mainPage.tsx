import { useContext, useEffect, useState } from 'react';
import ArrowIcon from '../../commons/ArrowIcon';
import Steps from '../../steps/Steps';

import './mainPage.css';
import { AuthContext } from '../../app/App';
import { GameCard } from '../../features/gameCardSlice';
import { gameMeetsData } from '../gameMeet/GameMeet';






function MainPage(): JSX.Element {
    const { user } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [quizFinished, setQuizFinished] = useState<boolean>(false);
    const [someFavorites, setSomeFavorites] = useState<GameCard[]>([]);
    const [someRecs, setSomeRecs] = useState<GameCard[]>([]);
    const [someMeets, setSomeMeets] = useState<gameMeetsData[]>([]);



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user) {
                    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/users/${user}`);

                    if (response.ok) {
                        const data = await response.json();
                        setUsername(data);
                    } else {
                        console.error('Ошибка при загрузке данных об имени пользователя');
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchUserData();
    },[user])

    useEffect(() => {
        const fetchQuizFinishData = async () => {
            try {
                if (username) {
                    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/quiz/${user}`);

                    if (response.ok) {
                        const data = await response.json();
                        setQuizFinished(data.statusQuiz);
                    } else {
                        console.error('Ошибка при загрузке данных о прохождении входного квиза');
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchQuizFinishData();
    },[user, username])

    useEffect(() => {
        const fetchFavoritesData = async () => {
            try {
                if (user) {
                    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/user/favorite/${user}`);

                    if (response.ok) {
                        const data: GameCard[] = await response.json();
                        setSomeFavorites(data);
                    } else {
                        console.error('Ошибка при загрузке данны об избранном');
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchFavoritesData();
    },[user, username])

    useEffect(() => {
        const fetchRecsData = async () => {
            try {
                if (quizFinished) {
                    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/main/recommended/${user}`);

                    if (response.ok) {
                        const data: GameCard[] = await response.json();
                        setSomeRecs(data);
                    } else {
                        console.error('Ошибка при загрузке данных о рекомендованном');
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchRecsData();
    },[quizFinished, user])

    useEffect(() => {
        const fetchMeetsData = async () => {
            try {
                if (quizFinished) {
                    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/meets`);

                    if (response.ok) {
                        const data: gameMeetsData[] = await response.json();
                      setSomeMeets(data.slice(0, 4));
                    } else {
                      console.error('Ошибка при загрузке данных');
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchMeetsData();
    },[quizFinished, user])
    
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
                <div className="bg-layer-1 HG"><img src="./backgrounds/1682.jpg" alt="Background" /></div>
                <div className="bg-layer-2 BG Hero"></div>
                <div className="bg-layer-3 MG"><img className="shadow-2xl" src="./backgrounds/1640.png" alt="Background" /></div>
                <div className="bg-layer-4 VG"><img src="./backgrounds/1611.png" alt="Background" /></div>
                <div className="hero_description">
                    <h1>{user ? `ПРИВЕТ, ${username.toUpperCase()}!`: `ДАВАЙ ЗНАКОМИТЬСЯ?`}</h1>
                    <p className="hero_post-text">
                        <span className="scroll-text">{quizFinished ? `скролль вниз и посмотри обзоры на игры, которые мы тебе рекомендуем` : `крути колесо мыши вниз, и пройди 3 простых шага`}</span>
                        <span className="scroll-icon">
                            <ArrowIcon/>
                        </span>
                    </p>
                </div>
                <div className="height"></div>
            </section>
                <Steps quizFinished={quizFinished} someFavorites={someFavorites} someRecs={someRecs} someMeets={someMeets} setSomeMeets={setSomeMeets}/>
        </>);
}

export default MainPage;



