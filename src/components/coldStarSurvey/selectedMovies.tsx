'use client';

import { JSX } from 'react';
import { movie, getMoviesByIds } from 'app/actions/movie';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export function DisplaySelectedMovies(
    selectedMovies: movie[],
    handleSelectMovie: (movie: movie) => void
): JSX.Element {
    return (
        <section
            id="selectedMovies"
            className={`w-1/2 mx-auto grid grid-cols-5 gap-4 p-8 bg-gray-100 rounded-3xl transition-all duration-300 prevent-select`}
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
        // Array of ids of popular movies.
        const popularMovieIds = [
            109487, 318, 858, 296, 130219, 2116, 3578, 79132, 202439, 106782,
            47, 2959, 527, 541, 364, 4262, 480, 356, 2288, 1240, 1258, 4896,
            1387, 225984, 177765,
        ];

        const fetchMovies = async () => {
            // Call the bulk fetching function.
            const movies = await getMoviesByIds(popularMovieIds);

            // Set the state with the fetched movies.
            setPopularMovies(movies);
        };

        fetchMovies();
    }, []);

    console.log(popularMovies);

    return (
        <section
            id="selectedMovies"
            className={`w-1/2 mx-auto grid grid-cols-5 gap-4 p-8 bg-gray-100 rounded-3xl transition-all duration-300 prevent-select`}
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
