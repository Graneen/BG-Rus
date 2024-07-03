import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { updateGameSession } from "../../features/gameSessionSlice";
import { FaMapMarkerAlt } from "react-icons/fa";
import ModalMap from "../modalMap/ModalMap";
import axios from "axios"; 
import "./ModalForm.css";

import { gameMeetsData } from '../../pages/gameMeet/GameMeet';


interface ModalFormProps {
  onCloseModal: () => void;
  updateGameMeets: (newGameMeet: gameMeetsData) => void;
  }

  const ModalForm: React.FC<ModalFormProps> = ({ onCloseModal, updateGameMeets }) => {
  const { date, gameName, maxPlayers, venue } = useSelector((state: RootState) => state.gameSession);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [locationAddress, setLocationAddress] = useState(venue);
  const [gameNameInput, setGameNameInput] = useState(gameName);
  const [maxPlayersInput, setMaxPlayersInput] = useState(maxPlayers);
  const [timeInput, setTimeInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [contactsInput, setContactsInput] = useState("");
  const [imgInput, setImgInput] = useState("");
  const [placeInput, setPlaceInput] = useState("");

  const displayMessage = (msg: string) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      const imageUrl = imgInput || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJY6pNBO1wxk8BH5uPMKz7mLEzk-Y1z-9IMw&s";
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/game-meetings/news`, {
        game_id: null,
        name: nameInput,
        contacts: contactsInput || '',
        gameName: gameNameInput,
        maxPlayers: maxPlayersInput,
        location: locationAddress,
        img: imageUrl,
        place: placeInput ? placeInput.split(",").map((coord) => parseFloat(coord.trim())) : [0, 0],
        date,
        time: timeInput,
      });

      displayMessage("Игровая сессия успешно создана!");
     

     

      dispatch(
        updateGameSession({
          gameName: gameNameInput,
          maxPlayers: maxPlayersInput,
          venue: locationAddress,
        })
      );
      updateGameMeets(response.data);

      setTimeout(() => {
        onCloseModal();
      }, 3000);
    } catch (error) {
      console.error("Error creating Game Meeting:", error);
      displayMessage("Ошибка при создании игровой сессии.");
    }
  };

  const handleLocationSelected = (location: { lat: number; lng: number }) => {
    setLocationAddress(`Lat: ${location.lat}, Lng: ${location.lng}`);
    setPlaceInput(`${location.lat}, ${location.lng}`);
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

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeInput(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const handleContactsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactsInput(e.target.value);
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgInput(e.target.value);
  };

  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceInput(e.target.value);
  };
  return (
    <div
    className="modal bg-black-200 px-4 py-4"
    onClick={onCloseModal}
  >
    <div
      className="modal-content bg-yellow-200 p-4 rounded-md shadow-md"
      onClick={(e) => e.stopPropagation()}
    >
        {showMessage && <div className="message">{message}</div>}
        <h3 className="text-black">Детали</h3>
        <form onSubmit={handleFormSubmit} className="text-black">
          <label>Данные: {date}</label>
          <input
            type="text"
            value={nameInput}
            placeholder="Имя организатора"
            onChange={handleNameChange}
            className="mt-2 px-3 py-2 border rounded w-full"
          />
          <input
            type="text"
            value={contactsInput}
            placeholder="Контакты"
            onChange={handleContactsChange}
            className="mt-2 px-3 py-2 border rounded w-full"
          />
          <input
            type="text"
            value={gameNameInput}
            placeholder="Название игры"
            onChange={handleGameNameChange}
            className="mt-2 px-3 py-2 border rounded w-full"
          />
          <input
            type="number"
            value={maxPlayersInput}
            placeholder="Количество игроков"
            onChange={handleMaxPlayersChange}
            className="mt-2 px-3 py-2 border rounded w-full"
          />
          <input
            type="time"
            value={timeInput}
            placeholder="Время (ЧЧ:ММ)"
            onChange={handleTimeChange}
            className="mt-2 px-3 py-2 border rounded w-full"
          />
          <div className="input-with-icon mt-2">
            <input
              type="text"
              value={locationAddress}
              placeholder="Место проведения"
              onChange={handleLocationAddressChange}
              className="px-3 py-2 border rounded w-full"
            />
            <FaMapMarkerAlt
              className="map-icon text-yellow-500 cursor-pointer"
              onClick={() => setShowMapModal(true)}
            />
          </div>
          <input
            type="text"
            value={imgInput}
            placeholder="Ссылка на изображение"
            onChange={handleImgChange}
            className="mt-2 px-3 py-2 border rounded w-full"
          />
          <input
            type="text"
            value={placeInput}
            placeholder="Координаты (широта, долгота)"
            onChange={handlePlaceChange}
            className="mt-2 px-3 py-2 border rounded w-full"
          />
          {showMapModal && (
            <ModalMap
              isOpen={showMapModal}
              onClose={() => setShowMapModal(false)}
              onLocationSelected={handleLocationSelected}
            />
          )}
          <button
            type="submit"
            className="mt-4 bg-yellow-500 text-white font-semibold py-2 px-4 rounded"
          >
            Создать
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;