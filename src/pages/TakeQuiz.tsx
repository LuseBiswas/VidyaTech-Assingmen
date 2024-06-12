import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Quiz, UserAnswer } from '../types';

const TakeQuiz: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const storedQuizzes = localStorage.getItem('quizzes');
    if (storedQuizzes) {
      const quizzes: Quiz[] = JSON.parse(storedQuizzes);
      const selectedQuiz = quizzes.find(q => q.id === Number(quizId));
      if (selectedQuiz) {
        setQuiz(selectedQuiz);
      } else {
        console.log('Quiz not found.');
      }
    } else {
      console.log('No quizzes found in local storage.');
    }
  }, [quizId]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setUserAnswers([
      ...userAnswers.filter((ua) => ua.questionId !== questionId),
      { questionId, answer },
    ]);
  };

  const submitQuiz = () => {
    if (!quiz) return;

    const correctAnswers = quiz.questions.map((q) => q.correctAnswer);
    const userScore = userAnswers.reduce((acc, curr) => {
      const question = quiz.questions.find((q) => q.id === curr.questionId);
      if (question && question.correctAnswer === curr.answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setScore(userScore);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">{quiz.title}</h1>
        {quiz.questions.map((question) => (
          <div key={question.id} className="mb-6">
            <p className="text-lg font-medium mb-2">{question.questionText}</p>
            {question.options.map((option, index) => (
              <div key={index} className="mb-2">
                <input
                  type="radio"
                  id={`question-${question.id}-option-${index}`}
                  name={`question-${question.id}`}
                  value={option}
                  onChange={() => handleAnswerChange(question.id, option)}
                  className="mr-2"
                />
                <label htmlFor={`question-${question.id}-option-${index}`} className="text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button
          className="bg-blue-500 text-white p-3 w-full rounded-lg hover:bg-blue-600 transition-colors duration-300"
          onClick={submitQuiz}
        >
          Submit Quiz
        </button>

        {score !== null && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Your Score: {score}/{quiz.questions.length}</h2>
            <div className="mt-4">
              {quiz.questions.map((question) => {
                const userAnswer = userAnswers.find(
                  (ua) => ua.questionId === question.id
                );
                return (
                  <div key={question.id} className="mt-4">
                    <p className="font-semibold">{question.questionText}</p>
                    {question.options.map((option, index) => (
                      <p
                        key={index}
                        className={`pl-4 ${option === question.correctAnswer ? 'text-green-500' : ''} ${userAnswer?.answer === option && option !== question.correctAnswer ? 'text-red-500' : ''}`}
                      >
                        {option}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button
          className="mt-4 bg-gray-500 text-white p-3 w-full rounded-lg hover:bg-gray-600 transition-colors duration-300"
          onClick={() => navigate('/')}
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default TakeQuiz;
