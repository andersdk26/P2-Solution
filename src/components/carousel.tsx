// photo carousel
//source: https://www.youtube.com/watch?v=Kx8XlKRBZx8

'use client';

import { JSX } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import GetMovieImage from './GetMovieImage';

type CarouselProps = {
    movieIds: number[];
};

export default function Carousel({ movieIds }: CarouselProps): JSX.Element {
    const [imageIndex, setImageIndex] = useState(0);

    const prevIndex = (imageIndex - 1 + movieIds.length) % movieIds.length;
    const nextIndex = (imageIndex + 1) % movieIds.length;

    return (
        <div className="relative w-full max-w-[800px] h-[500px] mx-auto flex items-center justify-center overflow-visible">
            {/* Carousel layer */}
            <div className="relative w-full h-full">
                {/* Previous image (left, behind) */}
                <div className="absolute top-0 left-1/2 transform -translate-x-[150%] scale-90 opacity-70 z-10 transition-all duration-500">
                    <GetMovieImage movieId={movieIds[prevIndex]} />
                </div>

                {/* Current image (center, front) */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 scale-100 z-20 transition-all duration-500">
                    <GetMovieImage movieId={movieIds[imageIndex]} />
                </div>

                {/* Next image (right, behind) */}
                <div className="absolute top-0 left-1/2 transform translate-x-[50%] scale-90 opacity-70 z-10 transition-all duration-500">
                    <GetMovieImage movieId={movieIds[nextIndex]} />
                </div>
            </div>

            {/* Navigation buttons */}
            <button
                onClick={() =>
                    setImageIndex((index) =>
                        index === 0 ? movieIds.length - 1 : index - 1
                    )
                }
                className="absolute left-0 z-30 bg-white/80 hover:bg-white text-black px-4 py-2 rounded-full shadow"
            >
                &lt;
            </button>

            <button
                onClick={() =>
                    setImageIndex((index) =>
                        index === movieIds.length - 1 ? 0 : index + 1
                    )
                }
                className="absolute right-0 z-30 bg-white/80 hover:bg-white text-black px-4 py-2 rounded-full shadow"
            >
                &gt;
            </button>
        </div>
    );
}
/*
    function showNextImage(): void {
        setImageIndex((index) => {
            if (index === movieIds.length - 1) return 0;
            return index + 1;
        });
    }

    function showPrevImage(): void {
        setImageIndex((index) => {
            if (index === 0) return movieIds.length - 1;
            return index - 1;
        });
    }

    return (
        <div className="flex top-20 items-center justify-center">
            {/* <button
                onClick={showPrevImage}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l p-10px"
            >
                &lt;
            </button> */ //}
//<GetMovieImage movieId={1} />

//{/* <button
//onClick={showNextImage}
// className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r p-10px"
//  >
//  &gt;
//</button> */}
// </div>
//  );
//}
