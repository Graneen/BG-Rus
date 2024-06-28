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
  const [newAnswer, setNewAnswer] = useState('');

  const user = localStorage.getItem('user');


  const fetchQuestions = async () => {
    try {
        
      const response = await axios.get('http://localhost:3000/questions');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  

  const submitQuestion = async () => {
    try {
      await axios.post('http://localhost:3000/questions', { user_id: Number(user), game_id: gameId, description: newQuestion });
      setNewQuestion('');
      fetchQuestions();
     
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  const submitAnswer = async (questionId: number) => {
    try {
      await axios.post('http://localhost:3000/answers', { user_id: Number(user), question_id: questionId, description: newAnswer });
      setNewAnswer('');
      fetchQuestions();
      
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="p-4 bg-none text-black">
      <h1 className="text-2xl font-bold mb-4">Вопросы и ответы</h1>
      <input type="text" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Задать вопрос" className="p-2 mb-2 rounded border border-black" />
      <button onClick={submitQuestion} className="bg-black text-white py-2 px-4 rounded mb-4">Задать вопрос</button>

      {questions.map((question) => (
        <div key={question.id} className="bg-yellow-300 p-4 rounded mb-4">
          <h3 className="text-lg font-semibold">Вопрос от {question.User ? question.User.name : 'Unknown User'}:</h3>
          <p className="mb-2">{question.description}</p>

          <input type="text" value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} placeholder="Ответить" className="p-2 rounded border border-black mb-2" />
          <button onClick={() => submitAnswer(question.id)} className="bg-black text-white py-2 px-4 rounded">Ответить</button>

          {question.Answers ? question.Answers.map((answer) => (
                    <div key={answer.id} className="bg-yellow-400 p-2 rounded mt-2">
                        <p className="font-semibold">Ответ от {answer.User ? answer.User.name : 'Unknown User'}:</p>
                        <p>{answer.description}</p>
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