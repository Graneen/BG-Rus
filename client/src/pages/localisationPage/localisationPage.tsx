import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import  RootState  from '../../redux/store';
import { setGameTitle, setTranslationNeed, setComment, fetchOrders, addOrder, addComment, Order } from '../../features/localizationSlice';
import { AuthContext } from '../../app/App';
import { useAppDispatch } from '../../redux/store';


interface Comment {
  id: number;
  comment: string;
  userId: number;
}


const LocalisationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allOrders, gameTitle, translationNeed, comment } = useSelector((state: typeof RootState)  => state.localization);
  const user = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleAddOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(addOrder({ userId: user.user, gameTitle, description: translationNeed }));
    dispatch(fetchOrders());
  };

  const handleAddComment = (orderId: number) => {
    dispatch(addComment({ orderId, userId: user.user?.id ?? null, comment }));
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h1>Локализация</h1>

        <form onSubmit={handleAddOrder} style={{ textAlign: 'center', marginTop: '100px', width: '50%', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <label>
            Название игры:
            <input type="text" value={gameTitle} onChange={(e) => dispatch(setGameTitle(e.target.value))} />
          </label>
          <br />
          <label>
            Что перевести:
            <textarea value={translationNeed} onChange={(e) => dispatch(setTranslationNeed(e.target.value))} />
          </label>
          <br />
          <button type="submit">Добавить объявление</button>
        </form>
:
        <div style={{ marginTop: '50px', width: '100%' }}>
          <h2>Все объявления</h2>
          {allOrders.map((order: Order) => (
            <div key={order.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', margin: '10px 0', width: '50%' }}>
              <h3>{order.gameTitle}</h3>
              <p>{order.description}</p>
              <p>Пользователь: {order.User && order.User.name}</p>
              <label>
                Комментарий:
                <input type="text" value={comment} onChange={(e) => dispatch(setComment(e.target.value))} />
              </label>
              <button onClick={() => handleAddComment(order.id)}>Добавить комментарий</button>

              <div>
                <h4>Комментарии:</h4>
                {order.comments.map((comment: Comment) => (
                  <div key={comment.id}>
                    <p>{comment.comment} - {comment.userId}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {allOrders.length === 0 && <p>Нет доступных объявлений.</p>}
        </div>
      </div>
    </>
  );
};

export default LocalisationPage;