import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { updateGameSession } from "../../features/gameSessionSlice";
import { FaMapMarkerAlt } from "react-icons/fa";
import ModalMap from "../modalMap/ModalMap";
import axios from "axios"; 
import "./ModalForm.css";

const ModalForm: React.FC = () => {
  const { date, gameName, maxPlayers, venue } = useSelector((state: RootState) => state.gameSession);
  const dispatch = useDispatch();
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationAddress, setLocationAddress] = useState(venue);
  const [gameNameInput, setGameNameInput] = useState(gameName);
  const [maxPlayersInput, setMaxPlayersInput] = useState(maxPlayers);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/game-meetings/news", {
        game_id: null,
        gameName: gameNameInput,
        maxPlayers: maxPlayersInput,
        location: locationAddress,
        date,
      });
      console.log("Game Meeting created:", response.data);
      
      setShowMapModal(false); 

    } catch (error) {
      console.error("Error creating Game Meeting:", error);
    }
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
        <h3>Details</h3>
        <form onSubmit={handleFormSubmit}>
          <label>Date: {date}</label>
          <input type="text" value={gameNameInput} placeholder="Game Name" onChange={handleGameNameChange} />
          <input type="number" value={maxPlayersInput} placeholder="Max Players" onChange={handleMaxPlayersChange} />
          <div className="input-with-icon">
            <input
              type="text"
              value={locationAddress}
              placeholder="Location"
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
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;