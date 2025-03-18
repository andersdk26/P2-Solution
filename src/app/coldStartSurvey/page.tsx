'use client';

import Image from 'next/image';
import { JSX } from 'react';
import { useState } from 'react';

export default function MovieGrid(): JSX.Element {
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
            <p className="text-center text-base py-4">
                You can always change your movie ratings under profile settings.
            </p>

            <form className="max-w-1/3 mx-auto">
                <input
                    type="search"
                    id="coldStartMovieSearch"
                    className="block w-full p-4 rounded-full bg-gray-100"
                    placeholder="Search for movies..."
                />
            </form>

            {/* Pin selected movies to some sort of list. */}

            {/* Create div for containing the grid. */}
            <div className="flex items-center justify-center">
                {/* Define a 5x3 grid layout for the movies. */}
                <div className="grid grid-cols-5 grid-rows-3 gap-4 p-4">
                    {/* Map an array to 15 checkboxes. */}
                    {Array.from({ length: 15 }).map((_, index) => (
                        <label key={index} className="flex items-center gap-2">
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
                                alt="Movie poster."
                                width={160}
                                height={240}
                                // Toggle a blue border around the image when the movie is selected.
                                className={`border-1 ${checkedMovies[index] ? 'border-blue-500 border-8' : 'border-transparent border-1'} rounded-2xl transition-all shadow-lg cursor-pointer`}
                            />
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
