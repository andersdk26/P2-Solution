import { JSX, ReactNode } from 'react';

interface titleProps {
    textColor?: 'red' | 'blue';
    children: ReactNode;
}

export default function Title({
    textColor = 'blue',
    children,
}: titleProps): JSX.Element {
    return <h1 className={`font-medium text-${textColor}-500`}>{children}</h1>;
}
