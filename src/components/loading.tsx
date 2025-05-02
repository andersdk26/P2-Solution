'use client';

import { JSX, useEffect, useState } from 'react';
import Image from 'next/image';

export default function LoadingPage(): JSX.Element {
    const [LoadingGif, setLoadingGif] = useState('/loadingIcon.gif');

    // array of gifs
    const gifs = [
        '/img/loading gifs/entire bee movie in 10 seconds gif.gif',
        '/img/loading gifs/Snake_can_be_completed.gif',
        '/img/loading gifs/spongebob episode gif.gif',
        '/img/loading gifs/subway surfers.gif',
    ];

    //https://www.freecodecamp.org/news/how-to-use-settimeout-in-react-using-hooks/
    useEffect(() => {
        // randomly pick one of the 4 gifs to display after 30 seconds
        const randomNumber = Math.floor(Math.random() * 4);

        // Use setTimeout to update the message after 30 seconds
        const timeoutId = setTimeout(() => {
            setLoadingGif(gifs[randomNumber]);
        }, 30000);

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <>
            <div
                className={`flex top-4 left-0 z-40 w-full h-full items-center justify-center`}
            >
                <Image
                    src={LoadingGif}
                    width={100}
                    height={100}
                    alt={'Loading Icon'}
                    className="content-center align-center items-center justify-center mx-20 my-20"
                ></Image>
            </div>
        </>
    );
}
