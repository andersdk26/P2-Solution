'use client';

import { JSX, useState, useRef, useEffect } from 'react';
import { movie, getMovieById } from '@/actions/movie/movie';
import MovieImage from '../movie/MovieImage';
import Image from 'next/image';
import saveMovieToWatchlist from '@/actions/movie/saveWatchlist';
import removeMovieToWatchlist from '@/actions/movie/removeWatchlist';
import verifyUser from '@/actions/logIn/authenticateUser';
import { OutgoingMessage } from 'http';
import AddingWatchlistToast from '@/components/toast/addingWatchlistToast';

export default function SideBar(id: number): JSX.Element {
    const [sidebarImage, setSidebarImage] = useState<string | null>(null);
    const [sidebarAlt, setSidebarAlt] = useState('');
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error';
    } | null>(null);

    const backgroundDivRef = useRef<HTMLDivElement | null>(null);
    const [watchlistStatus, setWatchlistStatus] =
        useState<WatchlistStatus>('unset');
    const svgRef = useRef<SVGSVGElement>(null);

    const checkmark = (
        <svg
            ref={svgRef}
            className="mx-auto"
            viewBox="0 0 52 52"
            width="35"
            height="35"
            xmlns="http://www.w3.org/2000/svg"
            begin="indefinite"
        >
            <path
                fill="none"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 27 L22 35 L38 19"
            >
                <animate
                    attributeName="stroke-dasharray"
                    from="0, 100"
                    to="100, 0"
                    dur="2s"
                    fill="freeze"
                />
            </path>
        </svg>
    );

    const cross = (
        <svg
            ref={svgRef}
            className="mx-auto"
            viewBox="0 0 52 52"
            width="35"
            height="35"
            xmlns="http://www.w3.org/2000/svg"
            begin="indefinite"
        >
            <path
                fill="none"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 16 L36 36 M36 16 L16 36"
            >
                <animate
                    attributeName="stroke-dasharray"
                    from="0, 200"
                    to="100, 0"
                    dur="2s"
                    fill="freeze"
                />
            </path>
        </svg>
    );

    const handleImageClick = async (movieId: number): Promise<void> => {
        try {
            const movie = await getMovieById(movieId); // Fetch movie by ID
            if (!movie) {
                console.log(`Movie with ID ${movieId} not found.`);
                return;
            }
            setSidebarImage(`/img/movies/movie${movieId}.png`); // It sets the chosen Poster to the sidebar
            setSidebarAlt(movie.movieTitle); // Set the chosen movie title to the sidebar
            setSelectedRating(null); // This part needs some more work
            setSelectedMovieId(movieId); // set the rating to the selected movie ID
            if (backgroundDivRef.current) {
                backgroundDivRef.current.style.display = 'block';
            }
        } catch (error) {
            console.error('Failed to fetch movie by ID:', error);
        }
    };

    useEffect(() => {
        const fetchMovie = async (): Promise<void> => {
            await handleImageClick(id);
        };
        fetchMovie();
    }, [id]);

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

    const handleAddToWatchlist = async (): Promise<void> => {
        if (selectedMovieId === null) return;
        try {
            const userId = await verifyUser();
            const message = await saveMovieToWatchlist(userId, selectedMovieId);

            if (message === 'Successfully added the Movie to the watchlist.') {
                handleLoadingCompleation('setReq');
                setToast({ message, type: 'success' });
            } else {
                handleLoadingMalfunction('set');
                setToast({ message, type: 'error' });
            }
        } catch {
            setToast({
                message: 'Failed to add movie to watchlist.',
                type: 'error',
            });
        }
    };

    const handleRemovefromWatchlist = async (): Promise<void> => {
        if (selectedMovieId === null) return;
        try {
            const userId = await verifyUser();
            const message = await removeMovieToWatchlist(
                userId,
                selectedMovieId
            );

            if (message === 'Successfully removed the Movie from watchlist.') {
                handleLoadingCompleation('unsetReq');
                setToast({
                    message: 'Successfully removed the Movie from watchlist.',
                    type: 'success',
                });
            } else {
                handleLoadingMalfunction('unset');
                setToast({ message, type: 'error' });
            }
        } catch {
            setToast({
                message: 'Failed to remove movie from watchlist.',
                type: 'error',
            });
        }
    };

    const handleLoadingCompleation = (state: 'setReq' | 'unsetReq'): void => {
        setWatchlistStatus(state === 'setReq' ? 'setCheck' : 'unsetCheck');

        setTimeout(
            () => setWatchlistStatus(state === 'setReq' ? 'set' : 'unset'),
            1000
        );
    };

    const handleLoadingMalfunction = (state: 'set' | 'unset'): void => {
        setWatchlistStatus(state === 'set' ? 'setCross' : 'unsetCross');

        setTimeout(
            () => setWatchlistStatus(state === 'set' ? 'set' : 'unset'),
            1000
        );
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const svg = svgRef.current;
                    const anim = svg?.querySelector(
                        'animate'
                    ) as SVGAnimateElement;
                    anim?.beginElement();
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (svgRef.current) {
            observer.observe(svgRef.current);
        }

        return (): void => observer.disconnect();
    }, [watchlistStatus]);

    type WatchlistStatus =
        | 'set'
        | 'unset'
        | 'setReq'
        | 'unsetReq'
        | 'setCheck'
        | 'unsetCheck'
        | 'setCross'
        | 'unsetCross';

    const spinner = (
        <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mx-auto"
            viewBox="0 0 100 101"
            width="35"
            height="35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
            />
            <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
            />
        </svg>
    );

    return (
        <>
            {/* Toast Notification */}
            {toast && (
                <AddingWatchlistToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
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

            {/* Sidebar should only appear if an image is selected */}
            {sidebarImage && (
                <section className="z-3">
                    <div className="sideBar ">
                        <button
                            className="basicBtn cursor-pointer mb-5"
                            // onClick={() => {
                            //     setSelectedMovieId(null);
                            //     if (backgroundDivRef.current) {
                            //         backgroundDivRef.current.style.display =
                            //             'none';
                            //     }
                            // }}
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
                        {selectedMovieId !== null && (
                            <MovieImage movieId={selectedMovieId} />
                        )}
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
                        {/* buttoonsssssss */}
                        <button
                            className="basicBtn mt-4 w-60 h-12"
                            onClick={() => {
                                switch (watchlistStatus) {
                                    case 'unset':
                                        setWatchlistStatus('setReq');
                                        handleAddToWatchlist();
                                        break;
                                    case 'set':
                                        setWatchlistStatus('unsetReq');
                                        handleRemovefromWatchlist();
                                        break;
                                    default:
                                        break;
                                }
                            }}
                            disabled={
                                watchlistStatus !== 'set' &&
                                watchlistStatus !== 'unset'
                            }
                        >
                            {watchlistStatus === 'unset'
                                ? 'Add to Watchlist'
                                : watchlistStatus === 'set'
                                  ? 'Remove from Watchlist'
                                  : watchlistStatus === 'setCheck'
                                    ? checkmark
                                    : watchlistStatus === 'unsetCheck'
                                      ? checkmark
                                      : watchlistStatus === 'setCross'
                                        ? cross
                                        : watchlistStatus === 'unsetCross'
                                          ? cross
                                          : spinner}
                        </button>
                    </div>
                </section>
            )}
        </>
    );
}
