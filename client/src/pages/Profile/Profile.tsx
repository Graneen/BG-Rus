import React, { useEffect, useState } from "react";

import axios from "axios";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MenuTab from '../../commons/profileMenuTab/ProfileMenuTab'

const Profile: React.FC = () => {
  const user = localStorage.getItem("user");
  const [userFavoriteGames, setUserFavoriteGames] = useState([]);
  const [userFeedbacks, setUserFeedbacks] = useState([]);
  const [userQuestionsAndAnswers, setUserQuestionsAndAnswers] = useState([]);
  const [userMeetings, setUserMeetings] = useState([]);
  const [userCamps, setUserCamps] = useState([]);

  useEffect(() => {
    const profileData = async () => {
      try {
        const response = await axios(
          `${import.meta.env.VITE_REACT_APP_API_URL}/profile/${user}`
        );
        if (response.status === 200) {
          console.log("response.data", response.data);

          setUserFavoriteGames(response.data.favoriteGames);
          setUserFeedbacks(response.data.feedbacks);
          setUserQuestionsAndAnswers(response.data.questionsAndAnswers);
          setUserMeetings(response.data.userMeetings);
          setUserCamps(response.data.userCamps);
        } else {
          console.error("Ошибка при получении данных");
        }
      } catch (error) {
        console.error(error);
      }
    };
    profileData();
  }, []);

  // console.log("---userFavoriteGame---", userFavoriteGames);
  // console.log("---userFeedbacks---", userFeedbacks);
  // console.log("---userQuestionsAndAnswers---", userQuestionsAndAnswers);
  // console.log("---userMeetings---", userMeetings);
  // console.log("---userCamps---", userCamps);

  return (
    <section className="block-guide">
    <MenuTab card={card} />
</section>
  );
};

export default Profile;
