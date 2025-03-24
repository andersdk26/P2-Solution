'use client';

import Image from 'next/image';
import { JSX } from 'react';
import { useState } from 'react';
//import { movie } from '@/components/movie';
import { searchForMovie } from 'app/actions/movie';

export default function MovieGrid(): JSX.Element {
    // Create a state array for the movies displayed in the grid.
    const [checkedMovies, set_checked_movies] = useState<boolean[]>(
        // Set all indicies to false.
        Array(15).fill(false)
    );

    // Create useState array for storing search results.
    const [searchResult, setSearchResult] = useState(['']);

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

    // Get number of movies selected.
    const numberOfMoviesSelected = checkedMovies.filter(
        (checked) => checked
    ).length;

    // Define/update length of progress bar.
    const progress = Math.min((numberOfMoviesSelected / 5) * 100, 100);

    return (
        <div>
            <p className="text-center pt-8 text-2xl">
                Please select and rate at least five movies you&apos;ve watched
                and enjoyed.
            </p>
            <p className="max-w-1/3 mx-auto text-center text-l pt-4">
                The more movies you rate, the more accurate your recommendations
                will be. You can always change your movie ratings under profile
                settings.
            </p>

            {/* Search bar for finding movies */}
            <form className="max-w-1/2 mx-auto p-4">
                <input
                    type="search"
                    id="coldStartMovieSearch"
                    className="block w-full p-4 rounded-full bg-gray-100"
                    placeholder="Search for movies..."
                    // When the user types something, call function to fetch movies with matching search query.
                    onChange={async (e) =>
                        setSearchResult(await searchForMovie(e.target.value))
                    }
                />
            </form>

            <div
                id="searchResults"
                className="max-w-1/2 mx-auto px-8 bg-gray-100 rounded-3xl"
            >
                {searchResult.map((s) => (
                    <p key={s}>{s}</p>
                ))}
            </div>

            {/* Create div for containing grids. */}
            <div className="flex-col items-center justify-center space-y-4">
                {/* Define a grid layout for selected movies. */}
                <p className="text-center text-xl">Selected movies</p>
                <div
                    className={`w-1/2 mx-auto grid grid-cols-5 gap-4 p-8 bg-gray-100 rounded-3xl transition-all duration-300`}
                    // Dynamically adjust height of selected movie box.
                    style={{
                        // Filter out false (unselected) movies, calculate number of rows (based on number of selected movies), multiply number of rows by movie poster height.
                        minHeight: `${(Math.ceil(checkedMovies.filter((c) => c).length / 5) * 240, 240)}px`,
                        maxHeight: '560px',
                        overflowY: 'auto', // Show scrollbar when necessary when enough movies are shown.
                    }}
                >
                    {/* Diplay movie posters of movies currently selected (based on their true/false state from the checkedMovies state array) */}
                    {checkedMovies.map((isChecked, index) =>
                        isChecked ? ( // If a movie is selected, display the movie poster.
                            <Image
                                key={index}
                                src={`/moviePosters/${index}.png`}
                                alt="Selected movie poster"
                                width={160}
                                height={240}
                                className="rounded-2xl transition-all shadow-lg"
                            />
                        ) : // If a movie is not selected, do nothing.
                        null
                    )}
                </div>
                {/* Define a 5x3 grid layout for popular movies. */}
                <p className="text-center text-xl">Popular movies</p>
                <div className="w-1/2 mx-auto grid grid-cols-5 grid-rows-3 gap-4 p-8 bg-gray-100 rounded-3xl">
                    {/* Map an array to 15 checkboxes. */}
                    {Array.from({ length: 15 }).map((_, index) => (
                        <label
                            key={index}
                            className="relative flex items-center gap-2"
                        >
                            <input
                                type="checkbox"
                                // Hide the default checkbox.
                                className="hidden"
                                // Call function to update state array when a checkbox is clicked.
                                onChange={() => toggle_check(index)}
                            />
                            <Image
                                // Display an image of the movie in place of the default checkbox.
                                src={`/moviePosters/${index}.png`}
                                alt="Movie poster"
                                width={160}
                                height={240}
                                // Toggle movie poster brightness.
                                className={`border-none ${checkedMovies[index] ? 'brightness-25' : 'brightness-100'} rounded-2xl transition-all shadow-lg cursor-pointer`}
                            />
                            {/* Show checkmark icon if movie is selected. */}
                            {checkedMovies[index] && (
                                <Image
                                    src="/icons/checkmark-white.svg"
                                    alt="Checkmark"
                                    width={48}
                                    height={48}
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                />
                            )}
                        </label>
                    ))}
                </div>
            </div>

            {/* Create a container for the progress bar and center it horizontally. */}
            <div className="w-full flex justify-center mt-4">
                {/* Define the width and style of the progress bar. */}
                <div className="w-1/3 bg-gray-300 rounded-full mt-4 h-4 ">
                    <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
