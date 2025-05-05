'use client';

import { JSX, useState, useRef, useEffect } from 'react';
import Profile from '@/components/Profile/profile';
import { movie, searchForMovie } from '@/actions/movie/movie';
import useRedirect from '@/components/redirect';
import Notification from './notification/notification';
import SideBar from './sideBar/sideBar'; // Import SideBar component
import Image from 'next/image';

export default function NavBar(): JSX.Element {
    const redirect = useRedirect(); // Custom hook for redirection
    const [searchResult, setSearchResult] = useState<movie[]>([]);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null); // State for selected movie ID
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
                setSearchQuery(''); // Clear the search input
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return (): void => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="fixed w-full h-24 shadow-x1 -mt-24 z-99">
            <div className="flex justify-between items-center h-full w-full bg-[#9FA3D1]">
                {/* right side div for bar thingies*/}
                <div className="w-48 h-24 flex justify-between items-center h-full">
                    <div className="ml-4 text-xl cursor-pointer">
                        <Image
                            src={'/img/Jamfest logo.png'}
                            alt={'Jamfest Logo'}
                            width={100}
                            height={100}
                            onClick={() => redirect('')}
                            title="Home page"
                        ></Image>
                        {/* <button className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold py-2 px-4 rounded-sm">
                            Home
                        </button> */}
                        />
                    </div>
                </div>
                <section
                    ref={dropdownRef}
                    className="flex-col items-center justify-center z-auto overflow-visible w-110"
                >
                    <form className="w-full justify-start mx-auto py-4 text-black overflow-visible">
                        <input
                            type="search"
                            id="coldStartMovieSearch"
                            className="block w-full p-4 rounded-full bg-gray-100 overflow-visible"
                            placeholder="Search for movies..."
                            value={searchQuery}
                            // When the user types something, call function to fetch movies with matching search query.
                            onChange={async (e) => {
                                const query = e.target.value;
                                setSearchQuery(query); // Update state with input value
                                const results = await searchForMovie(query, 5);
                                setSearchResult(results);
                                setIsDropdownOpen(results.length > 0); // Open dropdown if there are results
                            }}
                        />
                    </form>

                    {isDropdownOpen && (
                        <section
                            id="searchResults"
                            className="absolute w-110 mx-auto bg-gray-100 rounded-3xl"
                        >
                            {searchResult.map((movie) => (
                                <p
                                    key={movie.movieId} // movieId is used as identifier as it ensures that each item has a unique key.
                                    onClick={() => {
                                        setSelectedMovieId(movie.movieId); // Set selected movie ID
                                        setIsDropdownOpen(false); // Close dropdown on selection
                                    }}
                                    className="py-2 px-4 flex justify-between hover:bg-blue-500 hover:text-white rounded-3xl cursor-pointer"
                                >
                                    <span className="text-left text-black prevent-select">
                                        {movie.movieTitle}
                                    </span>
                                </p>
                            ))}
                        </section>
                    )}
                </section>
                <div className="flex justify-between items-center h-full">
                    <ul className="sm:flex">
                        <li className="p-2 text-xl centerMyDivPlease">
                            <button
                                className="basicBtn"
                                onClick={() => redirect('')}
                                title="Home"
                            >
                                Home
                            </button>
                        </li>
                        <li className="p-2 text-xl centerMyDivPlease">
                            <button
                                className="basicBtn"
                                onClick={() => redirect('/Groups')}
                                title="Groups"
                            >
                                Groups
                            </button>
                        </li>
                        <li className="p-2 text-xl centerMyDivPlease">
                            <button
                                className="basicBtn"
                                onClick={() => redirect('/About')}
                                title="About"
                            >
                                About
                            </button>
                        </li>
                    </ul>
                    <div className="pl-10 block">
                        <Notification />
                    </div>
                    <div className="px-10">
                        <Profile />
                    </div>
                </div>
                {/* Render SideBar and pass the selected movie ID */}
                {selectedMovieId !== null && (
                    <SideBar
                        id={selectedMovieId}
                        setIdFunc={setSelectedMovieId}
                    />
                )}
            </div>
        </nav>
    );
}
