'use client';

import { JSX, useEffect, useState } from 'react';
import Image from 'next/image';
import getMovieImageURL from '@/actions/movieImageUrl';

interface MovieImageProps {
    movieId: number;
    height?: number;
    width?: number;
    alt?: string;
    className?: string;
}

export default function MovieImage({
    movieId,
    height = 450,
    width = 300,
    alt = 'Movie image',
    className = '',
}: MovieImageProps): JSX.Element {
    const [imageURL, setImageURL] = useState('/placeholder.png');
    const [loadingImage, setLadingImage] = useState(true);

    useEffect(() => {
        const getImage = async (): Promise<void> => {
            setImageURL(await getMovieImageURL(movieId));
            setLadingImage(false);

            if (imageURL === '') {
                setImageURL('/placeholder.png');
            }
        };
        getImage();
    }, [movieId, imageURL]);

    return (
        <>
            <Image
                src={imageURL}
                alt={alt}
                height={height}
                width={width}
                className={`${className} ${loadingImage && 'animate-pulse'}`}
            />
        </>
    );
}
