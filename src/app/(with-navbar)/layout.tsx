import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { JSX } from 'react';
import NavBar from '@/components/navBar';
import Footer from '@/components/footer';

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element {
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
