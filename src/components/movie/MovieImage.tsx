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
    const [loadingImage, setLoadingImage] = useState(true);

    useEffect(() => {
        const getImage = async (): Promise<void> => {
            // Get external movie image URL
            let newImageURL = await getMovieImageURL(movieId);

            // Image done lading
            setLoadingImage(false);

            // If image URL does not exist; use placeholder image
            if (newImageURL === '') {
                newImageURL = '/placeholder.png';
            }

            // Set final URL and update page only once
            setImageURL(newImageURL);
        };
        getImage();
    }, [movieId]); // run on movieId change

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
