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

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
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

export default function MenuTab({
  card,
  updateGameCardState,
}: {
  card: boardGameState;
  updateGameCardState: (updatedCard: boardGameState) => void;
}) {
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

          console.log(newFeedback);

          const response = await axios.post(
            'http://localhost:3000/api/feedbacks',
            newFeedback
          );
          const newReviewData: feedBack = {
            id: response.data.id,
            user_id: response.data.user_id,
            game_id: response.data.game_id,
            description: response.data.description,
            createdAt: response.data.createdAt,
            updatedAt: response.data.updatedAt,
          };
          setReviews([...reviews, newReviewData]);
          updateGameCardState({
            ...card,
            list: {
              ...card.list,
              feedBackGame: [...card.list.feedBackGame, newReviewData],
            },
          });
          console.log(response, 'FEEDBACKS');
          setNewReview('');
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
      const response = await axios.get(
        `http://localhost:3000/api/feedbacks/${card.list.boardGame.id}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  React.useEffect(() => {
    fetchReviews();
  }, [card.list.boardGame.id]);
    

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
                    <Tab sx={tabStyler} label="Видеообзор" {...a11yProps(0)} />
                    <Tab sx={tabStyler} {...a11yProps(0)} label="Отзывы" {...a11yProps(1)} />
                    <Tab sx={tabStyler} label="Вопрос-ответ" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <iframe className="w-full h-[70vh]" src={`https://www.youtube.com/embed/${card.list.boardGame.video.slice(17)}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                </iframe>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
            {reviews.length > 0 ? reviews.map((el: feedBack, i: number) => (
  <div key={i}>
    <h2>Отзыв №{i + 1} от {el.User ? el.User.name : 'Анонимный пользователь'}</h2>
    <div className="my-[5vh] bg-sky-500/50 p-5 rounded-lg">
      {el.description}
    </div>
  </div>
)) : <div>Никто пока не писал отзывов на эту игру, будьте первым!</div>}
        <div>
            <input
            type="text"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Оставьте отзыв"
            className="border border-gray-300 rounded-md p-2 w-full text-black"
            />
            <button
            onClick={submitReview}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
            >
            Оставить отзыв
            </button>
        </div>
        </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
            <QAComponent gameId={card.list.boardGame.id} />
        </CustomTabPanel>
        </Box>
    );
}