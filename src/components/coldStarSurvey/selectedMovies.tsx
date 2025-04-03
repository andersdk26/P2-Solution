'use client';

import { JSX } from 'react';
import { movie, getMovieById } from 'app/actions/movie';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export function displaySelectedMovies(
    selectedMovies: movie[],
    handleSelectMovie: (movie: movie) => void
): JSX.Element {
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
                    className="rounded-2xl transition-all shadow-lg hover:cursor-pointer"
                    title={`${m.movieTitle}`}
                    onClick={() => handleSelectMovie(m)}
                />
            ))}
        </section>
    );
}

export function DisplayPopularMovies(
    handleSelectMovie: (movie: movie) => void
): JSX.Element {
    const [popularMovies, setPopularMovies] = useState<movie[]>([]);

    useEffect(() => {
        const popularMovieIds = [
            109487, 318, 858, 296, 130219, 2116, 3578, 79132, 202439, 106782,
            47, 2959, 527, 541, 364, 4262, 480, 356, 2288, 1240, 1258, 4896,
            1387, 225984, 177765,
        ];

        const fetchMovies = async () => {
            const moviePromises = popularMovieIds.map((id) => getMovieById(id));

            // Wait for all promises to resolve.
            const movies = await Promise.all(moviePromises);

            // Filter out any null values.
            const validMovies = movies.filter((movie) => movie !== null);

            // Set the state with the fetched movies.
            setPopularMovies(validMovies);
        };

        fetchMovies();
    });

    return (
        <section
            id="selectedMovies"
            className={`w-1/2 mx-auto grid grid-cols-5 gap-4 p-8 bg-gray-100 rounded-3xl transition-all duration-300`}
        >
            {popularMovies.map((m) => (
                <Image
                    key={m.movieId}
                    src="/placeholder.png"
                    alt={`${m.movieTitle} poster`}
                    width={160}
                    height={240}
                    className="rounded-2xl transition-all shadow-lg hover:cursor-pointer"
                    title={`${m.movieTitle}`}
                    onClick={() => handleSelectMovie(m)}
                />
            ))}
        </section>
    );
}
