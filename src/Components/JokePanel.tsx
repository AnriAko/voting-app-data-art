import { useState } from "react";
import { QueryObserverResult } from "@tanstack/react-query";
import Joke from "./Joke";
import NextJokeButton from "./NextJokeButton";

interface Joke {
    question: string;
    answer: string;
    permalink: string;
}

export default function JokePanel() {
    const [isFetchingNewJoke, setIsFetchingNewJoke] = useState(false);
    const [refetchJoke, setRefetchJoke] = useState<
        (() => Promise<QueryObserverResult<Joke, Error>>) | null
    >(null);

    const handleNextJoke = async () => {
        if (!refetchJoke) return;
        setIsFetchingNewJoke(true);
        try {
            await refetchJoke();
        } finally {
            setIsFetchingNewJoke(false);
        }
    };

    return (
        <div>
            <Joke
                setRefetchJoke={setRefetchJoke}
                isFetching={isFetchingNewJoke}
            />
            <NextJokeButton
                handleNextJoke={handleNextJoke}
                isFetching={isFetchingNewJoke}
            />
        </div>
    );
}
