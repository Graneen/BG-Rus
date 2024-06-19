import { useState, useContext } from 'react';
import { AuthContext } from "../app/App";


import "./Login.css"
import { useNavigate } from 'react-router-dom';


function LoginForm(): JSX.Element {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
    if (response.ok) {
      const userData = await response.json();
      setUser(userData.userId)
      localStorage.setItem('user', userData.userId)
      navigate('/');
    }
    else {
      const userData = await response.json();
      console.log(userData)
      alert('Ничего не вышло!')
    }
  }

  return (
    <>

      <div >
        <h2>
          Введите данные для входа
        </h2>
        <form className="login-flex" onSubmit={handleSubmit}>

          <label htmlFor="email">
            Email
          </label>
          <input
            value={email} onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />

          <label htmlFor="password">
            Пароль
          </label>
          <input
            value={password} onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <button
            type="submit"
          >
            Войти
          </button>
        </form>

        <p>
          Еще не зарегистрированы?{' '}
          <a onClick={() => navigate('/register')}>
            Зарегистрироваться
          </a>
        </p>
      </div>
    </>
  )
}

export default LoginForm;