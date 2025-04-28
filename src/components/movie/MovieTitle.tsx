'use client';

import getMovieTitle from '@/actions/movie/getMovieTitle';
import { JSX, useEffect, useState } from 'react';

type titleProps = {
    movieId: number;
};

export default function GetMovieTitle({ movieId }: titleProps): JSX.Element {
    const [movieTitle, setMovieTitle] = useState('');

    useEffect(() => {
        const getTitle = async (): Promise<void> => {
            if (!movieId) return; // If no movieId is provided, do nothing
            const title = await getMovieTitle(movieId); // Fetch the movie title by ID
            setMovieTitle(title); //
        };
        getTitle();
    }, [movieId]);

    return <p>{movieTitle}</p>;
}
