'use client';

import { JSX, ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    className?: string;
}

export default function Button({
    children,
    className,
}: ButtonProps): JSX.Element {
    return (
        <button
            type="button"
            className={`text-green-500 border-solid ${className}`}
            onClick={() => alert('Hej')}
        >
            {children}
        </button>
    );
}
