// components/Profile/profile.tsx
'use client';
import React, { JSX } from 'react';
import Image from 'next/image';

const Profile = (): JSX.Element => (
    <Image
        src="/popcornImage.jpeg"
        alt="Profile Icon"
        width={60}
        height={60}
        style={{ borderRadius: '50%' }}
    />
);

export default Profile;
