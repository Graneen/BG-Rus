import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./ProfileMenuTab.css";
import { NavLink } from "react-router-dom";
import {
  userFavoriteGames,
  userFeedbacks,
  userQuestionsAndAnswers,
  userRecommendedGames,
} from "../../pages/Profile/Profile";

import { selectFavoritesCard, takeFavorites, takeFavorite, getFavoriteStatus } from '../../features/addToFavoritesSlice';

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProfileMenuTab({
  userFavoriteGames,
  userFeedbacks,
  userQuestionsAndAnswers,
  userRecommendedGames,
}: {
  userFavoriteGames: userFavoriteGames[];
  userFeedbacks: userFeedbacks[];
  userQuestionsAndAnswers: userQuestionsAndAnswers[];
  userRecommendedGames: userRecommendedGames[];
}) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabStyler = {
    color: "var(--goldenbeer)",
    fontFamily: "ROSTOV",
    fontSize: "2.2em",
    textTransform: "capitalize",
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
          <Tab sx={tabStyler} label="Избранные игры" {...a11yProps(0)} />
          <Tab
            sx={tabStyler}
            label="Рекомендованные сегодня игры"
            {...a11yProps(1)}
          />
          <Tab sx={tabStyler} label="Мои отзывы" {...a11yProps(2)} />
          <Tab sx={tabStyler} label="Мои вопросы" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {userFavoriteGames.map((userFavoriteGame) => (
          <div className="meeting-camp-box">
            <h2>название: {userFavoriteGame.title}</h2>
            <p>Количество игроков: {userFavoriteGame.players}</p>
            <p>Время игры: {userFavoriteGame.time}</p>
          </div>
        ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <h2>Мы выбираем случайные 10 игр на основании ваших предпочтений</h2>
        <NavLink to="/quiz">
          <button className="quiz-button">Изменить выборку игр</button>
        </NavLink>
        {userRecommendedGames.map((userRecommendedGame) => (
          <div key={userRecommendedGame.id} className="meeting-camp-box">
//////////////////////////////////////////////////////////////////////------------------------------------------------------
<div className="block-guide">
                        <h1 className='page-header'>{card.list.boardGame.title}</h1>
                        <div>
                            <div className="image-descr-block">
                                <div className="card-left">
                                    <div className="images-section">
                                        <div className="main-image image-bg rounded-lg" onClick={handleMainPhotoClick}>
                                            <img src={photos[mainPhotoIndex]} className="main-img" alt="Заглавное изображение" />
                                        </div>
                                        <div className="preview-images">
                                            {photos.map((photo, index) => (
                                                <div className={mainPhotoIndex === index ? `active-prev-img rounded-lg  image-bg` : `image-bg rounded-lg`}>
                                                    <img key={index} className="preview-image" src={photo} alt={`Альтернативное изображение ${index}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-right">
                                    <div className="stars-container">
                                        Рейтинг: {estimation && estimation > 0 ? card.list.estimationGame.map(() => <StarIcon />) : ''} <StarIcon />

                                        <p>{estimation > 0 ? `${estimation} (на основании ${card.list.estimationGame.length} оценок)` : 'Нет оценок' }</p>
                                    </div>
                                    <p>Жанр: {card.list.boardGame.genre}</p>
                                    <p>Тематика: {card.list.boardGame.theme}</p>
                                    <p>Авторы: {card.list.boardGame.author}</p>
                                    <p>Год создания: {card.list.boardGame.year}</p>
                                    <p className="game-desc mb-6 text-gray-400 dark:text-gray-400">
                                        {card.list.boardGame.description}
                                    </p>
                                    <FavoritesButton favorites={ (takeTheFavorites.statusFav.toggler) === true ? 1 : null }
                                                     handler={() => dispatch(takeFavorites({ id: id, user_id: user, toggler: true}))}/>

                                </div>
                            </div>
                        </div>
                    </div>
/////////////////////////////////////////////////////////////////////////////////---------------------------------------------------------------
          </div>
        ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {userFeedbacks.map((userFeedback) => (
          <div key={userFeedback.game_id} className="meeting-camp-box">
            <NavLink to={`/game/${userFeedback.game_id}`}>
              <h2>Игра: {userFeedback.BoardGame.title}</h2>
            </NavLink>
            <p>
              {" "}
              <h3>Ваш отзыв:</h3> {userFeedback.description}
            </p>
          </div>
        ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {userQuestionsAndAnswers.map((userQuestionAndAnswers) => (
          <div
            key={userQuestionAndAnswers.game_id}
            className="meeting-camp-box"
          >
            <NavLink to={`/game/${userQuestionAndAnswers.game_id}`}>
              <h2>Игра: {userQuestionAndAnswers.game}</h2>
            </NavLink>
            <p>Ваш вопрос: {userQuestionAndAnswers.questions[0].question}</p>
            {userQuestionAndAnswers.questions[0].answers.map(
              (answer, index) => (
                <p key={index}>Ответ: {answer}</p>
              )
            )}
          </div>
        ))}
      </CustomTabPanel>
    </Box>
  );
}
