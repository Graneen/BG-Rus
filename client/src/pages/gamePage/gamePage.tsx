import { useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import './gamePage.css'
import { selectGameCard } from '../../features/gameCardSlice'

function GamePage() {
    const dispatch = useAppDispatch()
    const card = useAppSelector(selectGameCard)
    console.log({card})
    
  
  
    // useEffect(() => {
    //   dispatch(selectGameCard())
    // }, [])

    
    return (
        <>
            <div className="page-container">
                <div className="page-main">
                    <div className="card-left">
                        <div className="grid gap-4">
                            <div>
                                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg" alt=""/>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt=""/>
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt=""/>
                                </div>
                                <div>
                                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt=""/>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="card-right"></div>
                </div>
            </div>
        </>
    );
}

export default GamePage;