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
        <div>
            <div id={`${displayedJoke._id}`}>
                <h2>
                    {isFetchingNewJoke ? 'Loading...' : displayedJoke.question}
                </h2>
                <p>
                    {isFetchingNewJoke
                        ? 'Please wait...'
                        : displayedJoke.answer}
                </p>
            </div>
            {displayedJoke.votes.length > 0 && (
                <div className="flex gap-2 mt-2">
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
            <NextJokeButton
                handleNextJoke={handleNextJoke}
                isFetching={isFetchingNewJoke}
            />
        </div>
    );
}
