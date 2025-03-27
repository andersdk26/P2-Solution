'use client';

interface Movie {
    title: string;
    image: string;
}

import { useState, useEffect } from 'react';
import { JSX } from 'react';
import Image from 'next/image';
import '@/styles/mainPage.css'; // Import my CSS file
import Carousel from '@/components/carousel';
import GetMovieImage from '@/components/GetMovieImage';

export default function Home(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [sidebarImage, setSidebarImage] = useState<string | null>(null);
    const [sidebarAlt, setSidebarAlt] = useState('');
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(0); // Track the current page

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
    };

    const handleRatingChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        // To change rating
        setSelectedRating(Number(event.target.value));
    };

    const moviesPerPage = 5;
    const startIndex = currentPage * moviesPerPage;
    const moviesToDisplay = movies.slice(
        startIndex,
        startIndex + moviesPerPage
    );

    const handleNextPage = (): void => {
        if ((currentPage + 1) * moviesPerPage < movies.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = (): void => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container">
            <div
                className="block top-20 items-center justify-center z-2"
                onClick={() =>
                    handleImageClick(
                        'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/j067U2Krh9OlM7iDACCHRbod9Hj.jpg',
                        'movie'
                    )
                }
            >
                <Carousel movieIds={[1, 2, 3, 4, 5, 6, 7, 8, 9]}></Carousel>
            </div>

            {/* Sidebar should only appear if an image is selected */}
            {sidebarImage && (
                <>
                    <div className="sideBar">
                        <button onClick={() => setSidebarImage(null)}>
                            Close
                        </button>
                        <img
                            src={sidebarImage}
                            alt={sidebarAlt}
                            width={500}
                            height={500}
                        />
                        <h2>{sidebarAlt}</h2>

                        {/* Radio Button Row */}
                        <div className="ratingRow">
                            <label>
                                <input
                                    type="radio"
                                    name="rating"
                                    value="1"
                                    checked={selectedRating === 1}
                                    onChange={handleRatingChange}
                                />
                                1
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="rating"
                                    value="2"
                                    checked={selectedRating === 2}
                                    onChange={handleRatingChange}
                                />
                                2
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="rating"
                                    value="3"
                                    checked={selectedRating === 3}
                                    onChange={handleRatingChange}
                                />
                                3
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="rating"
                                    value="4"
                                    checked={selectedRating === 4}
                                    onChange={handleRatingChange}
                                />
                                4
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="rating"
                                    value="5"
                                    checked={selectedRating === 5}
                                    onChange={handleRatingChange}
                                />
                                5
                            </label>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
