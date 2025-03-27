// source: https://www.youtube.com/watch?v=8s4DK5PkRNQ

import { JSX } from 'react';
import Link from 'next/link';
import Profile from '@/components/Profile/profile';

export default function NavBar(): JSX.Element {
    return (
        <nav className="fixed w-full h-24 shadow-x1">
            <div className="flex justify-between items-center h-full w-full bg-white">
                {/* right side div for bar thingies*/}
                <div className="w-24 h-24 text-center">
                    <Link href="/">Home</Link>
                </div>

                <div className="flex justify-between items-center h-full">
                    <ul className="sm:flex">
                        <li className="ml-10 px-10 uppercase text-xl centerMyDivPlease">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm">
                                Groups
                            </button>
                        </li>
                        <li className="ml-10 px-10 uppercase text-xl centerMyDivPlease">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm">
                                About
                            </button>
                        </li>

                        <li className="ml-10 px-10 uppercase text-xl centerMyDivPlease">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm">
                                Button
                            </button>
                        </li>
                    </ul>
                    <div className="px-10">
                        <Profile />
                    </div>
                </div>
                {/* Video showed how to add div for mobile phone */}
            </div>
        </nav>
    );
}
