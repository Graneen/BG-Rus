import { useState, useContext } from 'react';
import { AuthContext } from "../app/App";


import "./Login.css"
import { useNavigate } from 'react-router-dom';
import Models3D from '../commons/Models3D';


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
      const {userId, token} = await response.json();
      setUser(userId);
      localStorage.setItem('token', token);
      localStorage.setItem('user', userId);
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
    <div className="canvas-container">
          <Models3D className="models-3d"/>
        </div>
      <div className="login-container">
     
      <div className="login-form bg-yellow-100 p-8 rounded-lg shadow-md mt-20 max-w-md">
          <h2 className="text-black text-2xl font-bold mb-4 w-150">
            Введите данные для входа
          </h2>
          <form className="login-flex" onSubmit={handleSubmit}>
  
            <label htmlFor="email" className="text-black">
              Email
            </label>
            <input
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="text-black border-b-2 border-black w-full mt-2 py-3 px-4"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
  
            <label htmlFor="password" className="text-black mt-4">
              Пароль
            </label>
            <input
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="text-black border-b-2 border-black w-full mt-2 py-3 px-4"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
            <button
              type="submit"
              className="bg-black text-yellow-200 py-2 px-4 mt-4 rounded-md"
            >
              Войти
            </button>
          </form>
  
          <p className="text-black mt-4">
            Еще не зарегистрированы?{' '}
            <a onClick={() => navigate('/register')} className="text-black font-bold hover:underline cursor-pointer">
              Зарегистрироваться
            </a>
          </p>
        </div>
        
      </div>
    </>
  )
}

export default LoginForm;