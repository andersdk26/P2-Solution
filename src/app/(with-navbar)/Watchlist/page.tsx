'use client';

import verifyUser from '@/actions/logIn/authenticateUser';
import getWatchlist from '@/actions/profileSettings/getWatchlist';
import MovieImage from '@/components/movie/MovieImage';
import { useEffect, useState, useRef } from 'react';
import SideBar from '@/components/sideBar/sideBar';
import LoadingPage from '@/components/loading';

export default function Watchlist() {
    // info on seen movies
    const [addToWatchlistMovies, setToWatchlist] = useState<number[]>([]);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

    // loading page states
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAddToWatchlistMovies = async () => {
            setToWatchlist(await getWatchlist(await verifyUser()));
            setIsLoading(false);
        };
        fetchAddToWatchlistMovies();
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <section className="p-8">
            <section className="mt-10 ml-65 mr-65 pt-10 pb-10 rounded-sm bg-[#9fa3d1] text-center">
                <h1>Your Watchlist</h1>
                <h2>List of movies you would like to watch</h2>

                <div className="bg-[#babdde] m-5 p-4 rounded-sm">
                    <button>
                        {/* every element is mapped to having an id
                         * every MovieImage is getting an id number */}
                        {addToWatchlistMovies.map((id) => (
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
