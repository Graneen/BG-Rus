import React, { useState, useEffect } from "react";
import { Map, Placemark, YMaps } from "react-yandex-maps";

interface ModalMapProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelected: (location: { lat: number; lng: number }) => void;
}

const ModalMap: React.FC<ModalMapProps> = ({ isOpen, onClose, onLocationSelected }) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error getting user location:", error);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, []);

  const handleMapClick = (e: any) => {
    const { coords } = e.get("coords");
    setSelectedLocation({ lat: coords[0], lng: coords[1] });
    onLocationSelected({ lat: coords[0], lng: coords[1] });
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <h3>Выберите локацию</h3>
          <YMaps>
            <Map
              defaultState={{
                center: userLocation
                  ? [userLocation.lat, userLocation.lng]
                  : [55.7558, 37.6173],
                zoom: 13,
              }}
              onClick={handleMapClick}
              style={{ height: "400px", width: "100%" }}
            >
              {selectedLocation && (
                <Placemark
                  geometry={[selectedLocation.lat, selectedLocation.lng]}
                  properties={{
                    balloonContent: "Выбранная локация",
                  }}
                />
              )}
              {userLocation && (
                <Placemark
                  geometry={[userLocation.lat, userLocation.lng]}
                  properties={{
                    balloonContent: "Ваше местоположение",
                  }}
                />
              )}
            </Map>
          </YMaps>
          <div className="modal-actions">
            <button onClick={onClose}>Закрыть</button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalMap;