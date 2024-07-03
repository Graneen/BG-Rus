import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../app/App.tsx";

import "./Header.css";
import UserIcon from "../commons/UserIcon.tsx";
import DropDown from "../commons/DropDown.tsx";
import logout from "../services/checkAuthService/logout.service.ts";
import Search from '../commons/SearchHeader/SearchHeader.tsx';

function Header(): JSX.Element {
  const { user, setUser } = useContext(AuthContext);

  function logoutHandler(): void {
    try {
      logout();
      setUser(null);
    } catch (error) {
      console.log({ ERRRRROR: error });
    }
  }

  return (
    <header>
      <div className="header_content">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "logo active" : "logo unactive"
          }
        >
          BGRUS
        </NavLink>
        <nav>
          <NavLink
            to="/top"
            className={({ isActive }) =>
              isActive ? "nav_link active" : "nav_link unactive"
            }
          >
            ТОП-100
          </NavLink>
          <DropDown
            item={{
              name: "Мероприятия",
              catFirst: "Игротеки",
              catTwo: "Игрокэмпы",
              linkOne: "/events",
              linkTwo: "/camps",
            }}
          ></DropDown>
          <DropDown
            item={{
              name: "Объявления",
              catFirst: "Байеры",
              catTwo: "Локализации",
              linkOne: "/buyers",
              linkTwo: "/localisations",
            }}
          ></DropDown>
        </nav>
        <div className="flex flex-row items-center gap-x-4">
          {user ? <Search/> : <></>}
          <div className="account_icon">
            {user?
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav_link active" : "nav_link unactive"
              }
            >
              <UserIcon />
            </NavLink>:null}
          </div>
          <div className="account">
            <div className="account_text">
              {" "}
              {user ? (
                <button onClick={logoutHandler}>Выйти</button>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "active" : "unactive")}
                >
                  Войти
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
