import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { JSX } from 'react';
import NavBar from '@/components/navBar';
import Footer from '@/components/footer';
import { cookies } from 'next/headers';
import redirectServer from '@/components/redirectServer';
import verifyUser from '@/actions/logIn/authenticateUser';

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
                <NavBar></NavBar>
                <main className="mt-24">{children}</main>
                <Footer></Footer>
            </body>
        </html>
    );
}
