import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BuyerPage() {
  const [specialists, setSpecialists] = useState([]);
  const [gameTitle, setGameTitle] = useState('');
  const [yourName, setYourName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/specialists')
      .then(response => {
        setSpecialists(response.data);
      })
      .catch(error => {
        console.error('Error fetching specialists:', error);
      });
  }, []);

  const handleAddAdvertisement = (event) => {
    event.preventDefault();
    
    console.log('Game Title:', gameTitle);
    console.log('Your Name:', yourName);
  }

  return (
    <>
      <h1>Наши Специалисты</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {specialists.map(specialist => (
          <div key={specialist.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px', width: '300px' }}>
            <img src={specialist.photo} alt={specialist.firstName} style={{ width: '100%', height: 'auto' }}/>
            <p>{`${specialist.firstName} ${specialist.lastName}`}</p>
            <p>{specialist.country}</p>
            <button>Воспользоваться услугами</button>
          </div>
        ))}
      </div>

      <h2>Добавить объявление</h2>
      <form onSubmit={handleAddAdvertisement}>
        <label>
          Название игры:
          <input type="text" value={gameTitle} onChange={(e) => setGameTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Ваше имя:
          <input type="text" value={yourName} onChange={(e) => setYourName(e.target.value)} />
        </label>
        <br />
        <button type="submit">Добавить объявление</button>
      </form>
    </>
  );
}

export default BuyerPage;