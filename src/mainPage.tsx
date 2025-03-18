'use client';

import { useState } from 'react';
import MoviePoster from '@/styles/mainPage';
import Sidebar from '@/styles/mainPage';

export default function Home() {
    const [sidebarImage, setSidebarImage] = useState(null);

    return (
        <div className="container">
            <h1>Jamfest</h1>
            <div className="posterRow">
                <MoviePoster
                    title="Test"
                    imageSrc="/Poster/TestPoster.jpg"
                    openSidebar={setSidebarImage}
                />
                <MoviePoster
                    title="Movie 2"
                    imageSrc="/Poster/movie2.jpg"
                    openSidebar={setSidebarImage}
                />
                <MoviePoster
                    title="Movie 3"
                    imageSrc="/Poster/movie3.jpg"
                    openSidebar={setSidebarImage}
                />
                <MoviePoster
                    title="Movie 4"
                    imageSrc="/Poster/movie4.jpg"
                    openSidebar={setSidebarImage}
                />
            </div>
            <Sidebar
                imageSrc={sidebarImage}
                closeSidebar={() => setSidebarImage(null)}
            />
        </div>
    );
}
