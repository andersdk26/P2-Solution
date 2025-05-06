'use client';

import verifyUser from '@/actions/logIn/authenticateUser';
import getSeenMovies from '@/actions/profileSettings/getSeenMovies';
import MovieImage from '@/components/movie/MovieImage';
import { JSX, useEffect, useState } from 'react';

import ChartGenres from '@/components/Profile/ProfileSettings/chartGenres';

import SideBar from '@/components/sideBar/sideBar';
import LoadingPage from '@/components/loading';

export default function UserStats(): JSX.Element {
    const [seenMovies, setSeenMovies] = useState<number[]>([]);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSeenMovies = async (): Promise<void> => {
            setSeenMovies(await getSeenMovies(await verifyUser()));
            setIsLoading(false);
        };
        fetchSeenMovies();
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <>
            <section className="p-8">
                <section className="mt-10 ml-65 mr-65 pt-10 pb-10 rounded-sm bg-[#9fa3d1] text-center">
                    <h1>User Statistics</h1>

                    <ChartGenres />

                    <div className="bg-[#babdde] m-5 p-4 rounded-sm">
                        <h2>Your Rated Movies</h2>
                        <button>
                            {/* every element is mapped to having an id
                             * every MovieImage is getting an id number */}
                            {seenMovies.map((id) => (
                                <MovieImage
                                    key={id}
                                    movieId={id}
                                    className="w-50 inline m-2 rounded-sm cursor-pointer"
                                    onClick={() => setSelectedMovieId(id)}
                                />
                            ))}
                        </button>
                    </div>
                </section>
            </section>
            <SideBar id={selectedMovieId} setIdFunc={setSelectedMovieId} />
        </>
    );
}
