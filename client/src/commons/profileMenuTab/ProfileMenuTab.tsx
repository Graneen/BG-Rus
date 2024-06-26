import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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
  userRecommendedGames
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
          <Tab sx={tabStyler} label="Рекомендованные игры" {...a11yProps(1)} />
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
      {userRecommendedGames.map((userRecommendedGame) => (
          <div className="meeting-camp-box">
            <h2>Игра: {userRecommendedGame.title}</h2>
            <p>Описание: {userRecommendedGame.description}</p>
            <p>Время игры: {userRecommendedGame.time}</p>
          </div>
        ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {userFeedbacks.map((userFeedback) => (
          <div className="meeting-camp-box">
            <h2>Игра: {userFeedback.BoardGame.title}</h2>
            <p>
              {" "}
              <h3>Ваш отзыв:</h3> {userFeedback.description}
            </p>
          </div>
        ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {userQuestionsAndAnswers.map((userQuestionAndAnswers) => (
          <div className="meeting-camp-box">
            <h2>Игра: {userQuestionAndAnswers.game}</h2>
            <p>Ваш вопрос: {userQuestionAndAnswers.questions[0].question}</p>
            {userQuestionAndAnswers.questions[0].answers.map((answer) => (
              <p>-{answer}</p>
            ))}
          </div>
        ))}
      </CustomTabPanel>
    </Box>
  );
}
