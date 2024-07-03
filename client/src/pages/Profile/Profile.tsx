import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import ProfileModal from "../../modal/modalUserData/modalUserData";
import { NavLink } from "react-router-dom";
import ProfileMenuTab from "../../commons/profileMenuTab/ProfileMenuTab";

export interface User {
  name: string;
  email: string;
}
export interface userMeeting {
  id: number;
  game_id: number;
  gameName: string;
  maxPlayers: number;
  location: string;
  date: string;
}

export interface userCamps {
  id: number;
  title: string;
  location: string;
  date: string;
  image1: string;
}

export interface BoardGame {
  title: string;
}

export interface userFeedbacks {
  BoardGame: BoardGame;
  description: string;
  game_id: number;
}
export interface question {
  answers: string[];
  question: string;
}
export interface userQuestionsAndAnswers {
  game: string;
  game_id: number;
  questions: question[];
}
export interface GameCard {
  id: number;
  poster: string;
  image1: string;
  image2: string;
  video: string;
  title: string;
  genre: string;
  theme: string;
  year: string;
  author: string;
  description: string;
  difficulty: string;
  players: string;
  minPlayers: number;
  maxPlayers: number;
  time: string;
}
const Profile: React.FC = () => {
  const user = localStorage.getItem("user");
  const [userFavoriteGames, setUserFavoriteGames] = useState<GameCard[]>([]);
  const [userFeedbacks, setUserFeedbacks] = useState<userFeedbacks[]>([]);
  const [userQuestionsAndAnswers, setUserQuestionsAndAnswers] = useState<
    userQuestionsAndAnswers[]
  >([]);
  const [userRecommendedGames, setUserRecommendedGames] = useState<GameCard[]>(
    []
  );

  const [userMeetings, setUserMeetings] = useState<userMeeting[]>([]);
  const [userCamps, setUserCamps] = useState<userCamps[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
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
      {currentUser ? (
        <div className="profile-page-container">
          <div>
            <div className="upper-block">
              <h2 className="h2-profile">Данные пользователя:</h2>
              <p>Имя: {currentUser.name}</p>
              <p>Email: {currentUser.email}</p>
              <ProfileModal setCurrentUser={setCurrentUser} />
            </div>
            <div className="middle-block">
              <div className="middle-block-data">
                {userMeetings && userMeetings.length ? (
                  <>
                    <h2 className="h2-profile">
                      Вы зарегитсрированы на игротеки:
                    </h2>
                    {userMeetings.map((userMeeting) => (
                      <div key={userMeeting.id} className="meeting-camp-box">
                        <h2 className="h2-profile">{userMeeting.gameName}</h2>
                        <p>
                          Дата проведения:{" "}
                          {userMeeting.date
                            .replace("T", " ")
                            .replace(".000Z", "")}
                        </p>{" "}
                        <p>Место проведения: {userMeeting.location}</p>
                      </div>
                    ))}
                  </>
                ) : null}
              </div>
              <div className="middle-block-data">
                {userCamps && userCamps.length ? (
                  <>
                    <h2 className="h2-profile">
                      Вы зарегитсрированы на игрокемпы:
                    </h2>
                    {userCamps.map((userCamp) => (
                      <div key={userCamp.id} className="meeting-camp-box">
                        <NavLink to="/camps">
                          <h2 className="h2-profile">{userCamp.title}</h2>
                        </NavLink>
                        <img src={userCamp.image1}></img>
                        <p>
                          Дата проведения:{" "}
                          {userCamp.date.replace("T", " ").replace(".000Z", "")}
                        </p>{" "}
                        <p>Место проведения: {userCamp.location}</p>
                      </div>
                    ))}
                  </>
                ) : null}
              </div>
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
