// official chart.js site: https://www.chartjs.org/docs/latest/charts/bar.html
// chart tutorial: https://www.youtube.com/watch?v=6q5d3Z1-5kQ&ab_channel=CodeComplete
// helped register the right things: https://chatgpt.com/c/681001b2-4470-8012-be33-5d74dbc99f2a

// install chart.js react-chartjs-2

import React, { JSX, useEffect, useState } from 'react';

// import of the specific components used in the chart
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// registration of the used components in the chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

import getSeenMovies from '@/actions/profileSettings/getSeenMovies';
import verifyUser from '@/actions/logIn/authenticateUser';
import getMovieGenres from '@/actions/movie/getMovieGenres';
import LoadingPage from '@/components/loading';

interface genreObject {
    [key: string]: number;
}

export default function ChartGenres(): JSX.Element {
    const [seenMovies, setSeenMovies] = useState<number[]>([]);
    const [movieGenreCount, setMovieGenreCount] = useState({});
    const [genreCountList, setGenreCountList] = useState({
        labels: [''],
        data: [0],
    });

    const [isLoadingMovies, setIsLoadingMovie] = useState(true);
    const [isLoadingGenre, setIsLoadingGenre] = useState(true);
    const [isLoadingObject, setIsLoadingObject] = useState(true);

    // copied from "/profileSettings/page.tsx"
    // used to get amount of movies to the chart
    useEffect(() => {
        const fetchSeenMovies = async () => {
            setSeenMovies(await getSeenMovies(await verifyUser()));
            setIsLoadingMovie(false);
        };
        fetchSeenMovies();
    }, []);

    // copied from "/profileSettings/page.tsx"
    // used to get amount of movies to the chart
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
            setIsLoadingGenre(false);
        };
        fetchMovieGenre();
    }, [seenMovies]);

    // copied from "/profileSettings/page.tsx"
    // used to get movie genres to the chart
    useEffect(() => {
        const generateGenreObjects = async () => {
            const genreCountObject = {
                labels: ['All rated movies'],
                data: [seenMovies.length],
            };

            for (const genre in movieGenreCount) {
                if (
                    Object.prototype.hasOwnProperty.call(movieGenreCount, genre)
                ) {
                    const amount = parseInt(movieGenreCount[genre]);
                    genreCountObject.labels.push(genre);
                    genreCountObject.data.push(amount);
                }
            }
            setGenreCountList(genreCountObject);
            setIsLoadingObject(false);
        };
        generateGenreObjects();
    }, [movieGenreCount]);

    if (isLoadingMovies || isLoadingGenre || isLoadingObject)
        return <LoadingPage />;

    return (
        <>
            <div className="bg-[#babdde] m-5">
                <h2>Movie genre overview</h2>
                <p className="text-[#282f72]">
                    Overview of your rated movies, and their genres
                </p>
                <p className="text-[#282f72]">
                    A movie can have multiple genres
                </p>
                <Bar //chart starts here
                    data={{
                        labels: genreCountList.labels, // the x-axis values
                        datasets: [
                            {
                                label: 'Rated movies', // the value that's being measured
                                data: genreCountList.data, // the y-axis values
                                backgroundColor: ['rgba(40, 47, 114, 1)'],
                            },
                        ],
                    }}
                />
            </div>
        </>
    );
}
