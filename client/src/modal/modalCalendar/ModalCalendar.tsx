import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import './ModalCalendar.css';

const ModalCalendar: React.FC<{ setGameSessionDetails: Function, closeModal: Function }> = ({ setGameSessionDetails, closeModal }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleNext = () => {
    if (selectedDate) {
      setGameSessionDetails({ date: selectedDate.toISOString().slice(0, 10) });
    }
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleCalendarIconClick = () => {
    const datePickerInput = document.getElementsByClassName("react-datepicker__input-container")[0].children[0] as HTMLInputElement;
    datePickerInput.click();
  };

  return (
    <div className="modal-full">
      <div className="modal-content">
        <button className="close-button" onClick={handleCloseModal}>
          X
        </button>
        <div className="input-with-icon">
          <input
            value={(selectedDate && selectedDate.toISOString().slice(0, 10)) || ""}
            readOnly
            placeholder="Select Date"
          />
          <FaCalendarAlt 
            className="calendar-icon" 
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
              <FaCalendarAlt />
            </div>
          }
        />
        <button className="button-next" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default ModalCalendar;