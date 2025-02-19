import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Joke } from '@/Types/jokeType';
import NextJokeButton from './NextJokeButton';
import FrontendJokeService from '@/Service/frontendJokeService';
import AvailableLabels from './AvailableLabels';
import JokeMenu from './JokeMenu';

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
    const [isLoaded, setIsLoaded] = useState(false);
    const [isUpdatingJoke, setIsUpdatingJoke] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedQuestion, setEditedQuestion] = useState('');
    const [editedAnswer, setEditedAnswer] = useState('');
    const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMobileView(window.innerWidth < 1100);

            const handleResize = () => {
                setIsMobileView(window.innerWidth < 1100);
            };
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    const {
        data: joke = initialJoke,
        isLoading,
        isError,
        refetch,
    } = useQuery<Joke, Error>({
        queryKey: ['joke'],
        queryFn: FrontendJokeService.getJoke,
        enabled: !isLoaded,
    });

    useEffect(() => {
        if (joke._id) {
            setDisplayedJoke(joke);
            setEditedQuestion(joke.question);
            setEditedAnswer(joke.answer);
            setIsLoaded(true);
        }
    }, [joke]);

    useEffect(() => {
        if (deleteMessage) {
            setIsEditing(false);
            setTimeout(() => {
                setDeleteMessage(null);
                handleNextJoke();
            }, 1500);
        }
    }, [deleteMessage]);

    const handleNextJoke = async () => {
        setIsFetchingNewJoke(true);
        try {
            await refetch();
        } finally {
            setIsFetchingNewJoke(false);
        }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setEditedQuestion(displayedJoke.question);
            setEditedAnswer(displayedJoke.answer);
        }
    };

    const handleConfirmEdit = async () => {
        setIsUpdatingJoke(true);
        try {
            const updatedJoke = {
                ...displayedJoke,
                question: editedQuestion,
                answer: editedAnswer,
            };
            await FrontendJokeService.updateJoke(updatedJoke);
            setDisplayedJoke(updatedJoke);
            setIsEditing(false);
        } finally {
            setIsUpdatingJoke(false);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load joke</p>;

    return (
        <div className="max-w-3xl mx-auto px-4">
            <div className="relative">
                <div
                    id={`${displayedJoke._id}`}
                    className="p-6 bg-background text-foreground rounded-xl shadow-lg w-full sm:w-[500px] mx-auto mt-6"
                >
                    {deleteMessage && (
                        <div className="text-center text-6xl text-black mt-4 ">
                            {deleteMessage}
                        </div>
                    )}

                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={editedQuestion}
                                onChange={(e) =>
                                    setEditedQuestion(e.target.value)
                                }
                                className="text-1xl font-bold mb-4 text-center w-full border border-black rounded bg-transparent"
                            />
                            <textarea
                                value={editedAnswer}
                                onChange={(e) =>
                                    setEditedAnswer(e.target.value)
                                }
                                className="text-lg text-center text-gray-700 w-full border border-black rounded bg-transparent "
                            />
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold mb-4 text-center">
                                {isFetchingNewJoke
                                    ? 'Loading...'
                                    : displayedJoke.question}
                            </h2>
                            <p className="text-lg text-center text-gray-700">
                                {isFetchingNewJoke
                                    ? 'Please wait...'
                                    : displayedJoke.answer}
                            </p>
                        </>
                    )}

                    <AvailableLabels
                        displayedJoke={displayedJoke}
                        isUpdatingJoke={isUpdatingJoke}
                        setIsUpdatingJoke={setIsUpdatingJoke}
                        updateDisplayedJoke={setDisplayedJoke}
                        forMenu={false}
                    />
                </div>

                {!isMobileView ? (
                    <div className="absolute top-1/2 right-[-70px] transform -translate-y-1/2">
                        <JokeMenu
                            joke={displayedJoke}
                            updateDisplayedJoke={setDisplayedJoke}
                            isUpdatingJoke={isUpdatingJoke}
                            isEditing={isEditing}
                            setIsUpdatingJoke={setIsUpdatingJoke}
                            setIsEditing={handleEditToggle}
                            handleConfirmEdit={handleConfirmEdit}
                            setDisplayedJoke={setDisplayedJoke}
                            setDeleteMessage={setDeleteMessage}
                            handleNextJoke={handleNextJoke}
                        />
                    </div>
                ) : (
                    <div className="mt-4 flex justify-center">
                        <JokeMenu
                            joke={displayedJoke}
                            updateDisplayedJoke={setDisplayedJoke}
                            isUpdatingJoke={isUpdatingJoke}
                            isEditing={isEditing}
                            setIsUpdatingJoke={setIsUpdatingJoke}
                            setIsEditing={handleEditToggle}
                            handleConfirmEdit={handleConfirmEdit}
                            setDisplayedJoke={setDisplayedJoke}
                            setDeleteMessage={setDeleteMessage}
                            handleNextJoke={handleNextJoke}
                            isMobileView={isMobileView}
                        />
                    </div>
                )}
            </div>

            <div
                className={`mt-8 flex justify-center ${
                    isMobileView ? 'mt-[265px]' : ''
                }`}
            >
                <NextJokeButton
                    handleNextJoke={handleNextJoke}
                    isFetching={isFetchingNewJoke}
                    isMobileView={isMobileView}
                />
            </div>
        </div>
    );
}
