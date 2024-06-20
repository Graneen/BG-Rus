
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
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleCloseModal = () => {
    setShowModal(false);
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

  const handleViewCalendars = () => {
    navigate("/calendars");
  };

  useEffect(() => {
    const conditionForButton = true;
    setIsButtonActive(conditionForButton);
  }, []);

  return (
    <div className="centered-container">
      <button
        className={`button-create ${isButtonActive ? "" : "button-create-inactive"}`}
        onClick={handleCreateSession}
        disabled={!isButtonActive}
      >
        Создать игровую сессию
      </button>

      <button className="button-view" onClick={handleViewCalendars}>
        Записаться на игровую сессию
      </button>

      <Modal isOpen={showCalendarModal} onRequestClose={() => setShowCalendarModal(false)}>
        <ModalCalendar setGameSessionDetails={handleGameSessionDetails}
        closeModal={handleCloseModal} />
      </Modal>

      <Modal isOpen={showFormModal} onRequestClose={() => setShowFormModal(false)}>
        <ModalForm />
      </Modal>
    </div>
  );
};

export default GameMeet;