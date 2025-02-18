import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Joke } from '@/Types/jokeType';
import LabelButton from './LabelButton';
import NextJokeButton from './NextJokeButton';

const initialJoke: Joke = {
    _id: '',
    question: '',
    answer: '',
    votes: [{ value: 0, label: '' }],
    availableVotes: [],
};

export default function Joke() {
    const [isFetchingNewJoke, setIsFetchingNewJoke] = useState(false);
    const [displayedJoke, setDisplayedJoke] = useState<Joke>(initialJoke);
    const {
        data: joke = initialJoke,
        isLoading,
        isError,
        refetch,
    } = useQuery<Joke, Error>({
        queryKey: ['joke'],
        queryFn: async () => {
            const res = await fetch('/api/joke/dead-men-tell-no');
            if (!res.ok) throw new Error('Failed to fetch joke');
            return res.json();
        },
    });
    useEffect(() => {
        if (joke._id) {
            setDisplayedJoke(joke);
        }
    }, [joke]);

    const handleNextJoke = async () => {
        setIsFetchingNewJoke(true);
        try {
            await refetch();
        } finally {
            setIsFetchingNewJoke(false);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load joke</p>;
    return (
        <div className="max-w-3xl mx-auto px-4">
            <div
                id={`${displayedJoke._id}`}
                className="p-6 bg-background text-foreground rounded-xl shadow-lg max-w-lg mx-auto mt-6"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {isFetchingNewJoke ? 'Loading...' : displayedJoke.question}
                </h2>

                <p className="text-lg text-center text-gray-700">
                    {isFetchingNewJoke
                        ? 'Please wait...'
                        : displayedJoke.answer}
                </p>
            </div>

            {displayedJoke.votes.length > 0 && (
                <div className="flex gap-4 justify-center mt-6">
                    {displayedJoke.votes.map((vote) => (
                        <LabelButton
                            key={vote.label}
                            value={vote.value}
                            label={vote.label}
                            jokeId={displayedJoke._id}
                            updateJoke={setDisplayedJoke}
                        />
                    ))}
                </div>
            )}

            <div className="mt-8 flex justify-center">
                <NextJokeButton
                    handleNextJoke={handleNextJoke}
                    isFetching={isFetchingNewJoke}
                />
            </div>
        </div>
    );
}
