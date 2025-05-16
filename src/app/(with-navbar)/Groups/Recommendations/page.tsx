'use client';

import { useState, useEffect } from 'react';
import { JSX } from 'react';
import Image from 'next/image';
import '@/styles/mainPage.css'; // Import my CSS file
import { movie } from '@/actions/movie/movie';
import collaborativeFiltering from '@/components/CollaborativeFiltering/collaborativeFiltering';
import MovieImage from '@/components/movie/MovieImage';
import SideBar from '@/components/sideBar/sideBar';
import { group } from 'console';
import hybridAlgorithm from '@/components/HybridAlgorithm/hybridAlgorithm';
import GroupSeats from '@/components/mainPage/groupSeats';
import LoadingPage from '@/components/loading';

interface Movie {
    title: string;
    image: string;
}

export default function Home(): JSX.Element {
    const [currentPage, setCurrentPage] = useState(0); // Track the current page
    const [recommendedMovies, setRecommendedMovies] = useState<movie[]>([]);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const [groupName, setGroupName] = useState<string>();
    const [groupId, setGroupId] = useState<number>(0);

    // loading page. set to false, because the fetching of recommendations are in an if statement
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const gn = localStorage.getItem('groupName') || ''; // gets the group name from local storage
        setGroupName(gn);

        const gi = localStorage.getItem('groupId') || ''; // gets the group id from local storage
        setGroupId(parseInt(gi));
    }, []);

    useEffect(() => {
        // Get recommended movies by passing user ID as input parameter.
        const getRecommendedMovies = async (): Promise<void> => {
            // if the program runs, set loading to true
            setIsLoading(true);
            setRecommendedMovies(await hybridAlgorithm(groupId, 'group'));
            // once done, set loading to false
            setIsLoading(false);
        };
        if (groupId !== 0) {
            getRecommendedMovies();
        }
    }, [groupId]);

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
            <div>
                {/*Left Panel to Curtain Left Image*/}
                <div className="float-left h-auto w-auto z-2">
                    <Image
                        src="/img/left curtain.png"
                        alt="Curtain Left"
                        quality={100}
                        width={350}
                        height={800}
                    />
                </div>

                {/*Right Panel to Curtain Right Image*/}
                <div className="float-right h-auto w-auto z-2">
                    <Image
                        src="/img/right curtain.png"
                        alt="Curtain Right"
                        quality={100}
                        width={350}
                        height={800}
                    />
                </div>

                {/* Container for the two divs in the center (title, description, and carousel)*/}
                <div className="content-center text-center">
                    {/* Middle Top Pannel to Title and Rec. Description*/}
                    <div className="midTopPannel">
                        {/* Title and description of carousel*/}
                        <h1 className="text-center">
                            Recommendations for {groupName}
                        </h1>
                    </div>

                    {/* Movie Posters */}
                    <div className="carouselWrapper">
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
                                        onClick={
                                            () =>
                                                setSelectedMovieId(
                                                    movie.movieId
                                                ) // gets the posters movieId
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Navigation buttons */}
                    <div className="buttonWrapper">
                        <button onClick={handlePreviousPage}>⇦</button>
                        <button onClick={handleNextPage}>⇨</button>
                    </div>
                    <GroupSeats />
                </div>
            </div>

            {/* Here, the sideBar would appear */}
            <SideBar id={selectedMovieId} setIdFunc={setSelectedMovieId} />
        </>
    );
}
