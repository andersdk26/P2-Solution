'use client';

import { JSX, useEffect, useState } from 'react';
import Image from 'next/image';
import getMovieImageURL from '@/actions/movie/movieImageUrl';

interface MovieImageProps {
    movieId: number;
    title?: string;
    fill?: boolean;
    onClick?: () => void;
    height?: number;
    width?: number;
    alt?: string;
    className?: string;
}

export default function MovieImage({
    movieId,
    fill = false,
    height = 450,
    width = 300,
    alt = 'Movie image',
    className = '',
    title = '',
    onClick = (): void => {},
}: MovieImageProps): JSX.Element {
    const [imageURL, setImageURL] = useState('/placeholder.png');
    const [loadingImage, setLoadingImage] = useState(true);

    useEffect(() => {
        const getImage = async (): Promise<void> => {
            // Get external movie image URL
            let newImageURL = await getMovieImageURL(movieId);

            // Image done loading
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
                title={title}
                onClick={onClick}
                src={imageURL}
                fill={fill}
                alt={alt}
                //height={height}
                //width={width}
                className={`${className} ${loadingImage && 'animate-pulse'}`}
            />
        </>
    );
}
