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

    // Description of function.
    const toggleCheck = (index: number) => {
        setCheckedMovies((previousState) => {
            const newCheckedMovies = [...previousState];
            newCheckedMovies[index] = !newCheckedMovies[index];
            return newCheckedMovies;
        });
    };

    return (
        /// Create a div to center nested elements.
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
                            className={`border-4 ${checkedMovies[index] ? 'border-white' : 'border-transparent'} rounded-lg transition-all cursor-pointer`}
                        />
                    </label>
                ))}
            </div>
        </div>
    );
}

// Grid med diverse genre/film.
// Vælg (mindst) 3 film man kan lide.
// Eventuelt vælg genre/film man ikke kan lide.
