import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { Quiz, Question } from '../types';

const Admin: React.FC = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [editingQuizId, setEditingQuizId] = useState<number | null>(null);
  
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    const storedQuizzes = localStorage.getItem('quizzes');
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes));
    } else {
      console.log('No quizzes found in local storage.');
    }
  }, []);

  const addQuestion = () => {
    if (!currentQuestion || !correctAnswer || options.some(option => !option)) {
      alert("Please fill all fields");
      return;
    }

    const newQuestion: Question = {
      id: questions.length + 1,
      questionText: currentQuestion,
      options,
      correctAnswer,
    };
    setQuestions([...questions, newQuestion]);
    setCurrentQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  const createQuiz = () => {
    if (!quizTitle || questions.length === 0) {
      alert("Please add a title and at least one question");
      return;
    }

    if (editingQuizId !== null) {
      const updatedQuizzes = quizzes.map(quiz =>
        quiz.id === editingQuizId
          ? { ...quiz, title: quizTitle, questions }
          : quiz
      );
      localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
      setQuizzes(updatedQuizzes);
      setEditingQuizId(null);
    } else {
      const newQuiz: Quiz = {
        id: Date.now(),
        title: quizTitle,
        questions,
      };
      const updatedQuizzes = [...quizzes, newQuiz];
      localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
      setQuizzes(updatedQuizzes);
    }

    setQuizTitle('');
    setQuestions([]);
  };

  const editQuiz = (quizId: number) => {
    const quizToEdit = quizzes.find(quiz => quiz.id === quizId);
    if (quizToEdit) {
      setQuizTitle(quizToEdit.title);
      setQuestions(quizToEdit.questions);
      setEditingQuizId(quizId);
    }
  };

  const deleteQuiz = (quizId: number) => {
    const updatedQuizzes = quizzes.filter(quiz => quiz.id !== quizId);
    localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    setQuizzes(updatedQuizzes);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {editingQuizId ? 'Edit Quiz' : 'Create a New Quiz'}
        </h1>
        <input
          type="text"
          className="border border-gray-300 p-3 mb-4 w-full rounded-lg"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
        <div className="mb-4">
          <input
            type="text"
            className="border border-gray-300 p-3 mb-2 w-full rounded-lg"
            placeholder="Question"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
          />
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              className="border border-gray-300 p-3 mb-2 w-full rounded-lg"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) =>
                setOptions(
                  options.map((opt, idx) =>
                    idx === index ? e.target.value : opt
                  )
                )
              }
            />
          ))}
          <input
            type="text"
            className="border border-gray-300 p-3 mb-2 w-full rounded-lg"
            placeholder="Correct Answer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-3 w-full rounded-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={addQuestion}
          >
            Add Question
          </button>
        </div>
        <button
          className="bg-green-500 text-white p-3 w-full rounded-lg hover:bg-green-600 transition-colors duration-300 mb-6"
          onClick={createQuiz}
        >
          {editingQuizId ? 'Save Changes' : 'Create Quiz'}
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Recent Quizzes</h2>
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz.id} className="flex justify-between items-center border-b border-gray-200 py-2">
              <span>{quiz.title}</span>
              <div>
                <button
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-300 mr-4"
                  onClick={() => editQuiz(quiz.id)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-700 transition-colors duration-300"
                  onClick={() => deleteQuiz(quiz.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="bg-gray-500 text-white p-3 w-full rounded-lg hover:bg-gray-600 transition-colors duration-300 mt-6"
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Admin;
