import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './BayerPage.css';
import { BuyerProfile } from '../../commons/BuyerProfile';

export interface Specialist {
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
  userId: number;
  userName: string;
  text: string;
}

const BuyerPage: React.FC = () => {
  const user = localStorage.getItem("user");
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [allBayersOrders, setAllBayersOrders] = useState<BayerOrder[]>([]);
  const [gameTitle, setGameTitle] = useState('');
  const [yourName, setYourName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/specialists`)
      .then(response => {
        setSpecialists(response.data);
      })
      .catch(error => {
        console.error('Error fetching specialists:', error);
      });

    axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/allBayersOrders`)
      .then(response => {
        setAllBayersOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching all Bayers Orders:', error);
      });
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/bayer-orders/${selectedOrderId}/comments`);
        setComments(prevComments => ({
          ...prevComments,
          [selectedOrderId!]: response.data
        }));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (selectedOrderId) {
      fetchComments();
    }
  }, [selectedOrderId]);

  const handleAddAdvertisement = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
      console.error('User or user property is undefined');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/bayer-orders`, {
        userId: Number(user),
        name: yourName,
        nameboard: gameTitle
      });

      setAllBayersOrders(prevOrders => [...prevOrders, response.data]);
      setGameTitle('');
      setYourName('');
      console.log('Advertisement created:', response.data);
    } catch (error) {
      console.error('Error creating advertisement:', error);
    }
  };

  const handleAddComment = async () => {
    if (!user) {
      console.error('User or user property is undefined');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/bayer-orders/${selectedOrderId}/comments`, {
        userId: Number(user),
        comment: newCommentText
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

  const handleBookSpecialist = (specialistId: number) => {
    const selectedSpecialist = specialists.find((s) => s.id === specialistId);
    setSelectedSpecialist(selectedSpecialist || null);


    setShowModal(true);
  };

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = localStorage.getItem('user');
      if (!user) {
        console.error('User or user property is undefined');
        return;
      }

      const form = new FormData(e.currentTarget);
      const specialistId = form.get('specialistId');

      if (specialistId !== null && selectedSpecialist) {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/specialists/${specialistId}`, {
          user_id: Number(user),
          phone: phoneNumber
        });



        console.log(response.data.message);
      }
      setShowSuccessMessage(true);

      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        setShowModal(false);
        return () => clearTimeout(timer);
      }, 2000);
    } catch (error) {
      console.error('Error booking specialist:', error);
    }
  };


  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="mt-5 text-3xl text-[#ffd700]">ДЛЯ ЧЕГО НУЖНЫ УСЛУГИ БАЙЕРОВ?</h2>
        <div className="text-base leading-7 text-gray-400">Иногда вы можете столкнуться с ситуацией, когда вам уж очень интересна конкретная игра или дополнение к настольной игре, которой по каким-либо причинам нет возможности приобрести в российских магазинах, либо вы хотите существенно сэкономить или даже заработать на покупке игр. Кроме того, в России очень плохо развит рынок настольных игр. Очень мало людей вообще знают, что же такое настольные игры. Поэтому очень часто у нас выпускают игру и смотрят — пойдет она или нет. А только потом выпускают дополнения к ней. Либо выпускают дополнения сразу, но настолько мелким тиражом, что всем желающим не хватает. Итог: у нас есть настольная игра и мы знаем, что к ней есть допы, которые ее разнообразят/добавляют механики или вообще из жанра «маст хэв», но они не локализованы. Кроме того, только за рубежом есть распродажи игр, ибо хранить изготовленный собственными силами товар на складах будет дороже, нежели чем его продать, даже ниже себестоимости, а также еще множество жизненных ситуаций, когда возникает неолбходимость заказа из-за рубежа. Тогда как раз и могут потребоваться услуги людей, занимающихся доставкой на постоянной основе - байеров. Ниже мы предлагаем вам возможность связаться с некоторыми из этих людей - все они проверены авторами сайта и могут быть рекомендованы для сотрудничества.</div>
        <div className="specialists-container">
          {specialists.map((specialist) => (
            <BuyerProfile key={specialist.id} specialist={specialist} handleBookSpecialist={handleBookSpecialist}/>
          ))}
        </div>
        {showSuccessMessage && (
          <div className="fixed top-0 left-0 w-full bg-yellow-500 text-white py-4 px-6 text-center">
            Ваше обращение поступило специалисту
          </div>
        )}
        {showModal && (
          <div className="modal">
            <form className="modal-content" onSubmit={handleModalSubmit}>
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <h2 className="text-black">Введите ваш номер телефона</h2>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Номер телефона"
                className="text-black"
              />
              <button type="submit">Отправить</button>
            </form>
          </div>
        )}
              <div className="m-20 center-content flex justify-between items-start">
        {/* <div className="add-advert-container bg-gray-900 text-white p-4 rounded shadow"> */}
        <h2 className="mt-5 text-3xl text-[#ffd700]">ДОБАВИТЬ ЗАЯВКУ НА ЗАКАЗ:</h2>
          <form className="advert-form" onSubmit={handleAddAdvertisement}>
            <label className="mb-2">
              <span className="font-semibold block mb-1">Название игры:</span>
              <input type="text" value={gameTitle} onChange={(e) => setGameTitle(e.target.value)} className="w-full rounded-lg px-2 py-1 text-black" />
            </label>
            <label className="mb-2">
              <span className="font-semibold block mb-1">Ваше имя:</span>
              <input type="text" value={yourName} onChange={(e) => setYourName(e.target.value)} className="w-full rounded-lg px-2 py-1 text-black" />
            </label>
            <button type="submit" className="bg-yellow-300 text-white font-semibold py-2 px-4 rounded-lg mt-6">Добавить объявление</button>
          </form>
        </div>

        <div className="bayer-orders-container">
        <h2 className="mt-5 text-3xl text-[#ffd700]">АКУТАЛЬНЫЕ ЗАЯВКИ ПОЛЬЗОВАТЕЛЕЙ</h2>
          <div className="bayer-orders-grid grid grid-cols-1 gap-4 rounded-lg">
            {allBayersOrders.map((order) => (
              <div key={order.id} className="bayer-order-card bg-gray-900 p-4 rounded-lg shadow">
                <div className="w-4/12 bayer-order-header rounded-lg mb-4">
                  <h3 className="text-lg font-semibold">{order.name}</h3>
                  <p>Название игры: {order.nameboard}</p>
                </div>
                <div className="w-4/12 rounded-lg bayer-order-comments">
                  {comments[order.id] && comments[order.id].map((comment, index) => (
                    <div key={`${order.id}-${index}`} className="bayer-order-comment">
                      <strong>{comment.userName || 'Unknown User'}:</strong> {comment.text}
                    </div>
                  ))}
                  {showCommentInput && selectedOrderId === order.id && (
                    <div className="bayer-order-comment-input mt-4">
                      <input type="text" value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} className="w-3/4 rounded px-2 py-1 mr-2" />
                      <button onClick={handleAddComment} className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded">Добавить</button>
                    </div>
                  )}
                  <button
                    className="bayer-order-add-comment bg-yellow-300 text-white font-semibold py-2 px-4 rounded mt-4"
                    onClick={() => {
                      setShowCommentInput(true);
                      setSelectedOrderId(order.id);
                    }}
                  >
                    Добавить комментарий
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      {/* </div> */}
      </div>

    </>
  );
}
export default BuyerPage;