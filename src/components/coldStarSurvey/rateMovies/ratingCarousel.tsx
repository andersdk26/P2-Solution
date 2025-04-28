'use client';

import { JSX, useEffect, useRef } from 'react';
import { useState } from 'react';
import { getMovieById, movie } from '@/actions/movie/movie';
import MovieImage from '@/components/movie/MovieImage';
import MovieTitle from '@/components/movie/MovieTitle';
import RatingPopcorn from './ratingPopcorn';
import ratedMovies from '@/components/coldStarSurvey/rateMovies/ratingUtils';

export default function RatingCarousel(): JSX.Element {
    const [imageIndex, setImageIndex] = useState(0);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [selectedMovies, setSelectedMovies] = useState<movie[]>([]);

    // Retrieve data from local storage.
    useEffect(() => {
        const savedMovies = JSON.parse(
            localStorage.getItem('selectedMovies') || '[]'
        );
        setSelectedMovies(savedMovies);
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

    const handleRatingChange = (rating: number): void => {
        const id = selectedMovies[imageIndex]?.movieId;
        ratedMovies.set(id, rating);
        setSelectedRating(rating);
    };

    const handlePrevious = (): void => {
        setImageIndex((index) =>
            index === 0 ? selectedMovies.length - 1 : index - 1
        );
        clearSelection();
    };

    const handleNext = (): void => {
        setImageIndex((index) =>
            index === selectedMovies.length - 1 ? 0 : index + 1
        );
        clearSelection();
    };

    const clearSelection = (): void => {
        setSelectedRating(null);
    };

    return (
        <div className="relative w-full max-w-[800px] h-[500px] mx-auto flex items-center justify-center overflow-visible">
            {/* Carousel layer */}
            <div className="relative w-full h-full">
                {/* Current image (center, front) */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 scale-100 z-20 transition-all duration-500">
                    <MovieImage movieId={selectedMovies[imageIndex]?.movieId} />
                    {/* <RatingPopcorn /> */}
                    <form className="scale-200">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <input
                                key={rating}
                                type="radio"
                                value={rating}
                                name="poprating"
                                checked={selectedRating === rating}
                                onChange={() => handleRatingChange(rating)}
                            />
                        ))}
                    </form>

                    <h4 className="w-[294px]">
                        <MovieTitle
                            movieId={selectedMovies[imageIndex]?.movieId}
                        />
                    </h4>

                    <RatingPopcorn />

                    <button
                        onClick={() => {
                            ratedMovies.delete(
                                selectedMovies[imageIndex]?.movieId
                            );
                            removeMovie(selectedMovies[imageIndex]?.movieId);
                            handleNext();
                        }}
                        className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold py-2 px-4 rounded-sm mr-10 right-0 cursor-pointer"
                    >
                        Remove movie
                    </button>
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
