'use client';
import React, { JSX } from 'react';
import Image from 'next/image';

const ProfileImage = (): JSX.Element => (
    <div className="absolute top-2 right-2">
        <Image
            src="/popcornImage.jpeg"
            alt="Profile Icon"
            width={60}
            height={60}
            className="rounded-full"
        />
    </div>
);

export default ProfileImage;
