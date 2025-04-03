'use client';

interface Movie {
    title: string;
    image: string;
}

import { useState, useEffect, useRef } from 'react';
import { JSX } from 'react';
import Image from 'next/image';
import '@/styles/mainPage.css'; // Import my CSS file
import Carousel from '@/components/carousel';
import MovieImage from '@/components/movie/MovieImage';

export default function Home(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [sidebarImage, setSidebarImage] = useState<string | null>(null);
    const [sidebarAlt, setSidebarAlt] = useState('');
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(0); // Track the current page
    const [animation, setAnimation] = useState(''); // To store animation class

    const backgroundDivRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        // Fetch the JSON file when the page loads
        fetch('Movie.json')
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error('Error loading movies:', error));
    }, []);

    const handleImageClick = (image: string, altText: string): void => {
        setSidebarImage(image);
        setSidebarAlt(altText); // Set the alt text (title) when the image is clicked
        setSelectedRating(null); // Reset rating when a new image is selected
        if (backgroundDivRef.current) {
            backgroundDivRef.current.style.display = 'block';
        }
    };

    const handleRatingChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newRating = Number(event.target.value);
        if (newRating === selectedRating) {
            //undo rating
            setSelectedRating(0);
        } else {
            // To change rating
            setSelectedRating(Number(event.target.value));
        }
    };

    const moviesPerPage = 3;
    const startIndex = currentPage * moviesPerPage;
    const moviesToDisplay = movies.slice(
        startIndex,
        startIndex + moviesPerPage
    );

    const handleNextPage = (): void => {
        if ((currentPage + 1) * moviesPerPage < movies.length) {
            // Apply both animations simultaneously (outgoing row and incoming row)
            setAnimation('slide-left'); // Slide the current row to the left
            setTimeout(() => {
                // Update the page after a short delay (so both animations occur together)
                setCurrentPage((prev) => prev + 1);
                // After the page is updated, apply the sliding-in effect for the new set of movies
                setAnimation('slide-in-right');
            }, 1000); // Short delay to ensure the first animation starts immediately
        }
    };

    const handlePreviousPage = (): void => {
        if (currentPage > 0) {
            // Start the slide-out animation
            setAnimation('slide-right');

            // Wait for the slide-out animation to complete before updating the page
            setTimeout(() => {
                // Now update the page
                setCurrentPage((prev) => prev - 1);
                // Start the slide-in animation after the slide-out
                setAnimation('slide-in-left');
            }, 1000); // Duration of the slide-out animation
        }
    };

    return (
        <>
            {/* Pagination Controls */}
            <div className="pagination z-2">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={
                        (currentPage + 1) * moviesPerPage >= movies.length
                    }
                >
                    Next
                </button>
            </div>

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

            <div className="container">
                <h1>Movies</h1>
                {/* File Input */}

                {/* Movie Posters */}
                <div className="carouselWrapper">
                    <div key={currentPage} className={`posterRow ${animation}`}>
                        {moviesToDisplay.map((movie, index) => (
                            <div key={index} className="posterItem">
                                <Image
                                    className="moviePoster"
                                    onClick={() =>
                                        handleImageClick(
                                            movie.image,
                                            movie.title
                                        )
                                    }
                                    src={movie.image}
                                    alt={movie.title}
                                    width={150}
                                    height={200}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Navigation buttons */}
                    <div className="buttonWrapper">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 0}
                            className="absolute left-0 z-30 bg-white/80 hover:bg-white text-black px-4 py-2 rounded-full shadow"
                        >
                            &lt;
                        </button>

                        <button
                            onClick={handleNextPage}
                            disabled={
                                (currentPage + 1) * moviesPerPage >=
                                movies.length
                            }
                            className="absolute right-0 z-30 bg-white/80 hover:bg-white text-black px-4 py-2 rounded-full shadow"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
            {/* Movie Carousel
            <div
                className="block top-20 items-center justify-center z-2"
                // onClick={() =>
                //     handleImageClick(
                //         'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/j067U2Krh9OlM7iDACCHRbod9Hj.jpg',
                //         'movie'
                //     )
                // }
            >
                <Carousel movieIds={[1, 2, 3, 4, 5, 6, 7, 8, 9]}></Carousel>
            </div> */}

            {/* Sidebar should only appear if an image is selected */}
            {sidebarImage && (
                <section className="z-3">
                    <div className="sideBar">
                        <button
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
                        <Image
                            src={sidebarImage}
                            alt={sidebarAlt}
                            width={500}
                            height={500}
                        />
                        <h2>{sidebarAlt}</h2>

                        {/* Radio Button Row */}
                        <div className="ratingRow">
                            <ul>
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
                                    {' '}
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
            {/* Pagination Controls
            <div className="pagination">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={
                        (currentPage + 1) * moviesPerPage >= movies.length
                    }
                >
                    Next
                </button>
            </div> */}
            <MovieImage movieId={1} />
        </>
    );
}
