import { Joke } from '@/Types/jokeType';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import MenuImage from '../public/menu.png';
import AddLabelButton from './JokeMenuButtons/AddLabelButton';
import EditJokeButton from './JokeMenuButtons/EditJokeButton';
import DeleteJokeButton from './JokeMenuButtons/DeleteJokeButton';

interface JokeMenuProps {
    joke: Joke;
    updateDisplayedJoke: React.Dispatch<React.SetStateAction<Joke>>;
    isUpdatingJoke: boolean;
    isEditing: boolean;
    setIsUpdatingJoke: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    handleConfirmEdit: () => void;
    setDisplayedJoke: React.Dispatch<React.SetStateAction<Joke>>;
    setDeleteMessage: React.Dispatch<React.SetStateAction<string | null>>;
    handleNextJoke: () => void;
    isMobileView?: boolean;
}

export default function JokeMenu({
    joke,
    updateDisplayedJoke,
    isUpdatingJoke,
    isEditing,
    setIsUpdatingJoke,
    setIsEditing,
    handleConfirmEdit,
    setDisplayedJoke,
    setDeleteMessage,
    handleNextJoke,
    isMobileView,
}: JokeMenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLabelPanelOpen, setIsLabelPanelOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isEditing ||
                menuRef.current?.contains(event.target as Node) ||
                buttonRef.current?.contains(event.target as Node)
            ) {
                return;
            }
            setIsMenuOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [isEditing]);

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none"
            >
                <Image src={MenuImage} alt="Menu" width={50} height={50} />
            </button>

            {isMenuOpen && (
                <div
                    ref={menuRef}
                    className={`absolute ${
                        isMobileView
                            ? 'top-full left-1/2 transform -translate-x-1/2 mt-2'
                            : 'top-[-65px] left-full ml-2 '
                    } bg-gray-100 w-[200px] shadow-lg p-4 rounded-lg`}
                >
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        ✖ Close
                    </button>
                    <ul className="mt-4 space-y-1">
                        <AddLabelButton
                            joke={joke}
                            isUpdatingJoke={isUpdatingJoke}
                            setIsUpdatingJoke={setIsUpdatingJoke}
                            updateDisplayedJoke={updateDisplayedJoke}
                            isLabelPanelOpen={isLabelPanelOpen}
                            setIsLabelPanelOpen={setIsLabelPanelOpen}
                        />
                        <EditJokeButton
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            handleConfirmEdit={handleConfirmEdit}
                        />
                        <DeleteJokeButton
                            jokeId={joke._id}
                            setDisplayedJoke={setDisplayedJoke}
                            setDeleteMessage={setDeleteMessage}
                            handleNextJoke={handleNextJoke}
                        />
                    </ul>
                </div>
            )}
        </div>
    );
}
