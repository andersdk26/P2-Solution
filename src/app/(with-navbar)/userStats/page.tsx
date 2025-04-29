'use client';

import verifyUser from '@/actions/logIn/authenticateUser';
import getSeenMovies from '@/actions/profileSettings/getSeenMovies';
import MovieImage from '@/components/movie/MovieImage';
import { JSX, useEffect, useState, useRef } from 'react';
import ratedMovies from '@/components/coldStarSurvey/rateMovies/ratingUtils';

import ChartGenres from '@/components/Profile/ProfileSettings/chartGenres';

import SideBar from '@/components/sideBar/sideBar';
import getMovieGenres from '@/actions/movie/getMovieGenres';

interface genreObject {
    [key: string]: number;
}

export default function UserStats() {
    const [seenMovies, setSeenMovies] = useState<number[]>([]);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const [movieGenreCount, setMovieGenreCount] = useState<genreObject>({});
    const [genreCountList, setGenreCountList] = useState([<p key={0}></p>]);
    const [sidebarImage, setSidebarImage] = useState<string | null>(null);
    const backgroundDivRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchSeenMovies = async () => {
            setSeenMovies(await getSeenMovies(await verifyUser()));
        };
        fetchSeenMovies();
    }, []);

    useEffect(() => {
        const fetchMovieGenre = async () => {
            const genreCount: genreObject = {};
            for (const movieId of seenMovies) {
                const genres = (await getMovieGenres(movieId)).split('|');
                for (const genre of genres) {
                    genreCount[genre] = genreCount[genre]
                        ? genreCount[genre] + 1
                        : 1;
                }
            }
            setMovieGenreCount(genreCount);
        };
        fetchMovieGenre();
    }, [seenMovies]);

    useEffect(() => {
        const generateGenreObjects = async () => {
            let list: JSX.Element[] = [];

            for (const genre in movieGenreCount) {
                if (
                    Object.prototype.hasOwnProperty.call(movieGenreCount, genre)
                ) {
                    const amount = movieGenreCount[genre] as number;
                    list.push(
                        <p>
                            Amount of {genre} movies rated: {amount}
                        </p>
                    );
                }
            }
            setGenreCountList(list);
        };
        generateGenreObjects();
    }, [movieGenreCount]);

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
            <SideBar id={selectedMovieId || 0} />
        </>
    );
}
