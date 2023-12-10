import React from 'react';

export default function Button({ children, isLoading, isDisabled, onClick }) {
    return (
        <button
            className="w-full rounded-full hover:bg-blue-800 bg-blue-600 text-white h-10 px-3 disabled:opacity-50"
            disabled={isDisabled || isLoading}
            onClick={onClick}
        >
            {children}
        </button>
    )
}