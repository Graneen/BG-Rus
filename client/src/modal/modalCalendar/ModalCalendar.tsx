import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import './ModalCalendar.css';
import { useNavigate } from "react-router-dom";

interface ModalCalendarProps {
  setGameSessionDetails: (details: any) => void;
  closeModal: () => void;
  
}


const ModalCalendar: React.FC<ModalCalendarProps> = ({ setGameSessionDetails, closeModal }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedDate) {
      setGameSessionDetails({ date: selectedDate.toISOString().slice(0, 10) });
    }
  };

  const handleCloseModal = () => {
    
    closeModal();
    navigate("/events");
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleCalendarIconClick = () => {
    const datePickerInput = document.getElementsByClassName("react-datepicker__input-container")[0].children[0] as HTMLInputElement;
    datePickerInput.click();
  };

  
    return (
      <div className="modal-full bg-black-200 fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="modal-content bg-yellow-50 p-4 rounded-md shadow-md max-w-md">
          <button className="close-button text-black" onClick={handleCloseModal}>
            X
          </button>
          <div className="input-with-icon">
            <input
              value={(selectedDate && selectedDate.toISOString().slice(0, 10)) || ""}
              readOnly
              placeholder="Select Date"
              className="w-full px-3 py-2 rounded border border-black text-black" 
            />
            <FaCalendarAlt 
              className="calendar-icon text-yellow-500 cursor-pointer" 
              onClick={handleCalendarIconClick} 
            />
          </div>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select Date"
            customInput={
              <div className="custom-input">
              
               
              </div>
            }
          />
          <button className="button-next bg-yellow-500 text-white font-semibold py-2 px-4 rounded mt-4" onClick={handleNext}>Далее</button> 
        </div>
      </div>
    
  );
}

export default ModalCalendar;