import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { updateGameSession } from "../../features/gameSessionSlice";
import { FaMapMarkerAlt } from "react-icons/fa";
import ModalMap from "../modalMap/ModalMap";
import "./ModalForm.css";

const ModalForm: React.FC = () => {
  const { date, gameName, maxPlayers, venue } = useSelector((state: RootState) => state.gameSession);
  const dispatch = useDispatch();
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationAddress, setLocationAddress] = useState(venue);
  const [gameNameInput, setGameNameInput] = useState(gameName);
  const [maxPlayersInput, setMaxPlayersInput] = useState(maxPlayers);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateGameSession({
        date,
        gameName: gameNameInput,
        maxPlayers: maxPlayersInput,
        venue: selectedLocation
          ? `Lat: ${selectedLocation.lat}, Lng: ${selectedLocation.lng}`
          : locationAddress,
      })
    );
  };

  const handleLocationSelected = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
    setLocationAddress(`Lat: ${location.lat}, Lng: ${location.lng}`);
    setShowMapModal(false);
  };

  const handleLocationAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationAddress(e.target.value);
  };

  const handleGameNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameNameInput(e.target.value);
  };

  const handleMaxPlayersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPlayersInput(parseInt(e.target.value));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Детали</h3>
        <form onSubmit={handleFormSubmit}>
          <label>Date: {date}</label>
          <input type="text" value={gameNameInput} placeholder="Название игры" onChange={handleGameNameChange} />
          <input
            type="number"
            value={maxPlayersInput}
            placeholder="Количество игроков"
            onChange={handleMaxPlayersChange}
          />
          <div className="input-with-icon">
            <input
              type="text"
              value={locationAddress}
              placeholder="Локация"
              onChange={handleLocationAddressChange}
            />
            <FaMapMarkerAlt className="map-icon" onClick={() => setShowMapModal(true)} />
          </div>
          {showMapModal && (
            <ModalMap
              isOpen={showMapModal}
              onClose={() => setShowMapModal(false)}
              onLocationSelected={handleLocationSelected}
            />
          )}
          <button type="submit">Создать</button>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;