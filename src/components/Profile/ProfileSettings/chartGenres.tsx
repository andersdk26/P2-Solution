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

interface genreObject {
    [key: string]: number;
}

export default function ChartGenres(): JSX.Element {
    const [seenMovies, setSeenMovies] = useState<number[]>([]);
    const [movieGenreCount, setMovieGenreCount] = useState<genreObject>({});
    const [genreCountList, setGenreCountList] = useState([<p key={0}></p>]);

    // copied from "/profileSettings/page.tsx"
    // used to get amount of movies to the chart
    useEffect(() => {
        const fetchSeenMovies = async () => {
            setSeenMovies(await getSeenMovies(await verifyUser()));
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
        };
        fetchMovieGenre();
    }, [seenMovies]);

    // from Oliver
    // const [chartData, setChartData] = useState<{
    //     labels: string[];
    //     dataPoints: number[];
    // }>({ labels: [], dataPoints: [] });
    //==//

    // copied from "/profileSettings/page.tsx"
    // used to get movie genres to the chart
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
            <div className="bg-[#babdde] m-5">
                <h2>Movie genre overview</h2>
                <Bar
                    data={{
                        labels: [
                            'All-time rated movies',
                            'Genre1',
                            'Genre2',
                            'Genre3',
                        ], // the x-axis values
                        datasets: [
                            {
                                label: 'Your rated movies', // the value that's being measured
                                data: [seenMovies.length, 1, 2, 3], // the y-axis values
                                backgroundColor: ['rgba(40, 47, 114, 1)'],
                            },
                        ],
                    }}
                />
            </div>
        </>
    );
}
