interface NextJokeButtonProps {
    handleNextJoke: () => void;
    isFetching: boolean;
}

export default function NextJokeButton({
    handleNextJoke,
    isFetching,
}: NextJokeButtonProps) {
    return (
        <button
            onClick={handleNextJoke}
            disabled={isFetching}
            className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition duration-200"
        >
            {isFetching ? 'Loading...' : 'Next Joke'}
        </button>
    );
}
