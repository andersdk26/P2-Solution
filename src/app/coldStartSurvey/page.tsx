'use client';

import Image from 'next/image';
import { JSX } from 'react';
import { useState, useEffect } from 'react';
import { movie, searchForMovie } from 'app/actions/movie';
import {
    displaySelectedMovies,
    DisplayPopularMovies,
} from '@/components/coldStarSurvey/selectedMovies';

export default function SelectMovies(): JSX.Element {
    // useState array for selected movies.
    const [selectedMovies, setSelectedMovies] = useState<movie[]>([]);

    // Retrieve data from local storage.
    useEffect(() => {
        const savedMovies = JSON.parse(
            localStorage.getItem('selectedMovies') || '[]'
        );
        setSelectedMovies(savedMovies);
    }, []);

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

    // Create a state array for the movies displayed in the grid.
    const [checkedMovies, set_checked_movies] = useState<boolean[]>(
        // Set all indicies to false.
        Array(15).fill(false)
    );

    // Function for selecting and unselecting movies.
    const toggle_check = (index: number): void => {
        // Setter function from React's 'useState' hook.
        set_checked_movies((previousState) => {
            // Create a copy of the state array.
            const newCheckedMovies = [...previousState];

            // Modify copy by toggling the boolean value at the specified index.
            newCheckedMovies[index] = !newCheckedMovies[index];

            // Return modified copy.
            return newCheckedMovies;
        });
    };

    return (
        <main>
            {/* Page header. */}
            <p className="text-center pt-8 text-4xl font-bold">
                Welcome, USERNAME!
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
            <form className="max-w-1/2 mx-auto py-4">
                <input
                    type="search"
                    id="coldStartMovieSearch"
                    className="block w-full p-4 rounded-full bg-gray-100 text-black"
                    placeholder="Search for movies..."
                    // When the user types something, call function to fetch movies with matching search query.
                    onChange={async (e) => {
                        setSearchResult(await searchForMovie(e.target.value));
                    }}
                />
            </form>

            <section
                id="searchResults"
                className="max-w-1/2 mx-auto bg-gray-100 rounded-3xl"
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
            <section className="flex-col items-center justify-center space-y-4">
                {/* Diplay movie posters of movies currently selected */}
                <p className="text-center pt-4 text-xl">Selected movies</p>
                {displaySelectedMovies(selectedMovies, handleSelectMovie)}
                {/* Define a 5x3 grid layout for popular movies. */}
                <p className="text-center text-xl">Popular movies</p>
                {DisplayPopularMovies(handleSelectMovie)};
            </section>

            <section className="flex justify-center items-center py-4 pb-[50vh]">
                <button
                    onClick={() => {
                        if (selectedMovies.length >= 5) {
                            window.location.href =
                                '/coldStartSurvey/rateMovies';
                        }
                    }}
                    className={`${selectedMovies.length >= 5 ? 'bg-blue-500 hover:bg-blue-700 cursor-pointer' : 'disabled bg-neutral-500 cursor-auto'} text-center text-xl text-white font-bold py-4 px-8 rounded-full`}
                >
                    Next step
                </button>
            </section>
        </main>
    );
}
