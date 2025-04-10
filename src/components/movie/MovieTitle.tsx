'use client';

import getMovieTitle from '@/actions/movie/getMovieTitle';
import { JSX, useEffect, useState } from 'react';

type titleProps = {
    movieId: number;
};

export default function GetMovieTitle({ movieId }: titleProps): JSX.Element {
    const [movieTitle, setMovieTitle] = useState('');

    useEffect(() => {
        const getTitle = async () => {
            let title = await getMovieTitle(movieId);
            setMovieTitle(title);
            console.log(`title:${title}`);
        };
        getTitle();
    }, [movieId]);

    return <p>{movieTitle}</p>;
}
