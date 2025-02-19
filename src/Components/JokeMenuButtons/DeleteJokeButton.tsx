import React, { useState } from 'react';
import FrontendJokeService from '@/Service/frontendJokeService';
import { Joke } from '@/Types/jokeType';

interface DeleteJokeButtonProps {
    jokeId: string;
    setDisplayedJoke: React.Dispatch<React.SetStateAction<Joke>>;
    setDeleteMessage: React.Dispatch<React.SetStateAction<string | null>>;
    handleNextJoke: () => void;
}

export default function DeleteJokeButton({
    jokeId,
    setDisplayedJoke,
    setDeleteMessage,
    handleNextJoke,
}: DeleteJokeButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await FrontendJokeService.deleteJoke(jokeId);
            setDeleteMessage('Joke deleted successfully!');

            setDisplayedJoke({
                _id: '',
                question: '',
                answer: '',
                votes: [{ value: 0, label: '' }],
                availableVotes: [],
            });
            setTimeout(() => {
                handleNextJoke();
            }, 2000);
        } catch (error) {
            console.error('Failed to delete joke:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className={`w-full text-left p-2 rounded-lg transition ${
                isDeleting ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'
            } text-white`}
            disabled={isDeleting}
        >
            {isDeleting ? 'Deleting...' : '🗑️ Delete Joke'}
        </button>
    );
}
