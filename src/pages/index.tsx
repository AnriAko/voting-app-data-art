import React from 'react';
import Joke from '@/Components/Joke';
const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-6">
            <h1 className="text-6xl font-bold text-blue-600 mb-6">
                Jokes Website
            </h1>
            <Joke />
        </div>
    );
};

export default Home;
