'use client';

import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = window.setTimeout(onClose, 10000);
        return (): void => window.clearTimeout(timer);
    }, [onClose]);

    // Base styling for the toast container
    const baseStyles =
        'fixed bottom-5 right-5 flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow-sm';

    // Styles based on success or error variant
    const variantStyles =
        type === 'success'
            ? 'text-green-800 bg-green-100 dark:bg-green-800 dark:text-green-200'
            : 'text-red-800 bg-red-100 dark:bg-red-800 dark:text-red-200';

    // Icon container styling
    const iconContainerStyles = `inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg ${
        type === 'success'
            ? 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200'
            : 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200'
    }`;

    return (
        <div className={`${baseStyles} ${variantStyles}`} role="alert">
            <div className={iconContainerStyles}>
                {type === 'success' ? (
                    <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 14 14"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                    >
                        <path d="M1 1l6 6 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                )}
            </div>

            <div className="ml-3 text-sm font-normal">{message}</div>

            <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-transparent text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={onClose}
                aria-label="Close"
            >
                <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Toast;
