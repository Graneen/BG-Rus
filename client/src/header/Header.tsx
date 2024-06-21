import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../app/App.tsx';


import './Header.css'
import SearchInput from '../commons/SearchInput.tsx';
import UserIcon from '../commons/UserIcon.tsx';
import { getCookie } from '../services/Cookie/getCookie.ts';
import { deleteAllCookies } from '../services/Cookie/deleteCookie.ts';

function Header(): JSX.Element {
    const { user, setUser } = useContext(AuthContext);

    async function logoutHandler(): Promise<void> {
        try {
            const token: string = getCookie();
            const response = await fetch('http://localhost:3000/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ token }),
            })
            console.log(response.status)
            if (response.ok) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setUser(null)

                deleteAllCookies();
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log({ ERRRRROR: error });
        }
    }


    return (
        <header>
            <div className="header_content">
            <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? "logo active" : "logo unactive"}
                    >
                        BGRUS
                    </NavLink>
                <nav>
                    <NavLink
                        to="/top"
                        className={({ isActive }) => isActive ? "nav_link active" : "nav_link unactive"}
                    >
                        ТОП-100
                    </NavLink>
                    <NavLink
                        to="/events"
                        className={({ isActive }) => isActive ? "nav_link active" : "nav_link unactive"}
                    >
                        Мероприятия
                    </NavLink>
                    <NavLink
                        to="/ads"
                        className={({ isActive }) => isActive ? "nav_link active" : "nav_link unactive"}
                    >
                        Объявления
                    </NavLink>
                    <SearchInput/>
                </nav>
                <div className="account">
                    <div className="account_icon">
                            <UserIcon/>
                    </div>
                    <div className="account_text">  {
                        user ? 
                        <button onClick={logoutHandler}>Выйти</button>
                        :
                        <NavLink to="/login" className={({ isActive }) => isActive ? "active" : "unactive"}>
                        Войти
                        </NavLink>
                    }

                    </div>
                </div>
            </div>
        </header>
    );
}
export default Header;