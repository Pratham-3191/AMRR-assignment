import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="h-screen w-full bg-gray-900 flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
          🛒 Welcome to Item Manager
        </h1>

        <Link to="/add-item" className="w-full">
          <button className="w-64 sm:w-72 bg-red-600 hover:bg-red-700 transition-colors duration-300 text-white py-4 rounded-xl text-xl font-semibold shadow-md">
            ➕ Add Item
          </button>
        </Link>

        <Link to="/view-items" className="w-full">
          <button className="w-64 sm:w-72 bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white py-4 rounded-xl text-xl font-semibold shadow-md">
            📦 View Items
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
