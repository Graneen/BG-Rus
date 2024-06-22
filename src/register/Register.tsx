import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../app/App";

import "./Register.css"

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
<div className="register-container">
<div className="register-form">
    <h2 >
      Введите данные для регистрации
    </h2>
    <form className="register-flex" onSubmit={handleSubmit}>
    <label htmlFor="name">Name</label>
    <input
          value={name} onChange={(e) => setName(e.target.value)} 
            className="text-black"
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
          />
    <label htmlFor="email">Email</label>
    <input
          value={email} onChange={(e) => setEmail(e.target.value)} 
            className="text-black"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <label htmlFor="password">Пароль</label>
          <input
            value={password} onChange={(e) => setPassword(e.target.value)} 
            className="text-black"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            
          />
        <button
          type="submit"
          
        >
          Зарегистрироваться и войти
        </button>
    </form>
    <p>
      Уже зарегистрированы?{' '}
      <a onClick={() => navigate('/login')}>
        Войти
      </a>
    </p>
</div>
</div>
)


}

export default RegisterForm 