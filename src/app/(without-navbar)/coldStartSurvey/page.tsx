'use client';

import { JSX } from 'react';
import { useState, useEffect } from 'react';
import { movie, searchForMovie } from '@/actions/movie/movie';
import {
    DisplaySelectedMovies,
    DisplayPopularMovies,
} from '@/components/coldStarSurvey/selectedMovies';
import getUsername from '@/actions/logIn/username';
import verifyUser from '@/actions/logIn/authenticateUser';
import collaborativeFiltering from '@/components/CollaborativeFiltering/collaborativeFiltering';

export default function SelectMovies(): JSX.Element {
    // useState array for selected movies.
    const [selectedMovies, setSelectedMovies] = useState<movie[]>([]);

    const [test, setTest] = useState<number>(0);

    //const test = collaborativeFiltering(99999);

    // Retrieve data from local storage.
    useEffect(() => {
        const savedMovies = JSON.parse(
            localStorage.getItem('selectedMovies') || '[]'
        );
        setSelectedMovies(savedMovies);
        const hej = async () => setTest(await collaborativeFiltering(9999));
        hej();
        const fetchUsername = async (): Promise<void> => {
            setUsername(await getUsername(verifyUser()));
        };
        fetchUsername();
    }, []);

    const [username, setUsername] = useState('Username');

    // Function for handling selection of movies.
    const handleSelectMovie = (movie: movie): void => {
        setSelectedMovies((prevSelectedMovies) => {
            const isAlreadySelected = prevSelectedMovies.some(
                (m) => m.movieId === movie.movieId
            );

            let newSelection;

            if (isAlreadySelected) {
                // Remove movie if already selected.
                newSelection = prevSelectedMovies.filter(
                    (m) => m.movieId !== movie.movieId
                );
            } else {
                // Add movie if not selected.
                newSelection = [...prevSelectedMovies, movie];
            }

            // Save updated selection to localStorage
            localStorage.setItem(
                'selectedMovies',
                JSON.stringify(newSelection)
            );

            return newSelection;
        });
    };

    // Create useState array for storing search results.
    const [searchResult, setSearchResult] = useState<movie[]>([]);

    return (
        <main>
            {/* Page header. */}
            <p className="text-center pt-8 text-4xl font-bold">
                Welcome, {username}!
            </p>

            {/* Description of selection process. */}
            <p className="max-w-1/3 mx-auto text-justify text-xl py-4 text-neutral-600">
                Before we can start recommending movies that match your taste,
                we need to know a bit about the type of movies you like. Please
                select at least five movies that you have watched and have an
                opinion about. The more movies you rate, the more accurate your
                recommendations will be. You can always edit your list of movie
                ratings under account settings. If the movie you are looking for
                does not appear in the search results, try adding the year of
                release to your search.
            </p>

            {/* Search bar for finding movies */}
            <form
                className="max-w-[928px] mx-auto py-4"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="search"
                    id="coldStartMovieSearch"
                    className="block w-full p-4 rounded-full bg-gray-100 text-black"
                    placeholder="Search for movies..."
                    // When the user types something, call function to fetch movies with matching search query.
                    onChange={async (e) => {
                        setSearchResult(
                            await searchForMovie(e.target.value, 10)
                        );
                    }}
                />
            </form>

            <section
                id="searchResults"
                className="max-w-[928px] mx-auto bg-gray-100 rounded-3xl"
            >
                {searchResult.map((movie) => (
                    <p
                        key={movie.movieId} // movieId is used as identifier as it ensures that each item has a unique key.
                        onClick={() => handleSelectMovie(movie)} // Call function to toggle movie selection when clicked on.
                        className={`py-2 px-4 flex justify-between ${selectedMovies.some((m) => m.movieId === movie.movieId) ? 'bg-green-500 font-bold' : 'bg-gray-100 font-normal'} hover:bg-blue-500 text-black hover:text-white rounded-3xl cursor-pointer`}
                    >
                        <span className="text-left prevent-select">
                            {movie.movieTitle}
                        </span>
                        <span className="text-right prevent-select">
                            ID: {movie.movieId}
                        </span>
                    </p>
                ))}
            </section>

            {/* Create div for containing grids. */}
            <section className="flex-col items-center justify-center space-y-4 pb-[50vh]">
                {/* Display movie posters of movies currently selected */}
                <p className="text-center pt-4 text-xl">Selected movies</p>
                {DisplaySelectedMovies(selectedMovies, handleSelectMovie)}
                {/* Define a 5x3 grid layout for popular movies. */}
                <p className="text-center text-xl">Popular movies</p>
                {DisplayPopularMovies(handleSelectMovie)}
            </section>

            <section className="fixed bottom-0 pl-16 left-0 w-full bg-gray-100 py-4 flex justify-between items-center">
                {/* Progress bar section. */}
                <section className="w-4/5 flex justify-center px-8">
                    <section className="w-full bg-gray-200 rounded-full h-5">
                        <section
                            className="bg-[#282F72] rounded-full h-full transition-all duration-500"
                            style={{
                                width: `${Math.min((selectedMovies.length / 5) * 100, 100)}%`,
                            }}
                        ></section>
                    </section>
                </section>

                {/* "Next step" button section. */}
                <section className="w-1/5 pr-16 flex justify-center">
                    <button
                        onClick={() => {
                            if (selectedMovies.length >= 5) {
                                window.location.href =
                                    '/coldStartSurvey/rateMovies';
                            }
                        }}
                        className={`${selectedMovies.length >= 5 ? 'bg-[#282F72] hover:bg-[#424ebd] cursor-pointer' : 'disabled bg-neutral-500 cursor-auto'} text-center text-xl text-[#dcdeef] font-bold py-4 px-8 rounded-full`}
                    >
                        Next step
                    </button>
                </section>
            </section>
        </main>
    );
}
