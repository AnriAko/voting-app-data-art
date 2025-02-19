import React from 'react';
import Joke from '@/Components/Joke';
const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-r from-blue-700 via-purple-800 to-pink-700 h-64 p-6">
            <h1 className="text-6xl font-bold text-gray-200 mb-6">
                Daily dose of humor
            </h1>
            <Joke />
        </div>
    );
};
export default Home;
