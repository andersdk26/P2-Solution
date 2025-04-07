// /Users/frederikskipper-andersen/Documents/GitHub/P2-Solution/src/components/Profile/ProfileSettings/page.tsx
'use client';
import React, { JSX } from 'react';

import Image from 'next/image';

const ProfileImage = (): JSX.Element => (
    <Image
        src="/popcornImage.jpeg"
        alt="Profile Icon"
        width={64}
        height={64}
        className="rounded-full border border-black cursor-pointer"
    />
);

const ProfileSettings = (): JSX.Element => (
    <div>
        <h1>Profile Settings</h1>
    </div>
);
export default ProfileImage;
