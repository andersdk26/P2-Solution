import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { JSX } from 'react';
import redirectServer from '@/components/redirectServer';
import { cookies } from 'next/headers';

// const geistSans = Geist({
//     variable: '--font-geist-sans',
//     subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//     variable: '--font-geist-mono',
//     subsets: ['latin'],
// });

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

    // Check that the user is logged in
    if (!authCookie) {
        redirectServer('logIn');
    }

    return (
        <html lang="en">
            <body className="antialiased">
                <main>{children}</main>
            </body>
        </html>
    );
}
