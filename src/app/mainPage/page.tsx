'use client';

import { useState } from 'react';
import react, { JSX } from 'react';
import Image from 'next/image';
import '@/styles/mainPage.css'; // Import my CSS file

export default function Home() {
    const [sidebarImage, setSidebarImage] = useState<string | null>(null);
    const [sidebarAlt, setSidebarAlt] = useState('');

    const handleImageClick = (image: string, altText: string) => {
        setSidebarImage(image);
        setSidebarAlt(altText); // Set the alt text (title) when the image is clicked
    };

    return (
        <div className="container">
            <h1>Jamfest</h1>
            <div className="posterRow">
                <Image
                    className="moviePoster"
                    onClick={() =>
                        handleImageClick(
                            '/Poster/TestPoster.jpg',
                            'TestPoster1'
                        )
                    }
                    src="/Poster/TestPoster.jpg"
                    alt="TestPoster1"
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
                        ></Image>
                        <h2>{sidebarAlt}</h2>
                    </div>
                </>
            )}
        </div>
    );
}
