import React from 'react';

interface EditJokeButtonProps {
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    handleConfirmEdit: () => void;
}

export default function EditJokeButton({
    isEditing,
    setIsEditing,
    handleConfirmEdit,
}: EditJokeButtonProps) {
    return (
        <li>
            <button
                onClick={
                    isEditing ? handleConfirmEdit : () => setIsEditing(true)
                }
                className={`w-full text-left p-2 rounded-lg transition ${
                    isEditing
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
            >
                {isEditing ? '✔ Confirm' : '✏️ Edit Joke'}
            </button>
        </li>
    );
}
