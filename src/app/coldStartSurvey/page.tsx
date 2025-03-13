import Image from 'next/image';
import { JSX } from 'react';

export default function MovieGrid(): JSX.Element {
    return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-5 grid-rows-3 gap-4 p-4">
                {Array.from({ length: 15 }).map((_, index) => (
                    <label key={index} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="hidden"
                            // className="appearance-none cursor-pointer border-2 border-white w-32 h-48 checked:bg-blue-500"
                        />
                        <Image
                            width={128}
                            height={192}
                            src="/img/oppenheimer.png"
                            alt="Oppenheimer movie poster"
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
