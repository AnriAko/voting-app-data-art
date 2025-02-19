interface NextJokeButtonProps {
    handleNextJoke: () => void;
    isFetching: boolean;
    isMobileView?: boolean;
}

export default function NextJokeButton({
    handleNextJoke,
    isFetching,
    isMobileView,
}: NextJokeButtonProps) {
    return (
        <button
            onClick={handleNextJoke}
            disabled={isFetching}
            className={`bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition duration-200 ${
                isMobileView ? 'w-[200px] h-[60px] text-2xl' : ''
            }`}
        >
            {isFetching ? 'Loading...' : 'Next Joke'}
        </button>
    );
}
