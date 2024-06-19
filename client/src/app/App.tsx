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

 
export const AuthContext = createContext<AuthState>(defaultAuthState);



function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    return setUser(localStorage.getItem('user'));
  }, [user])
  



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
          </Route>
      </Routes>
      </Router>
      </AuthContext.Provider>
    </>
  )
}

export default App
