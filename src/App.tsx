import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Admin from './pages/Admin.tsx';
import TakeQuiz from './pages/TakeQuiz.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/take-quiz/:quizId" element={<TakeQuiz />} />
      </Routes>
    </Router>
  );
};

export default App;
