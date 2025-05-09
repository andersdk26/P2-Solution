'use client';

interface Movie {
    title: string;
    image: string;
}

import { useState, useEffect } from 'react';
import { JSX } from 'react';
import Image from 'next/image';
import '@/styles/mainPage.css'; // Import my CSS file

import { movie } from '@/actions/movie/movie';
import collaborativeFiltering from '@/components/CollaborativeFiltering/collaborativeFiltering';
import MovieImage from '@/components/movie/MovieImage';
import verifyUser from '@/actions/logIn/authenticateUser';
import GroupSeats from '@/components/mainPage/groupSeats'; //group seats component

import SideBar from '@/components/sideBar/sideBar';
import hybridAlgorithm from '@/components/HybridAlgorithm/hybridAlgorithm';
import LoadingPage from '@/components/loading';

export default function Home(): JSX.Element {
    const [currentPage, setCurrentPage] = useState(0); // Track the current page
    const [recommendedMovies, setRecommendedMovies] = useState<movie[]>([]);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

    // for the loading page
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get recommended movies by passing user ID as input parameter.
        const getRecommendedMovies = async (): Promise<void> => {
            setRecommendedMovies(
                await hybridAlgorithm(await verifyUser(), 'individual')
            );
            setIsLoading(false);
        };

        getRecommendedMovies();
    }, []);

    const moviesPerPage = 3;
    const totalMovies = 30;
    const displayedMovies: Movie[] = Array.from(
        { length: totalMovies },
        (_, index) => ({
            title: '',
            image: `/img/movies/movie${index + 1}.png`,
        })
    );

    const handleNextPage = (): void => {
        setCurrentPage(
            (prev) =>
                (prev + 1) % Math.ceil(displayedMovies.length / moviesPerPage)
        );
    };

    const handlePreviousPage = (): void => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        } else {
            // Go to the last set of movies
            setCurrentPage(
                Math.floor((displayedMovies.length - 1) / moviesPerPage)
            );
        }
    };

    if (isLoading) return <LoadingPage />;

    return (
        <>
            {/*Container for everything in main page below header and above footer*/}
            <div>
                {/*Left Panel to Curtain Left Image*/}
                <div className="float-left h-auto w-auto z-2 select-none">
                    <Image
                        src="/img/left curtain.png"
                        alt="Curtain Left"
                        quality={100}
                        width={350}
                        height={800}
                        draggable="false"
                    />
                </div>

                {/*Right Panel to Curtain Right Image*/}
                <div className="float-right h-auto w-auto z-2 select-none">
                    <Image
                        src="/img/right curtain.png"
                        alt="Curtain Right"
                        quality={100}
                        width={350}
                        height={800}
                        draggable="false"
                    />
                </div>

                {/* Container for the two divs in the center (title, description, and carousel)*/}
                <div className="content-center text-center h-1/2">
                    {/* Middle Top Pannel to Title and Rec. Description*/}
                    <div className="midTopPannel h-1/2">
                        {/* Title and description of carousel*/}
                        <h1 className="text-center select-none h-1/2">
                            🎥Personal Recommendations🎥
                        </h1>
                        <p className="border-solid  text-center text-[#282f72] select-none ">
                            These are your personal recommendations based on
                            your rated movies. If you see a movie you have
                            already watched, you can click on it to rate it.
                        </p>
                    </div>

                    {/* Movie Posters */}
                    <div className="carouselWrapper" draggable="false">
                        <div
                            className="posterRow"
                            style={{
                                transform: `translateX(-${currentPage * 100}%)`,
                                transition: 'transform 0.5s ease-in-out',
                            }}
                        >
                            {recommendedMovies.map((movie, index) => (
                                <div key={index} className="posterItem">
                                    <MovieImage
                                        movieId={movie.movieId}
                                        title={movie.movieTitle}
                                        onClick={() =>
                                            setSelectedMovieId(movie.movieId)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Navigation buttons */}
                    <div className="buttonWrapper h-1/2">
                        <button
                            onClick={handlePreviousPage}
                            //disabled={currentPage === 0}
                            // className="absolute left-2 z-30 bg-white/80 hover:bg-purple-200 text-black px-2 py-45 rounded-full shadow transition duration-200"
                            className="select-none"
                        >
                            ⇦
                        </button>
                        <button
                            onClick={handleNextPage}
                            // disabled={
                            //     (currentPage + 1) * moviesPerPage >=
                            //     movies.length
                            // }
                            //className="absolute right-2 z-30 bg-white/80 hover:bg-pink-200 text-black px-2 py-45 rounded-full  shadow transition duration-200"
                            className="select-none"
                        >
                            ⇨
                        </button>
                    </div>
                </div>
            </div>

            {/* Here, the sideBar appears */}
            <SideBar id={selectedMovieId} setIdFunc={setSelectedMovieId} />

            {/* The group seats, redirects to groups page */}
            <GroupSeats />
        </>
    );
}
