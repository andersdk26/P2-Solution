'use client';

interface Movie {
    title: string;
    image: string;
}

import { useState, useEffect, useRef } from 'react';
import { JSX } from 'react';
import Image from 'next/image';
import '@/styles/mainPage.css'; // Import my CSS file
import Carousel from '@/components/dump/carousel';

import MovieImage from '@/components/movie/MovieImage';
import verifyUser from '@/actions/logIn/authenticateUser';
import { redirect } from 'next/navigation';
import GroupSeats from '@/components/mainPage/groupSeats'; //group seats component

export default function Home(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [sidebarImage, setSidebarImage] = useState<string | null>(null);
    const [sidebarAlt, setSidebarAlt] = useState('');
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(0); // Track the current page

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
    const totalMovies = 30;
    const displayedMovies = movies.slice(0, totalMovies);

    const handleNextPage = (): void => {
        // if ((currentPage + 1) * moviesPerPage < displayedMovies.length) {
        //     setCurrentPage((prev) => prev + 1);
        // } else {
        //     // Loop back to the first set of movies
        //     setCurrentPage(0); // Start from the first set (page 0)
        // }
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

    useEffect(() => {
        const checkLoginStatus = async (): Promise<void> => {
            if ((await verifyUser()) < 1) {
                redirect('/logIn');
            }
        };
        checkLoginStatus();
    }, []);

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

            {/*Container for everything in main page below header and above footer*/}
            <div>
                {/*Left Panel to Curtain Left Image*/}
                <div className="float-left h-auto w-auto z-2">
                    <Image
                        src="/img/movieCurtainLeft.png"
                        alt="Curtain Left"
                        width={350}
                        height={450}
                    />
                </div>

                {/*Right Panel to Curtain Right Image*/}
                <div className="float-right h-auto w-auto z-2">
                    <Image
                        src="/img/movieCurtainRight.png"
                        alt="Curtain Right"
                        width={350}
                        height={450}
                    />
                </div>

                {/* Container for the two divs in the center (title, description, and carousel)*/}
                <div className="content-center text-center">
                    {/* Middle Top Pannel to Title and Rec. Description*/}
                    <div className="midTopPannel">
                        {/* Title and description of carousel*/}
                        <h1 className="text-center">
                            🎥Daily Recommendations🎥
                        </h1>
                        <p className="border-solid  text-center text-[#282f72] ">
                            This is your recommendations for the day
                            <br></br>You receive new ones every day!<br></br>
                            Click on a movie to rate it
                        </p>
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
                            {displayedMovies.map((movie, index) => (
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
                    </div>
                    {/* Navigation buttons */}
                    <div className="buttonWrapper">
                        <button
                            onClick={handlePreviousPage}
                            //disabled={currentPage === 0}
                            // className="absolute left-2 z-30 bg-white/80 hover:bg-purple-200 text-black px-2 py-45 rounded-full shadow transition duration-200"
                        >
                            ⇦
                        </button>
                        <button
                            onClick={handleNextPage}
                            // disabled={
                            //     (currentPage + 1) * moviesPerPage >=
                            //     movies.length
                            // }
                            // className="absolute right-2 z-30 bg-white/80 hover:bg-pink-200 text-black px-2 py-45 rounded-full  shadow transition duration-200"
                        >
                            ⇨
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar should only appear if an image is selected */}
            {sidebarImage && (
                <section className="z-3">
                    <div className="sideBar">
                        <button
                            className="m-4 text-xl underline cursor-pointer"
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
                        <h3>{sidebarAlt}</h3>

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
            {/* The group seats, redirects to groups page */}
            <GroupSeats />

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
