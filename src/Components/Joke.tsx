import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import type { Joke } from "@/Types/jokeType";

interface JokeProps {
    setRefetchJoke: Dispatch<
        SetStateAction<() => Promise<QueryObserverResult<Joke, Error>> | null>
    >;
    isFetching: boolean; // isFetching is a boolean
}

export default function Joke({ setRefetchJoke, isFetching }: JokeProps) {
    const [isLoadingJoke, setIsLoadingJoke] = useState(true);

    const {
        data: joke,
        isLoading,
        isError,
        refetch,
    } = useQuery<Joke, Error>({
        queryKey: ["joke"],
        queryFn: async () => {
            try {
                const res = await fetch("http://localhost:3000/api/joke");
                if (!res.ok) {
                    throw new Error("Failed to fetch joke");
                }
                return res.json();
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Error:", error.message);
                    throw error;
                } else {
                    console.error("Unknown error.");
                    throw new Error("Failed to fetch joke");
                }
            }
        },
        enabled: isLoadingJoke,
    });

    useEffect(() => {
        if (!isLoading) {
            setIsLoadingJoke(false);
        }
        if (refetch && setRefetchJoke) {
            setRefetchJoke(() => refetch);
        }
    }, [isLoading, refetch, setRefetchJoke]);

    if (isLoading && !isFetching) return <p>Loading...</p>;
    if (isError) return <p>Failed to load joke</p>;

    return (
        <div>
            <h2>{isFetching ? "Loading..." : joke?.question}</h2>
            <p>{isFetching ? "Please wait..." : joke?.answer}</p>
        </div>
    );
}
