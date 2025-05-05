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
    blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAGHRFWHRTb2Z0d2FyZQBQYWludC5ORVQgNS4xLjQS36aDAAAAG0lEQVR4nGOQEJeAIAZXF9e3b9+6urgiseCyANDoCnHLSeiYAAAAAElFTkSuQmCC',
    className = '',
    onClick = (): void => {},
}: MovieImageProps): JSX.Element {
    const [imageURL, setImageURL] = useState('');
    const [loadingImage, setLoadingImage] = useState(true);
    const [placeholderDataURL, setPlaceholderDataURL] = useState<
        string | undefined
    >();

    useEffect(() => {
        const getImage = async (): Promise<void> => {
            if (!movieId) return; // If no movieId is provided, do nothing

            // Get external movie image URL
            const newImage = await getMovieImageURL(movieId);

            // Check if image blurHash exists
            if (newImage.blurHash) {
                setPlaceholderDataURL(newImage.blurHash);
            }

            // Image done loading
            setLoadingImage(false);

            // Set final URL and update page only once
            setImageURL(newImage.url);
        };
        getImage();
    }, [movieId]); // run on movieId change

    return (
        <>
            {fill ? (
                <Image
                    title={title}
                    onClick={onClick}
                    src={imageURL ? imageURL : '/placeholder.png'}
                    alt={alt}
                    fill={true}
                    sizes={`(max-width: ${width}px)`}
                    placeholder={
                        placeholderDataURL ? 'blur' : (blur as PlaceholderValue)
                    }
                    blurDataURL={
                        placeholderDataURL ? placeholderDataURL : blurDataURL
                    }
                    className={`${className} ${loadingImage && 'animate-pulse'} select-none`}
                    draggable="false"
                />
            ) : (
                <Image
                    title={title}
                    onClick={onClick}
                    src={imageURL ? imageURL : '/placeholder.png'}
                    alt={alt}
                    height={height}
                    width={width}
                    placeholder={
                        placeholderDataURL ? 'blur' : (blur as PlaceholderValue)
                    }
                    blurDataURL={
                        placeholderDataURL ? placeholderDataURL : blurDataURL
                    }
                    className={`${className} ${loadingImage && 'animate-pulse'} select-none`}
                    draggable="false"
                />
            )}
        </>
    );
}
