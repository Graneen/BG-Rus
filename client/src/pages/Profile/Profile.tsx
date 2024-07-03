import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import ProfileModal from "../../modal/modalUserData/modalUserData";
import { NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="mt-5 text-3xl text-[#ffd700]">ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ</h2>
          <div className="w-3/12 p-6 bg-[#FBD784] rounded-lg shadow dark:bg-gray-800 flex items-center flex-col justify-center">
            <p className="m-2 text-gray-700 dark:text-gray-400">Имя: <strong className="font-bold text-[#183d50bb] text-2xl">{currentUser.name}</strong></p>
            <p className="m-2 text-gray-700 dark:text-gray-400">Email: <strong className="font-bold text-[#183d50bb] text-2xl">{currentUser.email}</strong></p>
            <ProfileModal setCurrentUser={setCurrentUser} />
          </div>
          <h2 className="mt-10 text-3xl text-[#ffd700]">ЗАРЕГИСТРИРОВАН НА {userCamps.length} МЕРОПРИЯТИИ</h2>
          <div className="mb-10 w-3/12">
            {userCamps && userCamps.length ? (
              <>
                {userCamps.map((userCamp) => (
                  <div key={userCamp.id} className=" group relative p-4">
                    <button onClick={() => navigate(`/camps`)} className="aspec t-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src={userCamp.image1}
                        className="p-8 h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </button>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h2 className="game-title">
                          {userCamp.title}
                        </h2>
                        <div className="game-descr pt-[1vh]">
                          <p> <strong>Дата проведения: </strong> {userCamp.date.replace("T", " ").replace(".000Z", "")}</p>
                          <p>Место проведения: {userCamp.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  //   <div key={userCamp.id} className="meeting-camp-box">
                  //     <NavLink to="/camps">
                  //      <h2 className="h2-profile">{userCamp.title}</h2>
                  //     </NavLink>
                  //      <img src={userCamp.image1}></img>
                  //     <p>
                  //       Дата проведения:{" "}
                  //       {userCamp.date.replace("T", " ").replace(".000Z", "")}
                  //     </p>{" "}
                  //     <p>Место проведения: {userCamp.location}</p>
                  //  </div>
                ))}
              </>
            ) : null}
                          <div className="middle-block-data">
                {userMeetings && userMeetings.length ? (
                  <>
                    <h2 className="h2-profile">
                      Вы зарегитсрированы на игротеки:
                    </h2>
                    {userMeetings.map((userMeeting) => (
                      <div key={userMeeting.id} className="meeting-camp-box">
                        <NavLink to="/events">
                          <h2 className="h2-profile">{userMeeting.gameName}</h2>
                        </NavLink>
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
