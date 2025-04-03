'use client';

import { JSX, useEffect, useState } from 'react';
import Image from 'next/image';
import getMovieImageURL from '@/actions/movieImageUrl';

interface MovieImageProps {
    movieId: number;
    height?: number;
    width?: number;
    alt?: string;
}

export default function MovieImage({
    movieId,
    height = 450,
    width = 300,
    alt = 'Movie image',
}: MovieImageProps): JSX.Element {
    const [imageURL, setImageURL] = useState('/placeholder.png');

    useEffect(() => {
        const getImage = async (): Promise<void> => {
            setImageURL(await getMovieImageURL(movieId));
        };
        getImage();
    }, [movieId]);

    return (
        <>
            <Image src={imageURL} alt={alt} height={height} width={width} />
        </>
    );
}
