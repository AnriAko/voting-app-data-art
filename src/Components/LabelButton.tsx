import React from 'react';
import axios from 'axios';
import { Joke } from '@/Types/jokeType';

interface LabelButtonProps {
    label: string;
    value: number;
    jokeId: string;
    updateJoke: (updatedJoke: Joke) => void; // Функция для обновления шутки
}

const handleClick = async (
    jokeId: string,
    label: string,
    updateJoke: (updatedJoke: Joke) => void
) => {
    try {
        const response = await axios.post<Joke>(`/api/joke/${jokeId}`, {
            label,
        });

        // Обновление шутки после успешного голосования
        updateJoke(response.data);
    } catch (error) {
        console.error('Error voting on joke:', error);
    }
};

const LabelButton: React.FC<LabelButtonProps> = ({
    label,
    value,
    jokeId,
    updateJoke,
}) => {
    return (
        <button
            onClick={() => handleClick(jokeId, label, updateJoke)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
            {label} {value}
        </button>
    );
};

export default LabelButton;
