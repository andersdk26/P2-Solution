'use client';

import { JSX } from 'react';

interface MovieTitleProps {
    title: string;
    onClick?: () => void;
    className?: string;
}

export default function MovieTitle({
    title,
    onClick = (): void => {},
    className = '',
}: MovieTitleProps): JSX.Element {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer text-center p-4 ${className}`}
        >
            <h2 className="text-lg font-bold">{title}</h2>
        </div>
    );
}
