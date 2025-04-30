'use client';

import verifyUser from '@/actions/logIn/authenticateUser';
import getWatchlist from '@/actions/profileSettings/getWatchlist';
import MovieImage from '@/components/movie/MovieImage';
import { useEffect, useState, useRef } from 'react';
import SideBar from '@/components/sideBar/sideBar';
import LoadingPage from '@/components/loading';

export default function UserStats() {
    const [seenMovies, setSeenMovies] = useState<number[]>([]);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const backgroundDivRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSeenMovies = async () => {
            setSeenMovies(await getWatchlist(await verifyUser()));
            setIsLoading(false);
        };
        fetchSeenMovies();
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <section className="p-8">
            <section className="mt-10 ml-65 mr-65 pt-10 pb-10 rounded-sm bg-[#9fa3d1] text-center">
                <h1>User Statistics</h1>
                <div className="m-5 bg-[#babdde] rounded-sm">
                    Visualisering af stats, evt. m. graffer
                </div>

                <div className="bg-[#babdde] m-5 p-4 rounded-sm">
                    <h2>List of movies you would like to watch</h2>
                    <button>
                        {/* every element is mapped to having an id
                         * every MovieImage is getting an id number */}
                        {seenMovies.map((id) => (
                            <MovieImage
                                key={id}
                                movieId={id}
                                className="w-50 inline m-2 rounded-sm cursor-pointer"
                                onClick={() => {
                                    {
                                        setSelectedMovieId(id);
                                    }
                                }}
                            />
                        ))}
                    </button>
                </div>
            </section>
            <SideBar id={selectedMovieId} setIdFunc={setSelectedMovieId} />
        </section>
    );
}

// {
//     recommendedMovies.map((movie, index) => (
//         <div key={index} className="posterItem">
//             <MovieImage
//                 movieId={movie.movieId}
//                 title={movie.movieTitle}
//                 onClick={() => handleImageClick(movie.movieId)}
//             />
//         </div>
//     ));
// }

// {
//     sidebarImage && (
//         <div
//             className="absolute w-full h-full z-3"
//             id="backgroundDiv"
//             onClick={() => {
//                 setSidebarImage(null);
//                 if (backgroundDivRef.current) {
//                     backgroundDivRef.current.style.display = 'none';
//                 }
//             }}
//         ></div>
//     );
// }

// const handleImageClick = async (movieId: number): Promise<void> => {
//     try {
//         const movie = await getMovieById(movieId); // Fetch movie by ID
//         if (!movie) {
//             console.error(`Movie with ID ${movieId} not found.`);
//             return;
//         }
//         setSidebarImage(`/img/movies/movie${movieId}.png`); // It sets the chosen Poster to the sidebar
//         setSidebarAlt(movie.movieTitle); // Set the chosen movie title to the sidebar
//         setSelectedRating(null); // This part needs some more work
//         setSelectedMovieId(movieId); // set the rating to the selected movie ID
//         if (backgroundDivRef.current) {
//             backgroundDivRef.current.style.display = 'block';
//         }
//     } catch (error) {
//         console.error('Failed to fetch movie by ID:', error);
//     }
// };
