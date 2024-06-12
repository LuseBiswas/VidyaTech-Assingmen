import React from 'react';
import { Link } from 'react-router-dom';

const AdminButton: React.FC = () => {
  return (
    <Link to="/admin">
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Admin Panel</button>
    </Link>
  );
};

export default AdminButton;
