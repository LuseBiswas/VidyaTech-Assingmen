import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Quiz } from '../types';
import AdminButton from '../components/AdminButton';

const Home: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve quizzes from local storage
    const storedQuizzes = localStorage.getItem('quizzes');
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes));
    } else {
      console.log('No quizzes found in local storage.');
    }
  }, []);

  const handleQuizClick = (quizId: number) => {
    navigate(`/take-quiz/${quizId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800 leading-tight border-4 border-blue-500 rounded-lg p-4">
          VidyaTech Quiz Portal
        </h1>
        <h2 className="text-3xl font-bold mb-4 text-center text-red-500">Live Quizzes</h2>
        {quizzes.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {quizzes.map((quiz) => (
              <li
                key={quiz.id}
                className="py-2 cursor-pointer hover:bg-gray-50 transition-colors duration-300"
                onClick={() => handleQuizClick(quiz.id)}
              >
                <span className="text-blue-500">{quiz.title}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No quizzes available.</p>
        )}
        <div className="mt-8">
          <AdminButton />
        </div>
      </div>
    </div>
  );
};

export default Home;
