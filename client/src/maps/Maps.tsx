import  { useState } from 'react';
import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';
import { gameMeetsData } from '../pages/gameMeet/GameMeet';

function Maps({ gameMeets, mapModal, setMapModal, setMeetModal, setContacts }: { gameMeets: gameMeetsData[], mapModal: boolean, setMapModal: (modalOpen: boolean) => void, setMeetModal: (meetData: gameMeetsData) => void, setContacts: (contacts: string) => void }) {

    const [organizerContacts, setOrganizerContacts] = useState<string | null>(null);
    const [showContactDetails, setShowContactDetails] = useState<boolean>(false);

    const modalHandler = (index: number) => {
        mapModal ? setMapModal(false) : setMapModal(true);
        setMeetModal(gameMeets[index]);
        setOrganizerContacts(gameMeets[index].contacts);
        setShowContactDetails(true);
    };

    const closeOrganizerContacts = () => {
        setOrganizerContacts(null);
        setShowContactDetails(false);
    };

    return (
        <>
            <YMaps>
                <Map
                    width='100%'
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
                            <Placemark
                                key={index}
                                geometry={el.place}
                                onClick={() => modalHandler(index)}
                            >
                                <button
                                    onClick={() => {
                                        setContacts(el.contacts);
                                        modalHandler(index);
                                    }}
                                    className="button-contact-organizer"
                                >
                                    Связаться с организаторами
                                </button>
                            </Placemark>
                        ))}
                    </Clusterer>
                </Map>
            </YMaps>

            {showContactDetails && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001 }}>
                    <div style={{ backgroundColor: '#FFD700', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                        <p style={{ fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>Контакты организатора:</p>
                        <p style={{ color: '#000' }}>{organizerContacts}</p>
                        <button onClick={closeOrganizerContacts} style={{ marginTop: '10px', padding: '8px', backgroundColor: '#000', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Закрыть</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Maps;