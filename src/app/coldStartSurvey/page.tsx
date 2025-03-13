'use client';

import Image from 'next/image';
import { JSX } from 'react';
import { useState } from 'react';

export default function MovieGrid(): JSX.Element {
    // Create a state array for the movies displayed in the grid.
    const [checkedMovies, setCheckedMovies] = useState<boolean[]>(
        // Set all indicies to false.
        Array(15).fill(false)
    );

    // Function for selecting and unselecting movies.
    const toggleCheck = (index: number) => {
        // Setter function from React's 'useState' hook.
        setCheckedMovies((previousState) => {
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
            <p className="text-center py-8 text-2xl">
                Please select at least five movies you have seen and liked.
            </p>
            <p className="text-center text-base">
                Movies selected: {numberOfMoviesSelected}
            </p>
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-5 grid-rows-3 gap-4 p-4">
                    {Array.from({ length: 15 }).map((_, index) => (
                        <label key={index} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="hidden"
                                onChange={() => toggleCheck(index)}
                            />
                            <Image
                                width={192}
                                height={288}
                                src={`/moviePosters/${index}.png`}
                                alt="Movie poster."
                                className={`border-1 ${checkedMovies[index] ? 'border-blue-500 border-8' : 'border-transparent border-1'} rounded-2xl transition-all shadow-lg cursor-pointer`}
                            />
                        </label>
                    ))}
                </div>
            </div>

            <div className="w-full flex justify-center mt-4">
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
