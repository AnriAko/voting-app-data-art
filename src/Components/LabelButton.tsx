import React from 'react';
import { Joke } from '@/Types/jokeType';
import FrontendJokeService from '@/Service/frontendJokeService';

interface LabelButtonProps {
    label: string;
    value: number;
    jokeId: string;
    updateJoke: React.Dispatch<React.SetStateAction<Joke>>;
    isUpdatingJoke: boolean;
    setIsUpdatingJoke: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LabelButton({
    label,
    value,
    jokeId,
    updateJoke,
    isUpdatingJoke,
    setIsUpdatingJoke,
}: LabelButtonProps) {
    const handleClick = async (
        jokeId: string,
        label: string,
        updateJoke: (updatedJoke: Joke) => void
    ) => {
        try {
            setIsUpdatingJoke(true);
            const updatedJoke = await FrontendJokeService.voteOnJoke(
                jokeId,
                label
            );
            updateJoke(updatedJoke);
        } catch (error) {
            console.error('Error voting on joke:', error);
        } finally {
            setIsUpdatingJoke(false);
        }
    };
    return (
        <button
            disabled={isUpdatingJoke}
            onClick={() => handleClick(jokeId, label, updateJoke)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md  hover:bg-blue-600 transition  disabled:cursor-not-allowed"
        >
            {label} {value}
        </button>
    );
}
