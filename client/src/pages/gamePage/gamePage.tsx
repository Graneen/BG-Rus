import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import './gamePage.css'
import { getGameCard, selectGameCard } from '../../features/gameCardSlice'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function GamePage() {
    const dispatch = useAppDispatch();
    const card = useAppSelector(selectGameCard);
    const { id } = useParams<{ id: string }>();

    
    useEffect(() => {
        if (id) {
            dispatch(getGameCard(id));
        }
    }, [id]);

    if (!card || card.loading || !card.list) {
        return <div>Loading...</div>;
    }
    
    return (
        <>
            <div className="page-container">
                <div className="page-header">
                    <h1>{card.list.title}</h1>
                </div>
                <div className="page-main">
                    <div className="card-left">
                        <div className="grid gap-4">
                            <div>
                                <img className="h-auto max-w-full rounded-lg max-h-[50vh]" src={card.list.poster} alt=""/>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="main-image">
                                    <img className="h-auto max-w-full rounded-lg" src={card.list.poster} alt=""/>
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src={card.list.image1} alt=""/>
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src={card.list.image2} alt=""/>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="card-right">
                    </div>
                </div>
            </div>
        </>
    );
}

export default GamePage;