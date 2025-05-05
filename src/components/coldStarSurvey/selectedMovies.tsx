'use client';

import { JSX } from 'react';
import { movie, getMovieById } from '@/actions/movie/movie';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import MovieImage from '@/components/movie/MovieImage';
import LoadingPage from '../loading';

export function DisplaySelectedMovies(
    selectedMovies: movie[],
    handleSelectMovie: (movie: movie) => void
): JSX.Element {
    return (
        <section
            id="selectedMovies"
            className="w-[928px] min-h-[304px] max-h-[560px] [grid-template-columns:repeat(5,160px)] justify-start mx-auto grid gap-4 p-8 bg-gray-100 rounded-3xl transition-all duration-300 prevent-select overflow-y-auto overflow-x-hidden"
        >
            {selectedMovies.map((m) => (
                <section
                    key={m.movieId}
                    className="relative group w-[160px] h-[240px]"
                >
                    <MovieImage
                        movieId={m.movieId}
                        fill={true}
                        alt={`${m.movieTitle} poster`}
                        blur="blur"
                        className="rounded-2xl transition-all shadow-lg group-hover:brightness-50"
                        title={`${m.movieTitle}`}
                    />

                    <Image
                        src="/remove.png"
                        alt={'Remove button'}
                        width={32}
                        height={32}
                        className="absolute opacity-0 left-[124px] bottom-[204px] group-hover:opacity-100 group-hover:cursor-pointer transition-all duration-300 z-3 rounded-full"
                        title={`${m.movieTitle}`}
                        onClick={() => handleSelectMovie(m)}
                    />
                </section>
            ))}
        </section>
    );
}

export function DisplayPopularMovies(
    selectedMovies: movie[],
    handleSelectMovie: (movie: movie) => void
): JSX.Element {
    const [popularMovies, setPopularMovies] = useState<movie[]>([]);
    const selectedMovieIds = new Set(selectedMovies.map((m) => m.movieId));

    // loading
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Array of ids of popular movies.
        const popularMovieIds = [
            109487, 318, 858, 296, 130219, 2116, 3578, 79132, 202439, 106782,
            47, 2959, 527, 541, 364, 4262, 480, 356, 2288, 1240, 1258, 4896,
            1387, 225984, 177765,
        ];

        const fetchAllMovies = async (): Promise<void> => {
            const moviePromises = popularMovieIds.map((id) => getMovieById(id));
            const moviesWithNulls = await Promise.all(moviePromises);
            const validMovies = moviesWithNulls.filter(
                (movie): movie is movie => movie !== null
            );
            setPopularMovies(validMovies);
            setIsLoading(false);
        };

        fetchAllMovies();

        console.log(popularMovies);
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <section
            id="selectedMovies"
            className="w-[928px] min-h-[304px] [grid-template-columns:repeat(5,160px)] justify-start mx-auto grid gap-4 p-8 bg-gray-100 rounded-3xl transition-all duration-300 prevent-select"
        >
            {popularMovies.map((m) => (
                <div
                    key={m.movieId}
                    className="relative group w-[160px] h-[240px]"
                >
                    <MovieImage
                        movieId={m.movieId}
                        fill={true}
                        alt={`${m.movieTitle} poster`}
                        blur="blur"
                        className={`${selectedMovieIds.has(m.movieId) ? 'brightness-25' : 'group-hover:brightness-120'} fill rounded-2xl transition-all shadow-lg group-hover:cursor-pointer group-hover:scale-105`}
                        title={`${m.movieTitle}`}
                        onClick={() => handleSelectMovie(m)}
                    />
                    {selectedMovieIds.has(m.movieId) && (
                        <Image
                            width={64}
                            height={64}
                            src="/icons/checkmark-white.svg"
                            alt="Movie has been selected."
                            className="absolute top-1/2 left-1/2 w-10 h-10 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-md group-hover:scale-105 transition-all duration-300"
                        />
                    )}
                </div>
            ))}
        </section>
    );
}

function movieImage(m: movie, handleSelectMovie: (m: movie) => void) {
    <section key={m.movieId} className="relative group w-[160px] h-[240px]">
        <MovieImage
            movieId={m.movieId}
            fill={true}
            alt={`${m.movieTitle} poster`}
            blur="blur"
            className="rounded-2xl transition-all shadow-lg group-hover:brightness-50"
            title={`${m.movieTitle}`}
        />

        <Image
            src="/remove.png"
            alt={'Remove button'}
            width={32}
            height={32}
            className="absolute opacity-0 left-[124px] bottom-[204px] group-hover:opacity-100 group-hover:cursor-pointer transition-all duration-300 z-3 rounded-full"
            title={`${m.movieTitle}`}
            onClick={() => handleSelectMovie(m)}
        />
    </section>;
}
