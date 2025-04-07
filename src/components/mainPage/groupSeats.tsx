'use client';
import React, { JSX } from 'react'; // useState has isDropdown functions

import { useRouter } from 'next/navigation'; // Import useRouter
import Image from 'next/image';

export default function GroupSeats(): JSX.Element {
    const router = useRouter(); // Use the useRouter hook

    const redirrectProfile = (path: string): void => {
        if (path) {
            router.push(path);
        }
    };
    return (
        <section className="centerMyDivPlease text-center content-center justify-center m-auto">
            <p
                className="absolute t-0.5 l-0.5 text-[#fea028] text-8xl cursor-pointer"
                onClick={() => redirrectProfile('/Groups')}
            >
                Groups
            </p>
            <Image
                src={'/img/group seats.png'}
                width={800}
                height={400}
                alt={'Groups page button shortcut'}
                onClick={() => redirrectProfile('/Groups')}
                className="cursor-pointer"
                title="Go to Groups page"
            />
        </section>
    );
}
