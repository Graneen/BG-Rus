import React, { useState, useEffect } from "react";
import ModalForm from "../../modal/modalForm/ModalForm";
import { setGameSessionDetails } from "../../features/gameSessionSlice";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { generateUUID } from 'three/src/math/MathUtils.js';
import { MapModal } from '../../commons/MapModal';
import "./GameMeet.css";

import ModalCalendar from "../../modal/modalCalendar/ModalCalendar";
import Maps from "../../maps/Maps";
import UsersGameSessions from "../../usersGameSessions/UsersGameSessions";



export interface gameMeetsData {
  id: number;
  game_id: number;
  name: string;
  contacts: string;
  gameName: string;
  maxPlayers: number;
  location: string;
  img: string;
  place: number[];
  date: Date;
  time: string;
}


const GameMeet: React.FC = () => {
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [gameMeets, setGameMeets] = useState<gameMeetsData[]>([]);
  const [mapModal, setMapModal] = useState<boolean>(false);
  const [meetModal, setMeetModal] = useState<number>(0);
  const [gameSessionsAll, setGameSessionsAll] = useState<boolean>(false)

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setShowCalendarModal(false);
    setShowFormModal(false);
  };

  const handleCreateSession = () => {
    if (isButtonActive) {
      setShowCalendarModal(true);
    }
  };

  const handleGameSessionDetails = (details: any) => {
    dispatch(setGameSessionDetails(details));
    setShowFormModal(true);
  };

  const handleSuccessfulFormSubmit = () => {
    setShowFormModal(false);
    setShowCalendarModal(false);
  };

  const handleViewSessions = () => {
    setGameSessionsAll(true)
  };

  useEffect(() => {
    const conditionForButton = true;
    setIsButtonActive(conditionForButton);
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/meets`);

        if (response.ok) {
          const data: gameMeetsData[] = await response.json();
          setGameMeets(data);
        } else {
          console.error('Ошибка при загрузке данных');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div >
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="mt-5 text-3xl text-[#ffd700]">ЧТО ТАКОЕ ИГРОТЕКИ?</h2>
      <div className="text-base leading-7 text-gray-400">Игротека – это один из современных способов весело и интересно провести время в компании.

Иногда нам хочется поиграть в настольную игру, но покупать дорогостоящую коробку с игрой хочется не всегда – а вдруг игра не понравится, будет сложно разобраться в правилах или просто не получится собрать компанию? Производители настольных игр понимали эту проблему, поэтому и начали проводить игротеки у себя в магазинах и сотрудничать с антикафе. Сейчас же формат игротек сильно расширился и появились отдельные организаторы, проводящие игротеки и в других местах – барах, кальянных, ресторанах.Игротека - мероприятие на котором все желающие могут познакомиться с самыми разнообразными настольными играми и присоединиться к игре, даже если не знают никого за столом. Организаторы делают все, чтобы гости чуствовали себя комфортно на мероприятии и легко знакомились с новыми людьми. У нас на сайте вы можете найти и забронировать место за столом на Игротеке для себя и друзей в нужный день или в любимом месте, и узнать последние новости!</div>
        <h2 className="mt-10 text-3xl text-[#ffd700]">ИГРОВЫЕ СЕССИИ НА КАРТЕ</h2>
        <Maps gameMeets={gameMeets} mapModal={mapModal} setMapModal={setMapModal} setMeetModal={setMeetModal} />
        <div className="sessions-buttons-block mt-10">
          <button
          className={`w-[50%] mt-5 py-2.5 px-5 button-create ${isButtonActive ? "" : "mt-5 py-2.5 px-5 button-create-inactive"}`}
          onClick={handleCreateSession}
          disabled={!isButtonActive}
        >
          Создать собственную игросессию
          </button>
          <a href='#sessions' className="w-[50%] mt-5 py-2.5 px-5 text-center bg-white text-black font-semibold py-2 px-4 rounded shadow-xl" onClick={handleViewSessions}>
            Записаться на игросессии других пользователей
          </a>
        </div>
        {gameSessionsAll ? <UsersGameSessions gameMeets={gameMeets}/> : <></>}
      </div>


      {mapModal ? <div className="absolute object-left" id={generateUUID()}><MapModal mapModal={mapModal} setMapModal={setMapModal} meetModal={meetModal} /></div> : <></>}

      <Modal isOpen={showCalendarModal} onRequestClose={handleCloseModal}>
        <ModalCalendar setGameSessionDetails={handleGameSessionDetails} closeModal={handleCloseModal} />
      </Modal>

      <Modal isOpen={showFormModal} onRequestClose={handleCloseModal}>
        <ModalForm onCloseModal={handleSuccessfulFormSubmit} />
      </Modal>
    </div>
  );
};

export default GameMeet;