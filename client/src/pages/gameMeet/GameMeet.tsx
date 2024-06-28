import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalForm from "../../modal/modalForm/ModalForm";
import { setGameSessionDetails } from "../../features/gameSessionSlice";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import "./GameMeet.css";

import ModalCalendar from "../../modal/modalCalendar/ModalCalendar";



interface gameMeetsData {
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


 

type ValuePiece = Date | null;
type Value = ValuePiece | ValuePiece[];

const [value, setValue] = useState<Value>(new Date());


useEffect(() => {
  const temp: Value = gameMeets.map(obj => obj.date)
  setValue(temp)
}, [gameMeets]);

console.log(gameMeets)

  return (
    <div >
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                  <h2 className="text-3xl p-4 text-[#ffd700]">ВСЕ ИГРОТЕКИ МОСКВЫ</h2>
                    {/* <Calendar /> */}
                  <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-4">
                        {gameMeets && gameMeets.map((game, index) => { 
                            return (
                              // <MediaCard key={ index } game={ game }/>
                            <div className=" group relative p-4">
                                <button key={index} onClick={() => navigate(`/game/${game.game_id}`)} className="aspec t-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={game.img}
                                        className="p-8 h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </button>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h2 className="game-title">
                                            {game.gameName}
                                        </h2>
                                        {/* <FavoritesButton favorites={game.Users.length} handler={() => dispatch(takeFavorites({ user_id: user, game_id: game.id, toggler: true }))} /> */}
                                        <div className="game-descr pt-[1vh]">
                                            <p> <strong>Место проведения: </strong> {game.location}</p>
                                            <p> <strong>Запланированное число участников: </strong>{ game.maxPlayers}</p>
                                            <p> <strong>Организатор: </strong> {game.name}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )})}
                    </div>
                </div>
            
            
            
            
            
            
            
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