'use client';

import { JSX, useEffect, useState } from 'react';
import Image from 'next/image';

export default function LoadingPage(): JSX.Element {
    const [LoadingGif, setLoadingGif] = useState('/loadingIcon.gif');

    //https://www.freecodecamp.org/news/how-to-use-settimeout-in-react-using-hooks/
    useEffect(() => {
        // Use setTimeout to update the message after 30 seconds
        const timeoutId = setTimeout(() => {
            setLoadingGif('/img/loading gifs/Snake_can_be_completed.gif');
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
