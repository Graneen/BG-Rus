import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Answer {
  id: number;
  description: string;
  User: {
    name: string;
  };
}

interface Question {
  id: number;
  description: string;
  Answers: Answer[];
  User: {
    name: string;
  };
}

interface Props {
  gameId: number;
}

const QAComponent: React.FC<Props> = ({ gameId }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [answerInputs, setAnswerInputs] = useState<{ [key: number]: string }>({});

  const user = localStorage.getItem('user');

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/questions`, {
        params: { game_id: gameId }
      });
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const submitQuestion = async () => {
    if (newQuestion.trim() !== '') {
      try {
        await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/questions`, { user_id: Number(user), game_id: gameId, description: newQuestion });
        setNewQuestion('');
        fetchQuestions();
      } catch (error) {
        console.error('Error submitting question:', error);
      }
    } else {
      console.log('Вопрос не может быть пустым.');
    }
  };

  const submitAnswer = async (questionId: number) => {
    const newAnswer = answerInputs[questionId]?.trim() || '';
    if (newAnswer !== '') {
      try {
        await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/answers`, { user_id: Number(user), question_id: questionId, description: newAnswer });
        setAnswerInputs(prevState => ({ ...prevState, [questionId]: '' }));
        fetchQuestions();
      } catch (error) {
        console.error('Error submitting answer:', error);
      }
    } else {
      console.log('Ответ не может быть пустым.');
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId: number, newValue: string) => {
    setAnswerInputs(prevState => ({ ...prevState, [questionId]: newValue }));
  };

  return (
    <div className="p-4 bg-none text-black">
      <p className="text-white font-bold">В этом разделе вы можете задать вопрос, касающийся игры, даже самый глупый, не стесняйтесь - возможно, вам даже ответят:</p>
      <input type="text" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Задать вопрос" 
      className="p-2 rounded border border-yellow-400 bg-white text-black mb-2 mr-5"  />
      <button onClick={submitQuestion} className="bg-white text-black font-semibold py-2 px-4 rounded-lg mt-6">Задать вопрос</button>

      {questions.map((question) => (
        <div key={question.id} className="bg-gray p-4 rounded mb-4">
          <h3 className="text-yellow-300 text-lg font-semibold">Вопрос от {question.User ? question.User.name : 'Unknown User'}:</h3>
          <p className="text-yellow-300 mb-2">{question.description}</p>

          <input 
            type="text" 
            value={answerInputs[question.id] || ''} 
            onChange={(e) => handleAnswerChange(question.id, e.target.value)} 
            placeholder="Ответить" 
            className="p-2 rounded border border-yellow-400 bg-white text-black mb-2"  
          />
          <button onClick={() => submitAnswer(question.id)} className="bg-white text-black font-semibold py-2 px-4 rounded-lg mt-6">Ответить</button>

          {question.Answers ? question.Answers.map((answer) => (
          <div key={answer.id} className="bg-yellow-300 p-2 rounded mt-2 max-w-[250px]  ml-80">
            <p className="font-semibold">Ответ от {answer.User ? answer.User.name : 'Unknown User'}:</p>
            <p className="break-words">{answer.description}</p>
        </div>
      )) : (
  <p className="italic text-gray-600">Пока нет ответов на этот вопрос</p>
)}
        </div>
      ))}
    </div>
  );
};

export default QAComponent;