'use client';

import { JSX } from 'react';
import { movie } from 'app/actions/movie';
import Image from 'next/image';

export function displaySelectedMovies(selectedMovies: movie[]): JSX.Element {
    return (
        <section
            id="selectedMovies"
            className={`w-1/2 mx-auto grid grid-cols-5 gap-4 p-8 bg-gray-100 rounded-3xl transition-all duration-300`}
        >
            {selectedMovies.map((m) => (
                <Image
                    key={m.movieId}
                    src="/placeholder.png"
                    alt={`${m.movieTitle} poster`}
                    width={160}
                    height={240}
                    className="rounded-2xl transition-all shadow-lg"
                />
            ))}
        </section>
    );
}
