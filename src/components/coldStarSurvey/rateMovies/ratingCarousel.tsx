'use client';

import { JSX, useEffect, useRef } from 'react';
import { useState } from 'react';
import { getMovieById, movie } from '@/actions/movie/movie';
import MovieImage from '@/components/movie/MovieImage';
import MovieTitle from '@/components/movie/MovieTitle';
import RatingPopcorn from './ratingPopcorn';
import LoadingPage from '@/components/loading';

export default function RatingCarousel(): JSX.Element {
    const [imageIndex, setImageIndex] = useState(0);
    const [selectedMovies, setSelectedMovies] = useState<movie[]>([]);

    // loading page
    const [isLoading, setIsLoading] = useState(true);

    // Retrieve data from local storage.
    useEffect(() => {
        const savedMovies = JSON.parse(
            localStorage.getItem('selectedMovies') || '[]'
        );
        setSelectedMovies(savedMovies);
        setIsLoading(false);
    }, []);

    const hasMounted = useRef(false);

    useEffect(() => {
        if (hasMounted.current) {
            localStorage.setItem(
                'selectedMovies',
                JSON.stringify(selectedMovies)
            );
        } else {
            hasMounted.current = true;
        }
    }, [selectedMovies]);
    const removeMovie = async (movieId: number): Promise<void> => {
        setSelectedMovies((prev) =>
            prev.filter((movie) => movie.movieId !== movieId)
        );
    };

    const handlePrevious = (): void => {
        setImageIndex((index) =>
            index === 0 ? selectedMovies.length - 1 : index - 1
        );
    };

    const handleNext = (): void => {
        setImageIndex((index) =>
            index === selectedMovies.length - 1 ? 0 : index + 1
        );
    };

    if (isLoading) return <LoadingPage />;

    return (
        <div className="relative w-full max-w-[800px] h-[500px] mx-auto flex items-center justify-center overflow-visible">
            {/* Carousel layer */}
            <div className="relative w-full h-full">
                {/* Current image (center, front) */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 scale-100 z-20 transition-all duration-500">
                    <MovieImage movieId={selectedMovies[imageIndex]?.movieId} />

                    <h4 className="w-[294px]">
                        <MovieTitle
                            movieId={selectedMovies[imageIndex]?.movieId}
                        />
                    </h4>

                    {/* <RatingPopcorn /> */}
                    <RatingPopcorn
                        movieId={selectedMovies[imageIndex]?.movieId}
                    />

                    <button
                        onClick={() => {
                            // ratedMovies.delete(
                            //     selectedMovies[imageIndex]?.movieId
                            // );
                            removeMovie(selectedMovies[imageIndex]?.movieId);
                            handleNext();
                        }}
                        className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdee7] font-bold py-2 px-4 rounded-sm mr-10 right-0 cursor-pointer"
                    >
                        Remove movie
                    </button>
                    {/* <MovieImage movieId={movieId[imageIndex]?.movieId} />

                   <h4 className="w-[294px] mt-3">
                      <MovieTitle movieId={movieId[imageIndex]?.movieId} />
                   </h4>

                   <RatingPopcorn movieId={movieId[imageIndex]?.movieId} /> */}
                </div>
            </div>

            {/* Navigation buttons */}
            <button
                onClick={handlePrevious}
                className="absolute left-0 z-30 bg-[#282F72] hover:bg-[#424ebd] text-white px-4 py-2 rounded-full shadow"
            >
                ⇦
            </button>
            <button
                onClick={handleNext}
                className="absolute right-0 z-30 bg-[#282F72] hover:bg-[#424ebd] text-white px-4 py-2 rounded-full shadow"
            >
                ⇨
            </button>
        </div>
    );
}
