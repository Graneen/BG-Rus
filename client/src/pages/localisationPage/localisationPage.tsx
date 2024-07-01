import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './LocalizationPage.css'

    interface Order {
      id: number;
      userId: number | null;
      gameTitle: string;
      description: string;
      comments: Comment[];
      User: User;
      replies: Reply[];
    }

    interface Comment {
      id: string;
      userId: number;
      userName: string;
      comment: string;
      parentId: number | null;
      createdAt: Date;
      replies: Reply[];
      commentId: string
    }

    interface Reply {
      id: number;
      userId: number;
      userName: string;
      comment: string;
      createdAt: Date;
      replies: string;
    }

    export interface User {
      id: number;
      name: string;
    }

  const LocalisationPage: React.FC = () => {
  const user = localStorage.getItem("user");
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [gameTitle, setGameTitle] = useState('');
  const [translationNeed, setTranslationNeed] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [replyingToComment, setReplyingToComment] = useState<string >('');
  const [replyText, setReplyText] = useState('');
  
  

      const handleAddOrder = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/localization-orders`, {
        userId: Number(user),
        gameTitle,
        description: translationNeed
      });

      console.log('Order created:', response.data);
      fetchOrders();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

      const handleAddComment = async (orderId: number) => {
    try {
      if (!user) {
        console.error('User not found. Please make sure the user is logged in.');
        return;
      }

      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/localization-orders/${orderId}/comments`, {
        userId: Number(user),
        comment: newCommentText,
        commentId: uuidv4()
      });

      

      console.log('Коментарий добавлен:', response.data);

      
      fetchOrders();
      setNewCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleReplyComment = async (orderId: number, commentId: string) => {
    console.log(orderId, commentId)
    try {
      if (!user) {
        console.error('User not found. Please make sure the user is logged in.');
        return;
      }

      

      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/${orderId}/comments/${commentId}/replies`, {
        userId: Number(user),
        replies: replyText
      });

      console.log('Reply added:', response.data);

      fetchOrders();
      setReplyingToComment('');
      setReplyText('');
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

      const fetchOrders = async () => {
        try {
          const response = await axios.get<Order[]>(`${import.meta.env.VITE_REACT_APP_API_URL}/localization-orders`);
          setAllOrders(response.data);
          console.log(response.data, 'aaaa')
        } catch (error) {
          console.error('Error fetching orders:', error);
          
        }
      }

        useEffect(() => {
          fetchOrders();
        }, []);

  
      return (
        <>
       <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="mt-5 text-3xl text-[#ffd700]">ЧТО ТАКОЕ ЛОКАЛИЗАЦИЯ И КАК ПОЛЬЗОВАТЕЛИ МОГУТ ВЗАИМОДЕЙСТВОВАТЬ?</h2>
          <p className="text-base leading-7 text-gray-400">Локализация - это процесс адаптации игры или программы к языку, культуре и требованиям конкретного регионального рынка, чтобы сделать продукт доступным и понятным для местных пользователей. На этой странице пользователи могут добавлять новые объявления о локализации игр, комментировать и отвечать на комментарии по объявлениям, участвуя в обсуждениях и совместном сотрудничестве по переводу игрового контента.</p>
      </div>

        <form onSubmit={handleAddOrder} className="text-center mt-8 w-1/2 p-4 border border-yellow-500 rounded bg-yellow-200">
        <label className="block mb-4 text-black">
          Название игры:
          <input
            type="text"
            value={gameTitle}
            onChange={(e) => setGameTitle(e.target.value)}
            className="w-full px-3 py-2 rounded border border-black text-black"
          />
        </label>
        <label className="block mb-4 text-black">
          Что перевести:
          <textarea
            value={translationNeed}
            onChange={(e) => setTranslationNeed(e.target.value)}
            className="w-full px-3 py-2 rounded border border-black text-black"
          />
        </label>
        <button type="submit" className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded">Добавить объявление</button>
      </form>

      <div className="mt-8 w-1/2 grid-container">
      <h2 className="text-lg text-yellow-500 mb-4">Все объявления</h2>
      {allOrders.map((order: Order) => (
        <div key={order.id} className="bg-yellow-200 p-4 rounded-md mb-4">
          <h3 className="text-xl font-semibold text-black">{order.gameTitle}</h3>
          <p className="text-base text-black">{order.description}</p>
          <p className="text-sm text-black">Пользователь: {order.User && order.User.name}</p>
          <label className="block mt-4">
            Комментарий:
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="w-full px-3 py-2 rounded border border-black text-black" 
            />
          </label>
          <button onClick={() => handleAddComment(order.id)} className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded mt-2">Добавить комментарий</button>

          <div className="mt-4">
            <h4 className="text-base font-semibold text-black">Комментарии:</h4>
            {order.comments && order.comments.map((comment: Comment) => (
              <div key={comment.commentId} className="bg-yellow-100 p-2 rounded-md mt-2">
                <p className="text-sm text-black">{comment.userName && comment.userName}: {comment.comment}</p>
                {order.replies && order.replies.map((reply, index) => (
                  <div key={`${comment.id}-${index}`} className="bg-yellow-50 p-2 rounded-md ml-4 mt-2">
                    <p className="text-xs text-black">{reply.userName && reply.userName}: {reply.replies}</p>
                  </div>
                ))}
            
                {replyingToComment === comment.commentId ? (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full px-2 py-1 rounded border border-black text-black"
                    />
                    <button onClick={() => handleReplyComment(order.id,comment.commentId)} className="bg-yellow-500 text-black font-semibold py-1 px-2 rounded mt-1">Ответить</button>
                    <button onClick={() => setReplyingToComment('')} className="bg-yellow-500 text-black font-semibold py-1 px-2 rounded ml-2">Отменить</button>
                  </div>
                ) : (
                  <button onClick={() => setReplyingToComment(comment.commentId)} className="bg-yellow-500 text-white font-semibold py-1 px-2 rounded mt-1">Ответить</button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {allOrders.length === 0 && <p>Нет доступных объявлений.</p>}
        </div>
</>
  )
}
export default LocalisationPage;