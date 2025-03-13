import { JSX } from 'react';
import Footer from '@/components/footer';
import NavBar from '@/components/navBar';

export default function Test(): JSX.Element {
    return (
        <>
            <div className="min-h-screen">
                <NavBar></NavBar>
            </div>
            <Footer></Footer>
        </>
    );
}
