import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../app/App.tsx';


import './Header.css'
import SearchInput from '../commons/SearchInput.tsx';
import UserIcon from '../commons/UserIcon.tsx';

function Header(): JSX.Element {
    const { user, setUser } = useContext(AuthContext);



    async function logoutHandler() {
        try {
            const response = await fetch('http://localhost:3000/auth/logout', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })
            console.log(response.status)
            if (response.ok) {
                localStorage.removeItem("user");
                setUser(null)
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