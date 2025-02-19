import React from 'react';
import AvailableLabels from '../AvailableLabels';
import { Joke } from '@/Types/jokeType';

interface AddLabelButtonProps {
    joke: Joke;
    isUpdatingJoke: boolean;
    setIsUpdatingJoke: React.Dispatch<React.SetStateAction<boolean>>;
    updateDisplayedJoke: React.Dispatch<React.SetStateAction<Joke>>;
    isLabelPanelOpen: boolean;
    setIsLabelPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddLabelButton({
    joke,
    isUpdatingJoke,
    setIsUpdatingJoke,
    updateDisplayedJoke,
    isLabelPanelOpen,
    setIsLabelPanelOpen,
}: AddLabelButtonProps) {
    return (
        <li className="relative">
            <button
                onClick={() => setIsLabelPanelOpen(!isLabelPanelOpen)}
                className="w-full text-left p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
                ☺️ Add label
            </button>
            {isLabelPanelOpen && (
                <div className="absolute left-1/2 bottom-full mb-16 transform -translate-x-1/2 bg-gray-100 shadow-lg p-4 rounded-lg min-w-max">
                    <AvailableLabels
                        displayedJoke={joke}
                        isUpdatingJoke={isUpdatingJoke}
                        setIsUpdatingJoke={setIsUpdatingJoke}
                        updateDisplayedJoke={updateDisplayedJoke}
                        forMenu={true}
                    />
                </div>
            )}
        </li>
    );
}
