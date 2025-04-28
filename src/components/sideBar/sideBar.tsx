'use client';

import { JSX, useState, useRef, useEffect } from 'react';
import { getMovieById } from '@/actions/movie/movie';
import MovieImage from '../movie/MovieImage';
import Image from 'next/image';
import '@/styles/mainPage.css'; // Import my CSS file

export default function SideBar(id: number): JSX.Element {
    const [sidebarImage, setSidebarImage] = useState<string | null>(null);
    const [sidebarAlt, setSidebarAlt] = useState('');
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
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
                setSelectedRating(null); // ??? set the selected rating to null???
                setSelectedMovieId(movieId); // set the rating to the selected movie ID
                if (backgroundDivRef.current) {
                    backgroundDivRef.current.style.display = 'block';
                }
            } catch (error) {
                console.error('Failed to fetch movie by ID:', error);
            }
        }
    };

    // fetching the specific movieId, when clicking on a movieposter
    useEffect(() => {
        const fetchMovie = async () => {
            await handleImageClick(id);
        };
        fetchMovie();
    }, [id]);

    // entire const is basically the same as in ratingPopcorn
    const handleRatingChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newRating = Number(event.target.value); // initialising of newRating to a number of the current value selected

        if (newRating === selectedRating) {
            // if the previously new rating is equal to the newly selected rating,
            setSelectedRating(0); // then delete the raitng
            console.log('deletus'); // console log to visualise the deletion
        } else if (newRating !== selectedRating) {
            // else if the previously new rating does not equal to the current selected rating,
            setSelectedRating(Number(event.currentTarget.value)); // then the current selected rating will become the new rating
            console.log(newRating); // console log to visualise the current rating
        }
    };

    return (
        <>
            {/* Div for deselecting sidebar */}
            {sidebarImage && (
                <div
                    className="fixed top-0 w-full h-full cursor-pointer bg-gray-500/40"
                    id="backgroundDiv"
                    onClick={() => {
                        // on click, make the image dissapear
                        setSidebarImage(null);
                        if (backgroundDivRef.current) {
                            // if the background div is active,
                            backgroundDivRef.current.style.display = 'none'; // then make the background div dissapear
                        }
                    }}
                ></div>
            )}

            {/* Sidebar should only appear if an image is selected */}
            {sidebarImage && (
                <section>
                    <div className="sideBar">
                        <button
                            className="basicBtn cursor-pointer mb-5"
                            onClick={() => {
                                // on click, make the image dissapear
                                setSidebarImage(null);
                                if (backgroundDivRef.current) {
                                    // if the background div is active,
                                    backgroundDivRef.current.style.display =
                                        'none'; // then make the background div dissapear
                                }
                            }}
                        >
                            Close
                        </button>
                        {selectedMovieId !== null && (
                            <MovieImage movieId={selectedMovieId} />
                        )}
                        <h4 className="text-center mt-100 fixed">
                            {sidebarAlt}
                        </h4>
                        {/* Radio Button Row */}
                        <div className="ratingRow">
                            <ul className="mt-20">
                                <li>
                                    <input
                                        type="checkbox"
                                        name="rating"
                                        value="1"
                                        checked={
                                            selectedRating === 1 ||
                                            selectedRating === 2 ||
                                            selectedRating === 3 ||
                                            selectedRating === 4 ||
                                            selectedRating === 5
                                        }
                                        onChange={handleRatingChange}
                                        id="rating1"
                                    />
                                    <label htmlFor="rating1">
                                        <Image
                                            src={
                                                '/img/popcornRating/popcorn1.png'
                                            }
                                            alt={'Popcorn Rating 1'}
                                            width={40}
                                            height={40}
                                            className="popcorn1"
                                            id="popcorn_img1"
                                        ></Image>
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="checkbox"
                                        name="rating"
                                        value="2"
                                        checked={
                                            selectedRating === 2 ||
                                            selectedRating === 3 ||
                                            selectedRating === 4 ||
                                            selectedRating === 5
                                        }
                                        onChange={handleRatingChange}
                                        id="rating2"
                                    />
                                    <label htmlFor="rating2">
                                        <Image
                                            src={
                                                '/img/popcornRating/popcorn2.png'
                                            }
                                            alt={'Popcorn Rating 2'}
                                            width={40}
                                            height={40}
                                            className="popcorn2"
                                            id="popcorn_img2"
                                        ></Image>
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="checkbox"
                                        name="rating"
                                        value="3"
                                        checked={
                                            selectedRating === 3 ||
                                            selectedRating === 4 ||
                                            selectedRating === 5
                                        }
                                        onChange={handleRatingChange}
                                        id="rating3"
                                    />
                                    <label htmlFor="rating3">
                                        <Image
                                            src={
                                                '/img/popcornRating/popcorn3.png'
                                            }
                                            alt={'Popcorn Rating 3'}
                                            width={40}
                                            height={40}
                                            className="popcorn3"
                                            id="popcorn_img3"
                                        ></Image>
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="checkbox"
                                        name="rating"
                                        value="4"
                                        checked={
                                            selectedRating === 4 ||
                                            selectedRating === 5
                                        }
                                        onChange={handleRatingChange}
                                        id="rating4"
                                    />
                                    <label htmlFor="rating4">
                                        <Image
                                            src={
                                                '/img/popcornRating/popcorn4.png'
                                            }
                                            alt={'Popcorn Rating 4'}
                                            width={40}
                                            height={40}
                                            className="popcorn4"
                                            id="popcorn_img4"
                                        ></Image>
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="checkbox"
                                        name="rating"
                                        value="5"
                                        checked={selectedRating === 5}
                                        onChange={handleRatingChange}
                                        id="rating5"
                                    />
                                    <label htmlFor="rating5">
                                        <Image
                                            src={
                                                '/img/popcornRating/popcorn5.png'
                                            }
                                            alt={'Popcorn Rating 5'}
                                            width={40}
                                            height={40}
                                            className="popcorn5"
                                            id="popcorn_img5"
                                        ></Image>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
