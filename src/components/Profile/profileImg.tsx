'use client';
import React, { JSX } from 'react';
import Image from 'next/image';

const ProfileImage = (): JSX.Element => (
    <Image
        src="/popcornImage.jpeg"
        alt="Profile Icon"
        width={64}
        height={64}
        className="rounded-full border-1 border-black"
    />
);

export default ProfileImage;
