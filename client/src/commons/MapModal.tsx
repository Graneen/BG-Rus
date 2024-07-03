
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import dateRedactor from '../services/dateRedactor';
import { useState } from 'react';

interface MapModalProps {
  mapModal: boolean;
  setMapModal: (value: React.SetStateAction<boolean>) => void;
  meetModal: GameMeetModalType; 
}

interface GameMeetModalType {
  game_id: number;
  gameName: string;
  maxPlayers: number;
  location: string;
  img: string;
  place: number[];
  date: Date;
  time: string;
  name: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#0B1D26ff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function MapModal({ mapModal,setMapModal, meetModal }: MapModalProps) {
  const [open, setOpen] = useState(mapModal);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false); 
    setMapModal(false); 
  };


  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className=" group relative p-4">
              <button onClick={() => navigate(`/game/${meetModal.game_id}`)} className="aspec t-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
              <div className="text-3xl rounded-lg m-2 shadow-md p-2 bg-[orange] text-[black] absolute bg-white">{dateRedactor(meetModal.date)}</div>
                <img
                  src={meetModal.img}
                  className="p-8 h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </button>
              <div className="mt-4 flex justify-between align-center">
                <div>
                  <h2 className="meetModal-title">
                    {meetModal.gameName}
                  </h2>
                  <p>Начало игры:{meetModal.time.slice(0, 5)}</p>
                  <div className="meetModal-descr pt-[1vh]">
                    <p> <strong>Место проведения: </strong> {meetModal.location}</p>
                    <p> <strong>Запланированное число участников: </strong>{meetModal.maxPlayers}</p>
                    <p> <strong>Организатор: </strong> {meetModal.name}</p>
                    <button className="w-full flex items-center justify-center mt-5 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Связаться с организаторами</button>
                  </div>
                </div>
              </div>

            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
