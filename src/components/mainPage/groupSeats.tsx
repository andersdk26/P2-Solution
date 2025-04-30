'use client';
import React, { JSX } from 'react'; // useState has isDropdown functions

import Image from 'next/image';
import useRedirect from '@/components/redirect';

export default function GroupSeats(): JSX.Element {
    const redirect = useRedirect(); // Custom hook for redirection

    return (
        <section className="centerMyDivPlease text-center content-center justify-center m-auto">
            <p
                className="absolute t-0.5 l-0.5 text-[#fea028] text-8xl cursor-pointer select-none"
                onClick={() => redirect('Groups')}
            >
                Groups
            </p>
            <Image
                src={'/img/group seats.png'}
                width={800}
                height={400}
                alt={'Groups page button shortcut'}
                onClick={() => redirect('Groups')}
                className="cursor-pointer select-none"
                title="Go to Groups page"
                draggable="false"
            />
        </section>
    );
}

