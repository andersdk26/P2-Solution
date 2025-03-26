// photo carousel
//source: https://www.youtube.com/watch?v=Kx8XlKRBZx8

'use client';

import { JSX } from 'react';
import { useState } from 'react';
import Image from 'next/image';

type CarouselProps = {
    imageUrls: string[];
};

export default function Carousel({ imageUrls }: CarouselProps): JSX.Element {
    const [imageIndex, setImageIndex] = useState(0);

    function showNextImage(): void {
        setImageIndex((index) => {
            if (index === imageUrls.length - 1) return 0;
            return index + 1;
        });
    }

    function showPrevImage(): void {
        setImageIndex((index) => {
            if (index === 0) return imageUrls.length - 1;
            return index - 1;
        });
    }

    return (
        <div className="flex top-20 items-center justify-center">
            <button
                onClick={showPrevImage}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l p-10px"
            >
                &lt;
            </button>
            <div></div>
            <Image
                src={imageUrls[imageIndex]}
                className="rounded-2xl content-center justify-center items-center place-content-center"
                width={320}
                height={480}
                alt="Movie recs"
            />

            <button
                onClick={showNextImage}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r p-10px"
            >
                &gt;
            </button>
        </div>
    );
}
