'use client';

import { useState } from 'react';
import react, { JSX } from 'react';
import Image from 'next/image';
import '@/styles/mainPage.css'; // Import my CSS file

export default function Home() {
    const [sidebarImage, setSidebarImage] = useState<string | null>(null);
    const [sidebarAlt, setSidebarAlt] = useState('');
    const [selectedRating, setSelectedRating] = useState<number | null>(null); // State for radio button selection

    const handleImageClick = (image: string, altText: string) => {
        setSidebarImage(image);
        setSidebarAlt(altText); // Set the alt text (title) when the image is clicked
        setSelectedRating(null); // Reset rating when a new image is selected
    };

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedRating(Number(event.target.value));
    };

    return (
        <div className="container">
            <h1>Jamfest</h1>
            <div className="posterRow">
                <Image
                    className="moviePoster"
                    onClick={() =>
                        handleImageClick('/Poster/TestPoster.jpg', 'Deadpool 1')
                    }
                    src="/Poster/TestPoster.jpg"
                    alt="Deadpool 1"
                    width={150}
                    height={200}
                />
                <Image
                    className="moviePoster"
                    onClick={() =>
                        handleImageClick(
                            '/Poster/TestPoster.jpg',
                            'TestPoster2'
                        )
                    }
                    src="/Poster/TestPoster.jpg"
                    alt="TestPoster2"
                    width={150}
                    height={200}
                />
                <Image
                    className="moviePoster"
                    onClick={() =>
                        handleImageClick(
                            '/Poster/TestPoster.jpg',
                            'TestPoster3'
                        )
                    }
                    src="/Poster/TestPoster.jpg"
                    alt="TestPoster3"
                    width={150}
                    height={200}
                />
                <Image
                    className="moviePoster"
                    onClick={() =>
                        handleImageClick(
                            '/Poster/TestPoster.jpg',
                            'TestPoster4'
                        )
                    }
                    src="/Poster/TestPoster.jpg"
                    alt="TestPoster4"
                    width={150}
                    height={200}
                />
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
        </div>
    );
}
