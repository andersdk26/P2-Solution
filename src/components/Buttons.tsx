'use client';

import { JSX, ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    className?: string;
}

export function FilledButton({
    children,
    className,
}: ButtonProps): JSX.Element {
    return (
        <button
            type="button"
            className={`bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded ${className}`}
            onClick={() => alert('Tak, fordi du trykkede på knappen.')}
        >
            {children}
        </button>
    );
}

export function OutlinedButton({ children }: ButtonProps): JSX.Element {
    return (
        <button
            type="button"
            className="bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-800 hover:border-transparent rounded"
            onClick={() => alert('Tak, fordi du trykkede på knappen.')}
        >
            {children}
        </button>
    );
}
