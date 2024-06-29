import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';
import { gameMeetsData } from '../pages/gameMeet/GameMeet';


function Maps({gameMeets, mapModal, setMapModal, setMeetModal} :{ gameMeets: gameMeetsData[], mapModal: boolean}) {


    function modalHandler(index: number) {
        mapModal ? setMapModal(false) : setMapModal(true);
        setMeetModal(gameMeets[index]);
    }


    return (
        <>
            <YMaps>
                <Map width='100%'
                    height='500px'
                    defaultState={{
                        center: [55.751428, 37.618875],
                        zoom: 10,
                        controls: ["zoomControl", "fullscreenControl"],
                    }}
                    modules={["control.ZoomControl", "control.FullscreenControl"]}
                >
                    
                    <Clusterer 
                        options={{
                            preset: "islands#invertedVioletClusterIcons",
                            groupByCoordinates: false,
                        }}
                    >
                        {gameMeets.map((el, index) => (
                            <Placemark key={index} geometry={el.place} onClick={() => modalHandler(index)} />
                        ))}
                    </Clusterer>
                </Map>
            </YMaps>
        </>
    );
}

export default Maps;