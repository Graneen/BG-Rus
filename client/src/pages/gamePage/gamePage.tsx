import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import './gamePage.css'
import { getGameCard, selectGameCard } from '../../features/gameCardSlice'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StarIcon from '../../commons/StarIcon'
import FavoritesButton from '../../commons/FavoritesButton'

function GamePage() {
    const dispatch = useAppDispatch();
    const card = useAppSelector(selectGameCard);
    const { id } = useParams<{ id: string }>();

    const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
    const photos = [card.list.boardGame.poster, card.list.boardGame.image1, card.list.boardGame.image2];

    useEffect(() => {
        if (id) {
            dispatch(getGameCard(id));
        }
    }, [id]);

    if (!card || card.loading || !card.list) {
        return <div>Loading...</div>;
    }
    // console.log(card.list.feedBackGame)

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
                                                <div className={mainPhotoIndex === index ? `active-prev-img rounded-lg  image-bg` : `image-bg rounded-lg`}>
                                                    <img key={index} className="preview-image" src={photo} alt={`Альтернативное изображение ${index}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-right">
                                    <div className="stars-container">
                                        <StarIcon />
                                        <StarIcon />
                                        <StarIcon />
                                        <StarIcon />
                                        <StarIcon />
                                        <p>(5 отзывов)</p>
                                    </div>
                                    <p>Жанр: {card.list.boardGame.genre}</p>
                                    <p>Тематика: {card.list.boardGame.theme}</p>
                                    <p>Авторы: {card.list.boardGame.author}</p>
                                    <p>Год создания: {card.list.boardGame.year}</p>
                                    <p className="game-desc mb-6 text-gray-400 dark:text-gray-400">
                                        {card.list.boardGame.description}
                                    </p>
                                    <FavoritesButton />

                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="block-guide">
                        <div className="video-block">
                            <h2>Видеообзор</h2>
                            <iframe className="w-full h-[70vh]" src={`https://www.youtube.com/embed/${card.list.boardGame.video.slice(17)}`}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen>
                            </iframe>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default GamePage;