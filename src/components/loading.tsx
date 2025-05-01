'use client';

import { JSX } from 'react';
import Image from 'next/image';

export default function LoadingPage(): JSX.Element {
    return (
        <>
            {/* left div, About group information */}
            <div
                className={`flex top-4 left-0 z-40 w-full h-full items-center justify-center overflow-scroll`}
            >
                <Image
                    src={'/loadingIcon.gif'}
                    width={200}
                    height={200}
                    alt={'Loading Icon'}
                    className="content-center align-center items-center "
                ></Image>
            </div>
        </>
    );
}
