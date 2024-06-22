import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BayerPage.css';

interface Specialist {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
  country: string;
}

interface BayerOrder {
  id: number;
  name: string;
  nameboard: string;
}

interface Comment {
  id: number;
  text: string;
  User: {
    name: string;
  };
}

const BuyerPage: React.FC = () => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [allBayersOrders, setAllBayersOrders] = useState<BayerOrder[]>([]);
  const [gameTitle, setGameTitle] = useState('');
  const [yourName, setYourName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/specialists')
      .then(response => {
        setSpecialists(response.data);
      })
      .catch(error => {
        console.error('Error fetching specialists:', error);
      });

    axios.get('http://localhost:3000/allBayersOrders')
      .then(response => {
        setAllBayersOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching all Bayers Orders:', error);
      });
  }, []);

  const handleAddAdvertisement = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/bayerOrders', {
        name: yourName,
        nameboard: gameTitle
      });
      console.log('Advertisement created:', response.data);
    } catch (error) {
      console.error('Error creating advertisement:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/comments', {
        orderId: selectedOrderId,
        text: newCommentText
      });

      setComments(prevComments => ({
        ...prevComments,
        [selectedOrderId!]: [...(prevComments[selectedOrderId!] || []), response.data]
      }));
      
      setNewCommentText('');
      setShowCommentInput(false);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="main-container">
      <div className="specialists-container">
        <h1>Наши Специалисты</h1>
        {specialists.map((specialist) => (
          <div key={specialist.id} className="expert-card">
            <img src={specialist.photo} alt={specialist.firstName} />
            <div className="expert-details">
              <p>{`${specialist.firstName} ${specialist.lastName}`}</p>
              <p>{specialist.country}</p>
            </div>
            <button>Воспользоваться услугами</button>
          </div>
        ))}
      </div>

      <div className="center-content">
        <div className="add-advert-container">
          <h2>Добавить объявление</h2>
          <form className="advert-form" onSubmit={handleAddAdvertisement}>
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
        </div>

        <div className="bayer-orders-container">
          <h1>Все объявления</h1>
          {allBayersOrders.map((order) => (
            <div key={order.id} className="bayer-order-card">
              <p>Имя: {order.name}</p>
              <p>Название игры: {order.nameboard}</p>
              
              {showCommentInput && selectedOrderId === order.id && (
                <div>
                  <input type="text" value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} />
                  <button onClick={handleAddComment}>Добавить</button>
                </div>
              )}

              <button onClick={() => {
                setShowCommentInput(true);
                setSelectedOrderId(order.id);
              }}>Добавить комментарий</button>

              <div>
                {comments[order.id] && comments[order.id].map((comment) => (
                  <p key={comment.id}><strong>{comment.User.name}:</strong> {comment.text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerPage;