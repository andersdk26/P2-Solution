import type { Metadata } from 'next';
import '@/styles/globals.css';
import { JSX } from 'react';
import { cookies } from 'next/headers';
import redirectServer from '@/components/redirectServer';

export const metadata: Metadata = {
    title: 'Jamfest',
    description: 'Find the perfect movie for you and your watchparty!',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): Promise<JSX.Element> {
    const cookieStore = cookies();
    const authCookie = (await cookieStore).get('token');

    // Check that the user is not logged in
    if (authCookie) {
        redirectServer('');
    }

    return (
        <html lang="en">
            <body className="antialiased">
                <main>{children}</main>
            </body>
        </html>
    );
}
