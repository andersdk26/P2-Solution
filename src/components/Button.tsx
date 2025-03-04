'use client';

import {JSX, ReactNode} from 'react';



interface ButtonProps {
    children: ReactNode;
    className?: string;
}

export default function Button({children, className}: ButtonProps): JSX.Element {
    return (
        <button className={`bg-green-500 text-black px-4 py-2 rounded-md ${className}`}
        onClick={() => alert('WEHHHHHHHHHHHHHHHHH')}
       
       >
            {children}
        </button>
    );
}


