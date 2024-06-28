import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import './gamePage.css'
import { getGameCard, selectGameCard } from '../../features/gameCardSlice';
import { selectFavoritesCard, takeFavorites, takeFavorite } from '../../features/addToFavoritesSlice';
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Rate } from 'antd';
import FavoritesButton from '../../commons/FavoritesButton'
import { Spinner } from "flowbite-react";
import MenuTab from '../../commons/menuTab/MenuTab'
import { AuthContext } from '../../app/App'
import axios from 'axios';


function GamePage() {
    const { user } = useContext(AuthContext);
    const dispatch = useAppDispatch();
    const card = useAppSelector(selectGameCard);
    const takeTheFavorites = useAppSelector(selectFavoritesCard);
    const { id } = useParams<{ id: string }>();
    const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
    const photos = [card.list.boardGame.poster, card.list.boardGame.image1, card.list.boardGame.image2];

    const estimation: number = Number(card.list.estimationGame.result)
    const estimationLength: number = Number(card.list.estimationGame.rateArr)

    const [rate, setRate] = useState(estimation);

    useEffect(() => {
        if (id) {
            dispatch(getGameCard(id));
        }
    }, [dispatch, id, user, rate]);

    
    useEffect(() => {
        if (id) {
            dispatch(takeFavorite({user_id: user, game_id: Number(id)}))
        }
    }, [user]);

    if (!card || card.loading || !card.list) {
        return <div className="loading-spinner">
            <Spinner color="warning" aria-label="Loading..." size="xl" />
        </div>;
    }

    function changeRateHandler(value: number) {
        const fetchData = async () => {
            try {
                const rating = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/rates`, {user_id: user, game_id: Number(id), value: value});

                setRate(rating.data.result)
                return rating.data;
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }

    const handleMainPhotoClick = () => {
        if (mainPhotoIndex === 2) {
            setMainPhotoIndex(0);
        } else {
            setMainPhotoIndex(mainPhotoIndex + 1);
        }
    };

    return (
        <>
            <div className="page-container">
                <div className="page-main">
                    <div className="block-guide">
                        <h1 className='page-header'>{card.list.boardGame.title}</h1>
                        <div>
                            <div className="image-descr-block">
                                <div className="card-left">
                                    <div className="images-section">
                                        <div className="main-image image-bg rounded-lg" onClick={handleMainPhotoClick}>
                                            <img src={photos[mainPhotoIndex]} className="main-img" alt="Заглавное изображение" />
                                        </div>
                                        <div className="preview-images">
                                            {photos.map((photo, index) => (
                                                <div key={index} className={mainPhotoIndex === index ? `active-prev-img rounded-lg  image-bg` : `image-bg rounded-lg`}>
                                                    <img className="preview-image" src={photo} alt={`Альтернативное изображение ${index}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-right">
                                        <p>Рейтинг: <Rate allowHalf defaultValue={rate ? rate : estimation} value={ rate ? rate : estimation} onChange={changeRateHandler}/></p>
                                        <p className="stars-container">{estimationLength > 0 ? `${rate ? rate : estimation} (на основании ${estimationLength} оценок)` : 'Нет оценок' }</p>
                                    <p>Жанр: {card.list.boardGame.genre}</p>
                                    <p>Тематика: {card.list.boardGame.theme}</p>
                                    <p>Авторы: {card.list.boardGame.author}</p>
                                    <p>Год создания: {card.list.boardGame.year}</p>
                                    <p className="game-desc mb-6 text-gray-400 dark:text-gray-400">
                                        {card.list.boardGame.description}
                                    </p>
                                    <p className="text-[#ffd700]">Рейтинг сложности: {card.list.boardGame.difficulty}</p>
                                    <p className="text-[#ffd700]">Возможное количество игроков: {card.list.boardGame.players} чел.</p>
                                    <p className="text-[#ffd700]">Среднее время игры: {card.list.boardGame.time}</p>
                                    <FavoritesButton favorites={ (takeTheFavorites.statusFav.toggler) === true ? 1 : null }
                                                     handler={() => dispatch(takeFavorites({ user_id: user, game_id: card.list.boardGame.id, toggler: true}))}/>

                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="block-guide">
                        <MenuTab card={card} />
                    </section>
                    <section className="block-guide">

                    </section>
                </div>
            </div>
        </>
    );
}

export default GamePage;