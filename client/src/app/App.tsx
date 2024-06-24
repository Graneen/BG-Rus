import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext, useEffect } from 'react';
import { User, AuthState, defaultAuthState } from '../types/types.ts';

import './App.css';

import Layout from '../layouts/Layout.tsx';
import Login from '../login/Login.tsx';
import Register from '../register/Register.tsx';
import MainPage from "../pages/mainPage/mainPage.tsx";
import TopList from "../pages/topList/TopList.tsx";
import GamePage from "../pages/gamePage/gamePage.tsx";
import GameMeet from "../pages/gameMeet/GameMeet.tsx";
import GameCamp from "../pages/gameCamp/GameCamp.tsx";
import { checkAuth } from '../services/checkAuthService/checkAuth.service';

import BuyerPage from "../pages/buyerPage/buyerPage.tsx";
import LocalisationPage from "../pages/localisationPage/localisationPage.tsx";
import QuizPage from "../pages/QuizPage/QuizPage.tsx";


 
export const AuthContext = createContext<AuthState>(defaultAuthState);



function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, [])


  return (
    <>
     <AuthContext.Provider value={{user, setUser}}>
     <Router>
      <Routes>
          <Route path='/' element={<Layout/>}>
          <Route path={"/"} element={<MainPage/>}/>
            <Route path={"login"} element={<Login />} />
            <Route path={"register"} element={<Register/>} />
            <Route path={"top"} element={<TopList/>} />
            <Route path={"game/:id"} element={<GamePage/>}/>
            <Route path={"events"} element={<GameMeet/>}/>
            <Route path={"camps"} element={<GameCamp/>}/>

            <Route path={"buyers"} element={<BuyerPage/>}/>
            <Route path={"localisations"} element={<LocalisationPage/>}/>
            <Route path={"quiz"} element={<QuizPage/>}/>

          </Route>
      </Routes>
      </Router>
      </AuthContext.Provider>
    </>
  )
}

export default App
