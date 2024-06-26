import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalForm from "../../modal/modalForm/ModalForm";
import { setGameSessionDetails } from "../../features/gameSessionSlice";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import "./GameMeet.css";
import ModalCalendar from "../../modal/modalCalendar/ModalCalendar";

const GameMeet: React.FC = () => {
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const navigate = useNavigate();
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

  const handleViewCalendars = () => {
    navigate("/calendars");
  };

  useEffect(() => {
    const conditionForButton = true;
    setIsButtonActive(conditionForButton);
  }, []);

  return (
    <div className="centered-container flex flex-col items-center space-y-6 font-rostov">
            <button
                className={`button-create ${isButtonActive ? "" : "button-create-inactive"}`}
                onClick={handleCreateSession}
                disabled={!isButtonActive}
              >
              Создать игровую сессию
            </button>
        
      <button className="bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded shadow-xl" onClick={handleViewCalendars}>
        Записаться на игровую сессию
      </button>
  
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