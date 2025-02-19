import { Joke } from '@/Types/jokeType';
import React from 'react';
import LabelButton from './LabelButton';

interface AvailableLabels {
    displayedJoke: Joke;
    isUpdatingJoke: boolean;
    setIsUpdatingJoke: React.Dispatch<React.SetStateAction<boolean>>;
    updateDisplayedJoke: React.Dispatch<React.SetStateAction<Joke>>;
    forMenu: boolean;
}
export default function AvailableLabels({
    displayedJoke,
    isUpdatingJoke,
    setIsUpdatingJoke,
    updateDisplayedJoke,
    forMenu,
}: AvailableLabels) {
    return (
        <div
            className={`${
                forMenu
                    ? 'flex gap-0.5 justify-center mt-6'
                    : 'flex gap-3 justify-center mt-6'
            }`}
        >
            {forMenu &&
                displayedJoke.availableVotes.map((label) => (
                    <LabelButton
                        key={label}
                        value={null}
                        label={label}
                        jokeId={displayedJoke._id}
                        updateDisplayedJoke={updateDisplayedJoke}
                        isUpdatingJoke={isUpdatingJoke}
                        setIsUpdatingJoke={setIsUpdatingJoke}
                    />
                ))}
            {!forMenu &&
                displayedJoke.availableVotes.map((label) => {
                    const vote = displayedJoke.votes.find(
                        (v) => v.label === label
                    );
                    return (
                        <LabelButton
                            key={label}
                            value={vote ? vote.value : null}
                            label={label}
                            jokeId={displayedJoke._id}
                            updateDisplayedJoke={updateDisplayedJoke}
                            isUpdatingJoke={isUpdatingJoke}
                            setIsUpdatingJoke={setIsUpdatingJoke}
                        />
                    );
                })}
        </div>
    );
}
