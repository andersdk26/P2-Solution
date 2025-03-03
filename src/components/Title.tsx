import { JSX, ReactNode } from 'react';

interface titleProps {
    textColor?: 'red' | 'blue';
    children: ReactNode;
}

const colorClasses = {
    red: 'text-red-500',
    blue: 'text-blue-500',
};

export default function Title({
    textColor = 'blue',
    children,
}: titleProps): JSX.Element {
    return (
        <h1 className={`font-medium ${colorClasses[textColor]}`}>{children}</h1>
    );
}
