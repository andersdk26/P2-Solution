'use client';

import { JSX } from 'react';
import { useState } from 'react';
import { movie } from '@/actions/movie/movie';
import MovieImage from '@/components/movie/MovieImage';
import MovieTitle from '@/components/movie/MovieTitle';
import RatingPopcorn from './ratingPopcorn';
import ratedMovies from '@/components/coldStarSurvey/rateMovies/ratingUtils';

type movieProps = { movieId: movie[] };

export default function RatingCarousel({ movieId }: movieProps): JSX.Element {
    const [imageIndex, setImageIndex] = useState(0);

    console.log('Jeg blev kørt');

    return (
        <div className="relative w-full max-w-[800px] h-[500px] mx-auto flex items-center justify-center overflow-visible">
            {/* Carousel layer */}
            <div className="relative w-full h-full">
                {/* Current image (center, front) */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 scale-100 z-20 transition-all duration-500">
                    <MovieImage movieId={movieId[imageIndex]?.movieId} />
                    {/* <RatingPopcorn /> */}
                    <form className="scale-200">
                        <input
                            type="radio"
                            value="1"
                            name="poprating"
                            onChange={() =>
                                ratedMovies.set(movieId[imageIndex]?.movieId, 1)
                            }
                        />
                        <input
                            type="radio"
                            value="1"
                            name="poprating"
                            onChange={() =>
                                ratedMovies.set(movieId[imageIndex]?.movieId, 2)
                            }
                        />
                        <input
                            type="radio"
                            value="1"
                            name="poprating"
                            onChange={() =>
                                ratedMovies.set(movieId[imageIndex]?.movieId, 3)
                            }
                        />
                        <input
                            type="radio"
                            value="1"
                            name="poprating"
                            onChange={() =>
                                ratedMovies.set(movieId[imageIndex]?.movieId, 4)
                            }
                        />
                        <input
                            type="radio"
                            value="1"
                            name="poprating"
                            id="pop5"
                            onChange={() =>
                                ratedMovies.set(movieId[imageIndex]?.movieId, 5)
                            }
                        />
                    </form>

                    <h4 className="w-[294px]">
                        <MovieTitle movieId={movieId[imageIndex]?.movieId} />
                    </h4>

                    <RatingPopcorn />
                </div>
            </div>

            {/* Navigation buttons */}
            <button
                onClick={() =>
                    setImageIndex((index) =>
                        index === 0 ? movieId.length - 1 : index - 1
                    )
                }
                className="absolute left-0 z-30 bg-[#282F72] hover:bg-[#424ebd] text-white px-4 py-2 rounded-full shadow"
            >
                ⇦
            </button>
            <button
                onClick={() =>
                    setImageIndex((index) =>
                        index === movieId.length - 1 ? 0 : index + 1
                    )
                }
                className="absolute right-0 z-30 bg-[#282F72] hover:bg-[#424ebd] text-white px-4 py-2 rounded-full shadow"
            >
                ⇨
            </button>
        </div>
    );
}
