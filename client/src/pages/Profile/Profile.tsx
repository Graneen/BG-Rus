import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";

import ProfileMenuTab from "../../commons/profileMenuTab/ProfileMenuTab";

const Profile: React.FC = () => {
  const user = localStorage.getItem("user");
  const [userFavoriteGames, setUserFavoriteGames] = useState([]);
  const [userFeedbacks, setUserFeedbacks] = useState([]);
  const [userQuestionsAndAnswers, setUserQuestionsAndAnswers] = useState([]);
  const [userRecommendedGames, setUserRecommendedGames] = useState([]);

  const [userMeetings, setUserMeetings] = useState([]);
  const [userCamps, setUserCamps] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const profileData = async () => {
      try {
        const response = await axios(
          `${import.meta.env.VITE_REACT_APP_API_URL}/profile/${user}`
        );
        if (response.status === 200) {
          setUserFavoriteGames(response.data.favoriteGames);
          setUserFeedbacks(response.data.feedbacks);
          setUserQuestionsAndAnswers(response.data.questionsAndAnswers);
          setUserMeetings(response.data.userMeetings);
          setUserCamps(response.data.userCamps);
          setCurrentUser(response.data.currentUser);
          setUserRecommendedGames(response.data.recommendedGames);
        } else {
          console.error("Ошибка при получении данных");
        }
      } catch (error) {
        console.error(error);
      }
    };
    profileData();
  }, []);
  return (
    <>
      {user ? (
        <div className="profile-page-container">
          <div className="upper-block">
            <h2>Данные пользователя:</h2>
            <p>Имя: {currentUser.name}</p>
            <p>Email: {currentUser.email}</p>
            <button>Изменить данные</button>
          </div>
          <div className="middle-block">
            <div>
              {userMeetings && userMeetings.length ? (
                <>
                  <h2>Вы зарегитсрированы на игротеки:</h2>
                  {userMeetings.map((userMeeting) => (
                    <div className="meeting-camp-box">
                      <h2>{userMeeting.gameName}</h2>
                      <p>
                        Дата проведения:{" "}
                        {userMeeting.date
                          .replace("T", " ")
                          .replace(".000Z", "")}
                      </p>
                      <p>Место проведения: {userMeeting.location}</p>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
            <div>
              {userCamps && userCamps.length ? (
                <>
                  <h2>Вы зарегитсрированы на игрокемпы:</h2>
                  {userCamps.map((userCamp) => (
                    <div className="meeting-camp-box">
                      <h2>{userCamp.title}</h2>
                      <p>
                        {userCamp.date.replace("T", " ").replace(".000Z", "")}
                      </p>
                      <p>{userCamp.location}</p>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          </div>
          <section className="block-guide">
            <ProfileMenuTab
              userFavoriteGames={userFavoriteGames}
              userFeedbacks={userFeedbacks}
              userQuestionsAndAnswers={userQuestionsAndAnswers}
              userRecommendedGames={userRecommendedGames}
            />
          </section>
        </div>
      ) : null}
    </>
  );
};

export default Profile;
