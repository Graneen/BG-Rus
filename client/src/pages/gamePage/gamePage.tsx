import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import './gamePage.css'
import { getGameCard, selectGameCard } from '../../features/gameCardSlice';
import { selectFavoritesCard, takeFavorites } from '../../features/addToFavoritesSlice';
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import StarIcon from '../../commons/StarIcon'
import FavoritesButton from '../../commons/FavoritesButton'
import { Spinner } from "flowbite-react";
import MenuTab from '../../commons/menuTab/MenuTab'
import { AuthContext } from '../../app/App'


function GamePage() {
    const { user } = useContext(AuthContext);
    const dispatch = useAppDispatch();
    const card = useAppSelector(selectGameCard);
    const takeTheFavorites = useAppSelector(selectFavoritesCard);
    const { id } = useParams<{ id: string }>();

    const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
    const photos = [card.list.boardGame.poster, card.list.boardGame.image1, card.list.boardGame.image2];

    useEffect(() => {
        if (id) {
            dispatch(getGameCard(id));
        }
    }, [dispatch, id]);

    if (!card || card.loading || !card.list) {
        return <div className="loading-spinner">
            <Spinner color="warning" aria-label="Loading..." size="xl" />
        </div>;
    }

    const handleMainPhotoClick = () => {
        if (mainPhotoIndex === 2) {
            setMainPhotoIndex(0);
        } else {
            setMainPhotoIndex(mainPhotoIndex + 1);
        }
    };

    const estimation: number = Number((card.list.estimationGame.reduce((acc, curr) => {
        return acc + curr.value
    }, 0) / card.list.estimationGame.length).toFixed(1))
    
    console.log(takeTheFavorites)

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
                                                <div className={mainPhotoIndex === index ? `active-prev-img rounded-lg  image-bg` : `image-bg rounded-lg`}>
                                                    <img key={index} className="preview-image" src={photo} alt={`Альтернативное изображение ${index}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-right">
                                    <div className="stars-container">
                                        Рейтинг: {estimation && estimation > 0 ? card.list.estimationGame.map((index) => <StarIcon />) : ''} <StarIcon />

                                        <p>{estimation > 0 ? `${estimation} (на основании ${card.list.estimationGame.length} оценок)` : 'Нет оценок' }</p>
                                    </div>
                                    <p>Жанр: {card.list.boardGame.genre}</p>
                                    <p>Тематика: {card.list.boardGame.theme}</p>
                                    <p>Авторы: {card.list.boardGame.author}</p>
                                    <p>Год создания: {card.list.boardGame.year}</p>
                                    <p className="game-desc mb-6 text-gray-400 dark:text-gray-400">
                                        {card.list.boardGame.description}
                                    </p>
                                    <FavoritesButton handler={() => dispatch(takeFavorites({ id: id, user_id: user }))}/>

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