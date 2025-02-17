import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NextJokeButtonComponent from "./NextJokeButtonComponent";

export default function JokeComponent() {
    const [isFetchingNewJoke, setIsFetchingNewJoke] = useState(false);
    const {
        data: joke,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["joke"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/api/joke");
            if (!res.ok) throw new Error("Failed to fetch joke");
            return res.json();
        },
    });

    const handleNextJoke = async () => {
        setIsFetchingNewJoke(true);
        try {
            await refetch();
        } finally {
            setIsFetchingNewJoke(false);
        }
    };

    if (isLoading && !isFetchingNewJoke) return <p>Loading...</p>;

    if (isError) return <p>Failed to load joke</p>;

    return (
        <div>
            <h2>{isFetchingNewJoke ? "Loading..." : joke?.question}</h2>{" "}
            <p>{isFetchingNewJoke ? "Please wait..." : joke?.answer}</p>
            <a href={joke?.permalink} target="_blank" rel="noopener noreferrer">
                View on site
            </a>
            <NextJokeButtonComponent
                handleNextJoke={handleNextJoke}
                isFetching={isFetchingNewJoke}
            />
        </div>
    );
}
