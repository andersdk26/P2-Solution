'use client';

// source: https://www.youtube.com/watch?v=8s4DK5PkRNQ

import { JSX } from 'react';
import Profile from '@/components/Profile/profile';
import { useState } from 'react';
import { movie, searchForMovie } from 'app/actions/movie';

export default function NavBar(): JSX.Element {
    const [searchResult, setSearchResult] = useState<movie[]>([]);

    return (
        <nav className="fixed overflow:hidden w-full h-24 shadow-x1 -mt-24">
            <div className="flex justify-between items-center h-full w-full bg-[#9FA3D1]">
                {/* right side div for bar thingies*/}
                <div className="w-48 h-24 flex justify-between items-center h-full">
                    <div className="ml-10 text-xl centerMyDivPlease">
                        <button className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold py-2 px-4 rounded-sm">
                            Home
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center h-full">
                    <ul className="sm:flex">
                        <li className="ml-10 px-10 text-xl centerMyDivPlease">
                            <button className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold py-2 px-4 rounded-sm">
                                Groups
                            </button>
                        </li>
                        <li className="ml-10 px-10 text-xl centerMyDivPlease">
                            <button className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold py-2 px-4 rounded-sm">
                                About
                            </button>
                        </li>

                        <li className="ml-10 px-10 text-xl centerMyDivPlease">
                            <button className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold py-2 px-4 rounded-sm">
                                Button
                            </button>
                        </li>
                    </ul>

                    <section className="flex-col items-center justify-center z-index: auto">
                        <form className="w-100 px-10 justify-stretch mx-auto py-4 text-black">
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
                            className="absolute w-100 mx-auto bg-gray-100 rounded-3xl"
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
                                    <span className="text-right text-black prevent-select">
                                        ID: {movie.movieId}
                                    </span>
                                </p>
                            ))}
                        </section>
                    </section>
                    <div className="px-10">
                        <Profile />
                    </div>
                </div>
                {/* Video showed how to add div for mobile phone */}
            </div>
        </nav>
    );
}
