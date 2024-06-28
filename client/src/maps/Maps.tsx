import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';

function Maps({products}) {


    return (
        <>
            <YMaps>
                <Map width='100%'
                    height='500px'
                    defaultState={{
                        center: [55.918033, 37.850994],
                        zoom: 14,
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
                        {products.map((el, index) => (
                            <Placemark key={index} geometry={el.location} />
                        ))}
                    </Clusterer>
                </Map>
            </YMaps>
        </>
    );
}

export default Maps;