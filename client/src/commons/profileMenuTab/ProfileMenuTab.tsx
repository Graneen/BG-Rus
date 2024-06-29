import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./ProfileMenuTab.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  GameCard,
  userFeedbacks,
  userQuestionsAndAnswers,
} from "../../pages/Profile/Profile";
// import { selectFavoritesCard, takeFavorites, takeFavorite, getFavoriteStatus } from '../../features/addToFavoritesSlice';
// import FavoritesButton from '../../commons/FavoritesButton'
// import { useAppDispatch, useAppSelector } from '../../../src/hooks/redux'
// const dispatch = useAppDispatch();
// const user = localStorage.getItem("user");
// const takeTheFavorites = useAppSelector(selectFavoritesCard);

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
  userFavoriteGames: GameCard[];
  userFeedbacks: userFeedbacks[];
  userQuestionsAndAnswers: userQuestionsAndAnswers[];
  userRecommendedGames: GameCard[];
}) {
  const [value, setValue] = React.useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabStyler = {
    color: "var(--goldenbeer)",
    fontFamily: "ROSTOV",
    fontSize: "2.2em",
    textTransform: "capitalize",
  };

  function getImages(userRecommendedGame: GameCard) {
    return [
      userRecommendedGame.poster,
      userRecommendedGame.image1,
      userRecommendedGame.image2,
    ];
  }
  const [mainPhotoIndex, setMainPhotoIndex] = useState<number>(0);

  const handleMainPhotoClick = () => {
    if (mainPhotoIndex === 2) {
      setMainPhotoIndex(0);
    } else {
      setMainPhotoIndex(mainPhotoIndex + 1);
    }
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
        {userFavoriteGames&&userFavoriteGames.length?userFavoriteGames.map((userFavoriteGame) => (
          <div key={userFavoriteGame.id} className="profile-game-box">
            <div className="profile-block-guide">
              <h1 className="page-header">{userFavoriteGame.title}</h1>
              <NavLink to={`/game/${userFavoriteGame.id}`}>
                <button className="game-button-profile">Страница игры</button>
              </NavLink>
              <div>
                <div className="profile-image-descr-block">
                  <div className="card-left">
                    <div className="images-section">
                      <div
                        className="main-image image-bg rounded-lg"
                        onClick={handleMainPhotoClick}
                      >
                        <img
                          src={getImages(userFavoriteGame)[mainPhotoIndex]}
                          className="main-img"
                          alt="Заглавное изображение"
                        />
                      </div>
                      <div className="preview-images">
                        {getImages(userFavoriteGame).map((photo, index) => (
                          <div
                            key={index}
                            className={
                              mainPhotoIndex === index
                                ? `profile-active-prev-img rounded-lg  image-bg`
                                : `image-bg rounded-lg`
                            }
                          >
                            <img
                              className="profile-preview-image"
                              src={photo}
                              alt={`Альтернативное изображение ${index}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="card-right">
                    <p>Жанр: {userFavoriteGame.genre}</p>
                    <p>Тематика: {userFavoriteGame.theme}</p>
                    <p>Авторы: {userFavoriteGame.author}</p>
                    <p>Год создания: {userFavoriteGame.year}</p>
                    <p className="game-desc mb-6 text-gray-400 dark:text-gray-400">
                      {userFavoriteGame.description}
                    </p>
                    <p className="text-[#ffd700]">
                      Рейтинг сложности: {userFavoriteGame.difficulty}
                    </p>
                    <p className="text-[#ffd700]">
                      Возможное количество игроков: {userFavoriteGame.players}{" "}
                      чел.
                    </p>
                    <p className="text-[#ffd700]">
                      Среднее время игры: {userFavoriteGame.time}
                    </p>
                    {/* <FavoritesButton favorites={ (takeTheFavorites.statusFav.toggler) === true ? 1 : null }
                                                     handler={() => dispatch(takeFavorites({ user_id: user, game_id: userRecommendedGame.id, toggler: true}))}/> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )):null}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="recom-head-block" ><h2 className="recom-head-block-h2">Мы выбираем случайные 10 игр на основании ваших предпочтений</h2>
        <NavLink to="/quiz">
          <button className="quiz-button">Изменить выборку игр</button>
        </NavLink></div>
        
        {userRecommendedGames&&userRecommendedGames.length?userRecommendedGames.map((userRecommendedGame) => (
          <div key={userRecommendedGame.id} className="profile-game-box">
            <div className="profile-block-guide">
              <h1 className="page-header">{userRecommendedGame.title}</h1>
              <NavLink to={`/game/${userRecommendedGame.id}`}>
                <button className="game-button-profile">Страница игры</button>
              </NavLink>
              <div>
                <div className="profile-image-descr-block">
                  <div className="card-left">
                    <div className="images-section">
                      <div
                        className="main-image image-bg rounded-lg"
                        onClick={handleMainPhotoClick}
                      >
                        <img
                          src={getImages(userRecommendedGame)[mainPhotoIndex]}
                          className="main-img"
                          alt="Заглавное изображение"
                        />
                      </div>
                      <div className="preview-images">
                        {getImages(userRecommendedGame).map((photo, index) => (
                          <div
                            key={index}
                            className={
                              mainPhotoIndex === index
                                ? `profile-active-prev-img rounded-lg  image-bg`
                                : `image-bg rounded-lg`
                            }
                          >
                            <img
                              className="profile-preview-image"
                              src={photo}
                              alt={`Альтернативное изображение ${index}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="card-right">
                    <p>Жанр: {userRecommendedGame.genre}</p>
                    <p>Тематика: {userRecommendedGame.theme}</p>
                    <p>Авторы: {userRecommendedGame.author}</p>
                    <p>Год создания: {userRecommendedGame.year}</p>
                    <p className="game-desc mb-6 text-gray-400 dark:text-gray-400">
                      {userRecommendedGame.description}
                    </p>
                    <p className="text-[#ffd700]">
                      Рейтинг сложности: {userRecommendedGame.difficulty}
                    </p>
                    <p className="text-[#ffd700]">
                      Возможное количество игроков:{" "}
                      {userRecommendedGame.players} чел.
                    </p>
                    <p className="text-[#ffd700]">
                      Среднее время игры: {userRecommendedGame.time}
                    </p>
                    {/* <FavoritesButton favorites={ (takeTheFavorites.statusFav.toggler) === true ? 1 : null }
                                                     handler={() => dispatch(takeFavorites({ user_id: user, game_id: userRecommendedGame.id, toggler: true}))}/> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )):null}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {userFeedbacks&&userFeedbacks.length?userFeedbacks.map((userFeedback) => (
          <div key={userFeedback.game_id} className="meeting-camp-box">
            <NavLink to={`/game/${userFeedback.game_id}`}>
              <h2 className="h2-profile">Игра: {userFeedback.BoardGame.title}</h2>
            </NavLink>
            <p>
              {" "}
              <h3>Ваш отзыв:</h3> {userFeedback.description}
            </p>
          </div>
        )):null}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {userQuestionsAndAnswers&&userQuestionsAndAnswers.length?userQuestionsAndAnswers.map((userQuestionAndAnswers) => (
          <div
            key={userQuestionAndAnswers.game_id}
            className="meeting-camp-box"
          >
            <NavLink to={`/game/${userQuestionAndAnswers.game_id}`}>
              <h2 className="h2-profile" >Игра: {userQuestionAndAnswers.game}</h2>
            </NavLink>
            <p>Ваш вопрос: {userQuestionAndAnswers.questions[0].question}</p>
            {userQuestionAndAnswers.questions[0].answers.map(
              (answer, index) => (
                <p key={index}>Ответ: {answer}</p>
              )
            )}
          </div>
        )):null}
      </CustomTabPanel>
    </Box>
  );
}
