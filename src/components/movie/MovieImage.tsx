'use client';

import { JSX, useEffect, useState } from 'react';
import Image from 'next/image';
import getMovieImageURL from '@/actions/movie/movieImageUrl';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';

interface MovieImageProps {
    movieId: number;
    title?: string;
    fill?: boolean;
    height?: number;
    width?: number;
    alt?: string;
    blur?: 'empty' | 'blur';
    blurDataURL?: string;
    className?: string;
    onClick?: () => void;
}

export default function MovieImage({
    movieId,
    title = '',
    fill = false,
    height = 450,
    width = 300,
    alt = 'Movie image',
    blur = 'empty',
    blurDataURL = undefined,
    className = '',
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
            {fill ? (
                <Image
                    title={title}
                    onClick={onClick}
                    src={imageURL}
                    alt={alt}
                    fill={true}
                    sizes={`(max-width: ${width}px)`}
                    placeholder={blur as PlaceholderValue}
                    blurDataURL={blurDataURL}
                    className={`${className} ${loadingImage && 'animate-pulse'}`}
                />
            ) : (
                <Image
                    title={title}
                    onClick={onClick}
                    src={imageURL}
                    alt={alt}
                    height={height}
                    width={width}
                    placeholder={blur as PlaceholderValue}
                    blurDataURL={blurDataURL}
                    className={`${className} ${loadingImage && 'animate-pulse'}`}
                />
            )}
        </>
    );
}
