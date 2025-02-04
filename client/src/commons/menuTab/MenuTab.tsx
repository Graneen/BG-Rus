import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { boardGameState, feedBack } from '../../features/gameCardSlice';
import QAComponent from './QA/QAComponent';
import axios from 'axios';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanelStyles = {
  maxHeight: '300px',
};


function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={CustomTabPanelStyles}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MenuTab({card, updateGameCardState,}: {card: boardGameState;updateGameCardState: (updatedCard: boardGameState) => void;}) {
  const [value, setValue] = React.useState(0);
  const [reviews, setReviews] = React.useState<feedBack[]>([]);
  const [newReview, setNewReview] = React.useState('');
  const user = localStorage.getItem('user');


  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabStyler = {
    color: 'var(--goldenbeer)',
    fontFamily: 'ROSTOV',
    fontSize: '2.2em',
    textTransform: 'capitalize',
  };

  const submitReview = async () => {
    if (newReview.trim() !== '') {
      if (user) {
        try {
          const newFeedback = {
            user_id: user,
            game_id: card.list.boardGame.id,
            description: newReview,
          };
          const response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_API_URL}/feedbacks`,
            newFeedback
          );
          const newReviewData: feedBack = {
            id: response.data.feedback.id,
            user_id: response.data.feedback.user_id,
            userName: response.data.userName,
            game_id: response.data.feedback.game_id,
            description: response.data.feedback.description,
            createdAt: response.data.feedback.createdAt,
            updatedAt: response.data.feedback.updatedAt,
          }; 
          setNewReview('');
          
          setReviews([newReviewData, ...reviews]);
          const updatedReviews = [...reviews, newReviewData];
          
          
          updateGameCardState({
            ...card,
            list: {
              ...card.list,
              feedBackGame: updatedReviews,
            },
          });
          
         
        } catch (error) {
          console.error('Error submitting review:', error);
        }
      } else {
        console.error('User data not found in localStorage');
      }
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/feedbacks/${card.list.boardGame.id}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  React.useEffect(() => {
  fetchReviews();
}, [card.list.boardGame.id]);

  const filteredReviews = reviews.filter((review) => review.game_id === card.list.boardGame.id);

  

    return (
      <Box sx={{ width: '100%',  marginTop: '-200px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
          <Tab sx={tabStyler} label="Видеообзор" {...a11yProps(0)} />
          <Tab sx={tabStyler} {...a11yProps(0)} label="Отзывы" {...a11yProps(1)} />
          <Tab sx={tabStyler} label="Вопрос-ответ" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <iframe
          className="w-[80%] h-[60vh] ml-6"
          src={`https://www.youtube.com/embed/${card.list.boardGame.video.slice(17)}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div >
        <p className="text-white font-bold">В этом разделе любой пользователь нашего сайта может оставить свой отзыв об игре, не ограничивая себя:</p>
          <input
            type="text"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Оставьте отзыв"
            className="border border-gray-300 rounded-md p-2 w-full text-black mb-2 mr-10 max-w-[300px]"
          />
          <button
            onClick={submitReview}
            className="bg-white text-black font-semibold py-2 px-4 rounded-lg mt-6"
          >
            Оставить отзыв
          </button>
        </div>
        
        {filteredReviews.length > 0 ? (
          <div style={{maxHeight: "430px", overflow: "auto"}}>
           {filteredReviews.map((el) => (
          <div key={el.id} className="mb-8">
            <div className="mt-8">
              <h2 className="mr-2">Отзыв от {el.userName ? el.userName : 'Анонимный пользователь'}</h2>
            </div>
            <div className="bg-sky-500/50 p-2 rounded-lg max-w-[300px] overflow-hidden">
            <div className="whitespace-normal break-words">{el.description}</div>
            </div>
          </div>
        ))}
          </div>
        
      ) : (
      <p className="mt-10">Пока об этой игре нет отзывов. Будь первым!</p>
    )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div style={{ maxHeight: "500px", overflow: "auto" }}>
         <QAComponent gameId={card.list.boardGame.id} />
        </div>
      </CustomTabPanel>
    </Box>
  );
}