import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../app/App";

import "./Register.css"
import Models3D from '../commons/Models3D';

function RegisterForm(): JSX.Element {
  const { setUser } = useContext(AuthContext);
  console.log(setUser)
    const [name, setName] = useState ('');
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const navigate = useNavigate();

    async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const response = await fetch ('http://localhost:3000/auth/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password})
        })     
    if (response.ok) {
      const {userId, token} = await response.json();
      setUser(userId);
      localStorage.setItem('token', token);
      localStorage.setItem('user', userId);
      navigate('/');
  }
  else {
    alert ('Ничего не вышло!')
  }
}
return (
  <>
  <div className="canvas-container">
  <Models3D className="models-3d"/>
</div>
<div className="login-container">
  <div className="register-form bg-black-100 p-2 flex justify-center items-center h-screen">
    <div className="bg-yellow-300 p-8 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-black text-2xl font-bold mb-4">
        Введите данные для регистрации
      </h2>
      <form className="register-flex" onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-black block">
          Имя
        </label>
        <input
          value={name} onChange={(e) => setName(e.target.value)} 
          className="text-black border-b-2 border-black w-full mt-2 py-3 px-4"
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
        />
        <label htmlFor="email" className="text-black block mt-4">
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
        <label htmlFor="password" className="text-black block mt-4">
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
          Зарегистрироваться и войти
        </button>
      </form>
      <p className="text-black mt-4">
        Уже зарегистрированы?{' '}
        <a onClick={() => navigate('/login')} className="text-black font-bold hover:underline cursor-pointer">
          Войти
        </a>
      </p>
    </div>
  </div>
  </div>
  </>
);

}

export default RegisterForm;