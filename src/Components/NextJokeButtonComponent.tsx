interface NextJokeButtonProps {
    handleNextJoke: () => void;
    isFetching: boolean;
}

export default function NextJokeButtonComponent({
    handleNextJoke,
    isFetching,
}: NextJokeButtonProps) {
    return (
        <button onClick={handleNextJoke} disabled={isFetching}>
            {isFetching ? "Loading..." : "Next Joke"}
        </button>
    );
}
