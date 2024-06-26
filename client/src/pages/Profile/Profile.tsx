import React, { useEffect, useState } from "react";
import { GameCampType } from "../../types/types";
import axios from "axios";

const Profile: React.FC = () => {
  const user = localStorage.getItem("user");
  const [userFavoriteGames, setUserFavoriteGames] = useState([]); //<GameCampType[]>
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
    <div>
      <h2>труляля</h2>
    </div>
  );
};

export default Profile;
