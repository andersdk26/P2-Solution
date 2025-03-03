import { JSX, ReactNode } from 'react';
import '@/styles/globals.css';

export default function TestLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>): JSX.Element {
    return <section>{children}</section>;
}
