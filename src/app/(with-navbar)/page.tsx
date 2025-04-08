'use client';

interface Movie {
    title: string;
    image: string;
}

import { useState, useEffect, useRef } from 'react';
import { JSX } from 'react';
import Image from 'next/image';
import movieCurtainLeft from './public/img/movieCurtainLeft.png';
import movieCurtainRight from './public/img/movieCurtainRight.png';
import '@/styles/mainPage.css'; // Import my CSS file
import Carousel from '@/components/dump/carousel';

import MovieImage from '@/components/movie/MovieImage';
import MovieTitle from '@/components/movie/MovieTitle';

import verifyUser from '@/actions/logIn/authenticateUser';
import { redirect } from 'next/navigation';
import GroupSeats from '@/components/mainPage/groupSeats'; //group seats component

import { getMoviesByIds } from '@/actions/movie/movie';

export default function Home(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [sidebarImage, setSidebarImage] = useState<string | null>(null);
    const [sidebarAlt, setSidebarAlt] = useState('');
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(0); // Track the current page
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

    const backgroundDivRef = useRef<HTMLDivElement | null>(null);

    const moviesPerPage = 3;
    const totalMovies = 30;
    const displayedMovies: Movie[] = Array.from(
        { length: totalMovies },
        (_, index) => ({
            title: `${index + 1}`,
            image: `/img/movies/movie${index + 1}.png`,
        })
    );

    const getMovieTitleById = (movieId: number): string | null => {
        if (movieId < 1 || movieId > displayedMovies.length) {
            console.error(`Invalid movieId: ${movieId}`);
            return null;
        }
        return displayedMovies[movieId - 1].title; // Adjust for 0-based index
    };

    const handleImageClick = (movieId: number): void => {
        const movieTitle = getMovieTitleById(movieId);
        if (!movieTitle) {
            console.error(`Movie with ID ${movieId} not found.`);
            return;
        }
        setSidebarImage(`/img/movies/movie${movieId}.png`); // Set the sidebar image
        setSidebarAlt(movieTitle); // Use the retrieved title
        setSelectedRating(null);
        setSelectedMovieId(movieId); // Save selected movie ID
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
            <div className="container">
                {/*Left Panel to Curtain Left Image*/}
                <div className="border-solid border-2 border-black float-left">
                    <Image
                        src="/img/movieCurtainLeft.png"
                        alt="Curtain Left"
                        width={150}
                        height={200}
                    />
                </div>

                {/*Right Panel to Curtain Right Image*/}
                <div className="border-solid border-2 border-black float-right">
                    <Image
                        src="/img/movieCurtainRight.png"
                        alt="Curtain Right"
                        width={150}
                        height={200}
                    />
                </div>

                {/* Container for the three divs in the center (title, description, carousel and seats)*/}
                <div className="content-center text-center">
                    {/* Middle Top Pannel to Title and Rec. Description*/}
                    <div className="midTopPannel">
                        {/* Title and description of carousel*/}
                        <h1 className="text-center">
                            🎥Daily Recommendations🎥
                        </h1>
                        <p className="border-solid  text-center text-[#282f72] ">
                            This is your recommendations for the day
                            <br></br>You receive new ones everyday!
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
                                    <MovieImage
                                        movieId={index + 1}
                                        title={movie.title}
                                        onClick={() =>
                                            handleImageClick(index + 1)
                                        }
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Navigation buttons */}
                        <div className="buttonWrapper">
                            <button
                                onClick={handlePreviousPage}
                                //disabled={currentPage === 0}
                                className="absolute left-2 z-30 bg-white/80 hover:bg-purple-200 text-black px-2 py-45 rounded-full shadow transition duration-200"
                            >
                                &lt;
                            </button>

                            <button
                                onClick={handleNextPage}
                                // disabled={
                                //     (currentPage + 1) * moviesPerPage >=
                                //     movies.length
                                // }
                                className="absolute right-2 z-30 bg-white/80 hover:bg-pink-200 text-black px-2 py-45 rounded-full  shadow transition duration-200"
                            />
                        </div>
                    </div>

                    {/*Bottom Middle Pannel to movie seats*/}
                    <div className="border-solid border-2 border-black float-left">
                        <h1>Take a seat 💺💺</h1>
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
                                setSelectedMovieId(null);
                                if (backgroundDivRef.current) {
                                    backgroundDivRef.current.style.display =
                                        'none';
                                }
                            }}
                        >
                            Close
                        </button>
                        {selectedMovieId !== null && (
                            <MovieImage movieId={selectedMovieId} />
                        )}

                        <MovieTitle
                            title={sidebarAlt || 'No Movie Selected'}
                            className="text-xl font-bold text-center"
                        />

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
