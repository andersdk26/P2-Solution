'use client';
import { JSX, ReactNode } from "react";


interface ButtonProps {
    children: ReactNode;
    className?: string;
}

export default function Button({ children, className}: ButtonProps): JSX.Element {
    return (
    <button 
    type = "button"
    className={`text-red-500 ${className}`}
    onClick={() => alert('Hello')}
    >
        {children}
    </button>
    );
}