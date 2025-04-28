'use client';

import verifyUser from '@/actions/logIn/authenticateUser';
import getSeenMovies from '@/actions/profileSettings/getSeenMovies';
import MovieImage from '@/components/movie/MovieImage';
import { useEffect, useState, useRef } from 'react';
import ratedMovies from '@/components/coldStarSurvey/rateMovies/ratingUtils';

import SideBar from '@/components/sideBar/sideBar';

export default function UserStats() {
    const [seenMovies, setSeenMovies] = useState<number[]>([]);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const [sidebarImage, setSidebarImage] = useState<string | null>(null);
    const backgroundDivRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchSeenMovies = async () => {
            setSeenMovies(await getSeenMovies(await verifyUser()));
        };
        fetchSeenMovies();
    }, []);

    const hej = (id: number) => {
        SideBar(id);
    };

    return (
        <>
            <section className="p-8">
                <section className="mt-10 ml-65 mr-65 pt-10 pb-10 rounded-sm bg-[#9fa3d1] text-center">
                    <h1>User Statistics</h1>
                    <div className="m-5 bg-[#babdde] rounded-sm">
                        Amount of movies: `${}´;
                    </div>

                    <div className="bg-[#babdde] m-5 p-4 rounded-sm">
                        <h2>Your Seen and Rated Movies</h2>
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
            <SideBar id={selectedMovieId || 0} />
        </>
    );
}
