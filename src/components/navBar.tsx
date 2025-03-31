'use client';

// source: https://www.youtube.com/watch?v=8s4DK5PkRNQ

import { JSX } from 'react';
import Profile from '@/components/Profile/profile';
import { useRouter } from 'next/navigation'; // Import useRouter
import Image from 'next/image';
import { title } from 'process';

export default function NavBar(): JSX.Element {
    const router = useRouter(); // Use the useRouter hook

    const redirrectProfile = (path: string): void => {
        if (path) {
            router.push(path);
        }
    };

    return (
        <nav className="fixed overflow:hidden w-full h-24 shadow-x1 -mt-24">
            <div className="flex justify-between items-center h-full w-full bg-[#9FA3D1]">
                {/* right side div for bar thingies*/}
                <div className="w-48 h-24 flex justify-between items-center h-full">
                    <div className="ml-4 text-xl ">
                        <Image
                            src={'/img/Jamfest logo.png'}
                            alt={'Jamfest Logo'}
                            width={100}
                            height={100}
                            onClick={() => redirrectProfile('/')}
                            title="Home page"
                        ></Image>
                        {/* <button className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold py-2 px-4 rounded-sm">
                            Home
                        </button> */}
                    </div>
                </div>

                <div className="flex justify-between items-center h-full">
                    <ul className="sm:flex">
                        <li className="ml-10 px-10 text-xl centerMyDivPlease">
                            {/* <a hr"></a> */}
                            <button
                                className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold py-2 px-4 rounded-sm"
                                onClick={() => redirrectProfile('/Groups')}
                                title="Groups"
                            >
                                Groups
                            </button>
                        </li>
                        <li className="ml-10 px-10 text-xl centerMyDivPlease">
                            <button
                                className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold py-2 px-4 rounded-sm"
                                onClick={() => redirrectProfile('/About')}
                                title="About"
                            >
                                About
                            </button>
                        </li>

                        <li className="ml-10 px-10 text-xl centerMyDivPlease">
                            <button
                                className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold py-2 px-4 rounded-sm"
                                title="Button"
                            >
                                Button
                            </button>
                        </li>
                    </ul>
                    <form className="w-100 px-10 justify-stretch mx-auto text-black">
                        <input
                            type="search"
                            id="coldStartMovieSearch"
                            className="block w-full p-4 rounded-full bg-[#dcdeef]"
                            placeholder="Search for movies or users..."
                            // When the user types something, call function to fetch movies with matching search query.
                        />
                    </form>
                    <div className="px-10">
                        <Profile />
                    </div>
                </div>
                {/* Video showed how to add div for mobile phone */}
            </div>
        </nav>
    );
}
