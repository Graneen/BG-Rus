import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import './gamePage.css'
import { getGameCard, selectGameCard } from '../../features/gameCardSlice'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function GamePage() {
    const dispatch = useAppDispatch();
    const card = useAppSelector(selectGameCard);
    const { id } = useParams<{ id: string }>();

    const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
    const photos = [card.list.poster, card.list.image1, card.list.image2];

    useEffect(() => {
        if (id) {
            dispatch(getGameCard(id));
        }
    }, [id]);

    if (!card || card.loading || !card.list) {
        return <div>Loading...</div>;
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
                    <div className="card-left">
                        <div className="images-section">
                            <img src={photos[mainPhotoIndex]} 
                                 alt="Заглавное изображение" 
                                 className="main-image rounded-lg max-h-[50vh]" 
                                 onClick={handleMainPhotoClick} />
                            <div className="preview-images">
                                {photos.map((photo, index) => (
                                    <img key={index} src={photo} 
                                    alt={`Альтернативное изображение ${index}`} 
                                    className={mainPhotoIndex === index 
                                        ? 
                                        `preview-image active-prev-img rounded-lg` 
                                        : 
                                        `preview-image rounded-lg`} />
                                 ))}
                            </div>
                        </div>
                    </div>
                    <div className="card-right">
                        <div className="page-header">
                            <h2>{card.list.title}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GamePage;