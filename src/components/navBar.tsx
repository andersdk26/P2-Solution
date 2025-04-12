'use client';

// source: https://www.youtube.com/watch?v=8s4DK5PkRNQ

import { JSX, useState } from 'react';
import Profile from '@/components/Profile/profile';
import { useRouter } from 'next/navigation'; // Import useRouter
import Image from 'next/image';
import { movie, searchForMovie } from '@/actions/movie/movie';
import Notification from './notification/notification';

export default function NavBar(): JSX.Element {
    const [searchResult, setSearchResult] = useState<movie[]>([]);
    const router = useRouter(); // Use the useRouter hook

    const redirrectProfile = (path: string): void => {
        if (path) {
            router.push(path);
        }
    };
    return (
        <nav className="fixed overflow:hidden w-full h-24 shadow-x1 -mt-24 z-99">
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
                        <li className="p-2 text-xl centerMyDivPlease">
                            {/* 3px 3px [#9fa3d1] */}

                            {/* <a hr"></a> */}

                            <button
                                className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold py-2 px-4 rounded-sm cursor-pointer"
                                onClick={() => redirrectProfile('/')}
                                title="Home"
                            >
                                Home
                            </button>
                        </li>
                        <li className="p-2 text-xl centerMyDivPlease">
                            <button
                                className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold py-2 px-4 rounded-sm cursor-pointer"
                                onClick={() => redirrectProfile('/Groups')}
                                title="Groups"
                            >
                                Groups
                            </button>
                        </li>

                        <li className="p-2 text-xl centerMyDivPlease">
                            <button
                                className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold py-2 px-4 rounded-sm cursor-pointer"
                                onClick={() => redirrectProfile('/About')}
                                title="About"
                            >
                                About
                            </button>
                        </li>
                    </ul>

                    <section className="flex-col items-center justify-center z-auto">
                        <form className="w-120 justify-stretch mx-auto py-4 text-black">
                            <input
                                type="search"
                                id="coldStartMovieSearch"
                                className="block w-full p-4 rounded-full bg-gray-100"
                                placeholder="Search for movies..."
                                // When the user types something, call function to fetch movies with matching search query.
                                onChange={async (e) => {
                                    setSearchResult(
                                        await searchForMovie(e.target.value, 5)
                                    );
                                }}
                            />
                        </form>

                        <section
                            id="searchResults"
                            className="absolute w-120 mx-auto bg-gray-100 rounded-3xl"
                        >
                            {searchResult.map((movie) => (
                                <p
                                    key={movie.movieId} // movieId is used as identifier as it ensures that each item has a unique key.
                                    // onClick={/* Gør noget når man trykker på filmen */}
                                    className={`py-2 px-4 flex justify-between hover:bg-blue-500 hover:text-white rounded-3xl cursor-pointer`}
                                >
                                    <span className="text-left text-black prevent-select">
                                        {movie.movieTitle}
                                    </span>
                                </p>
                            ))}
                        </section>
                    </section>
                    <div className="pl-10 block">
                        <Notification />
                    </div>
                    <div className="px-10">
                        <Profile />
                    </div>
                </div>
                {/* Video showed how to add div for mobile phone */}
            </div>
        </nav>
    );
}
