'use client';

import { JSX, useState, useRef, useEffect, use } from 'react';
import { movie, getMovieById } from '@/actions/movie/movie';
import MovieImage from '../movie/MovieImage';
import Image from 'next/image';
import {
    getMovieRating,
    rateMovie,
    removeMovieRating,
} from '@/actions/movie/movieRating';
import RatingPopcorn from '../coldStarSurvey/rateMovies/ratingPopcorn';

export default function SideBar(id: number): JSX.Element {
    const [sidebarImage, setSidebarImage] = useState<string | null>(null);
    const [sidebarAlt, setSidebarAlt] = useState('');

    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const backgroundDivRef = useRef<HTMLDivElement | null>(null);

    const handleImageClick = async (movieId: number): Promise<void> => {
        if (movieId !== 0) {
            try {
                const movie = await getMovieById(movieId); // Fetch movie by ID
                if (!movie) {
                    console.error(`Movie with ID ${movieId} not found.`);
                    return;
                }
                setSidebarImage(`/img/movies/movie${movieId}.png`); // It sets the chosen Poster to the sidebar
                setSidebarAlt(movie.movieTitle); // Set the chosen movie title to the sidebar

                setSelectedRating(0); // This part needs some more work
                setSelectedMovieId(movieId); // set the rating to the selected movie ID
                if (backgroundDivRef.current) {
                    backgroundDivRef.current.style.display = 'block';
                }
            } catch (error) {
                console.error('Failed to fetch movie by ID:', error);
            }
        }
    };

    useEffect(() => {

        (async (): Promise<void> => {
            if (selectedMovieId === null) return; // If no movie is selected, do nothing
            setSelectedRating(await getMovieRating(selectedMovieId));
        })();
    }, [selectedMovieId]); // Get the rating when a movie is selected

    useEffect(() => {
        const fetchMovie = async () => {
            await handleImageClick(id);
        };
        fetchMovie();
    }, [id]);

    const handleRatingChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newRating = Number(event.target.value);
        if (newRating === selectedRating) {
            //undo rating
            setSelectedRating(0);
            removeMovieRating(selectedMovieId as number); // Remove rating from the database
        } else {
            // To change rating
            setSelectedRating(Number(event.target.value));
            rateMovie(selectedMovieId as number, newRating); // Update rating in the database
        }
    };

    return (
        <>
            {/* Div for deselecting sidebar */}
            {sidebarImage && (
                <div
                    className="absolute w-full h-full z-3"
                    id="backgroundDiv"
                    onClick={() => {
                        setSidebarImage(null);
                        if (backgroundDivRef.current) {
                            backgroundDivRef.current.style.display = 'none';
                        }
                    }}
                ></div>
            )}
        
            {/* Sidebar should only appear if an image is selected */}
            {sidebarImage && (
                <section className="z-3">
                    <div className="sideBar ">
                        <button
                            className="basicBtn cursor-pointer mb-5"
                            // onClick={() => {
                            //     setSelectedMovieId(null);
                            //     if (backgroundDivRef.current) {
                            //         backgroundDivRef.current.style.display =
                            //             'none';
                            //     }
                            // }}
                            onClick={() => {
                                setSidebarImage(null);
                                if (backgroundDivRef.current) {
                                    backgroundDivRef.current.style.display =
                                        'none';
                                }
                            }}
                        >
                            Close
                        </button>
                        {selectedMovieId !== null && (
                            <MovieImage movieId={selectedMovieId} />
                        )}
                        <h2>{sidebarAlt}</h2>
                        {/* Rating Buttons */}
                        <RatingPopcorn movieId={selectedMovieId || 0} />
                    </div>
                </section>
            )}
        </>
    );
}
