'use client';

interface Movie {
    title: string;
    image: string;
}

import { useState, useEffect } from 'react';
import react, { JSX } from 'react';
import Image from 'next/image';
import '@/styles/mainPage.css'; // Import my CSS file

export default function Home() {
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

    const handleImageClick = (image: string, altText: string) => {
        setSidebarImage(image);
        setSidebarAlt(altText); // Set the alt text (title) when the image is clicked
        setSelectedRating(null); // Reset rating when a new image is selected
    };

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // To change rating
        setSelectedRating(Number(event.target.value));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const content = JSON.parse(e.target?.result as string);
                    if (Array.isArray(content)) {
                        setMovies(content);
                    } else {
                        alert(
                            'Invalid file format. Expected an array of movies.'
                        );
                    }
                } catch (error) {
                    alert('Error parsing file. Ensure it is valid JSON.');
                }
            };
            reader.readAsText(file);
        }
    };

    const moviesPerPage = 10;
    const startIndex = currentPage * moviesPerPage;
    const moviesToDisplay = movies.slice(
        startIndex,
        startIndex + moviesPerPage
    );

    const handleNextPage = () => {
        if ((currentPage + 1) * moviesPerPage < movies.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container">
            <h1>Jamfest</h1>

            {/* File Input */}

            {/* Movie Posters */}
            <div className="posterRow">
                {moviesToDisplay.map((movie, index) => (
                    <Image
                        key={index}
                        className="moviePoster"
                        onClick={() =>
                            handleImageClick(movie.image, movie.title)
                        }
                        src={movie.image}
                        alt={movie.title}
                        width={150}
                        height={200}
                    />
                ))}
            </div>

            {/* Sidebar should only appear if an image is selected */}
            {sidebarImage && (
                <>
                    <div className="sideBar">
                        <button onClick={() => setSidebarImage(null)}>
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

            {/* Pagination Controls */}
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
            </div>
        </div>
    );
}
