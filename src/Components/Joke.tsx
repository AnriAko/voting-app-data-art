import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { QueryObserverResult, useQuery } from '@tanstack/react-query';
import type { Joke, Vote } from '@/Types/jokeType';
import LabelButton from './LabelButton';

interface JokeProps {
    setRefetchJoke: Dispatch<
        SetStateAction<() => Promise<QueryObserverResult<Joke, Error>> | null>
    >;
    isFetching: boolean;
}

const initialVote: Vote = {
    value: 0,
    label: '',
};

const initialJoke: Joke = {
    _id: '',
    question: '',
    answer: '',
    votes: [initialVote],
    availableVotes: [],
};

export default function Joke({ setRefetchJoke, isFetching }: JokeProps) {
    const [isLoadingJoke, setIsLoadingJoke] = useState(true);
    const [joke, setJoke] = useState<Joke>(initialJoke);

    const {
        data: fetchedJoke = initialJoke, // Fetch the joke data here
        isLoading,
        isError,
        refetch,
    } = useQuery<Joke, Error>({
        queryKey: ['joke'],
        queryFn: async () => {
            const res = await fetch('/api/joke/dead-men-tell-no');
            if (!res.ok) {
                throw new Error('Failed to fetch joke');
            }
            return res.json();
        },
        enabled: isLoadingJoke,
    });

    // Update the joke state with fetched data
    useEffect(() => {
        if (!isLoading) {
            setIsLoadingJoke(false);
            setJoke(fetchedJoke); // Use the fetched joke data
        }
        if (refetch && setRefetchJoke) {
            setRefetchJoke(() => refetch);
        }
    }, [isLoading, fetchedJoke, refetch, setRefetchJoke]);

    if (isLoading && !isFetching) return <p>Loading...</p>;
    if (isError) return <p>Failed to load joke</p>;

    return (
        <div>
            <h2>{isFetching ? 'Loading...' : joke.question}</h2>
            <p>{isFetching ? 'Please wait...' : joke.answer}</p>

            {joke.votes.length > 0 && (
                <div className="flex gap-2 mt-2">
                    {joke.votes.map((vote) => (
                        <LabelButton
                            key={vote.label}
                            value={vote.value}
                            label={vote.label}
                            jokeId={joke._id}
                            updateJoke={setJoke} // Pass the update function directly
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
