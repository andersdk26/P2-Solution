// source: https://www.youtube.com/watch?v=8s4DK5PkRNQ

import { JSX } from 'react';
import Link from 'next/link';

export default function NavBar(): JSX.Element {
    return (
        <nav className="fixed w-full h-24 shadow-x1">
            <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
                {/* left side div for logo*/}
                <div>
                    <Link href="/">Home</Link>
                </div>
                {/* right side div for bar thingies*/}
                <div>
                    <ul className="hidden sm:flex">
                        <Link href="/test">
                            <li className="ml-10 uppercase hover:border-b text-xl">
                                test
                            </li>
                        </Link>
                        <Link href="/">
                            <li className="ml-10 uppercase hover:border-b text-xl">
                                link2
                            </li>
                        </Link>
                    </ul>
                </div>
                {/* Video showed how to add div for mobile phone */}
            </div>
        </nav>
    );
}
