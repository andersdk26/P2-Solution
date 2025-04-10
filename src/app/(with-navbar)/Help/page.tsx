'use client';
import React, { JSX } from 'react';
import '@/styles/globals.css';
import HelpBtn from '@/components/Help/HelpBtn';

const helpBtn = (): JSX.Element => (
    <div className="text-center">
        <h1>Help</h1>
        <HelpBtn
            open
            title="Here is some help with some nice pickuplines my friend"
        >
            very nice pickups yes
        </HelpBtn>
        <HelpBtn
            open
            title="Here is some help with some nice pickuplines my friend"
        >
            very nice pickups yes
        </HelpBtn>
        <HelpBtn
            open
            title="Here is some help with some nice pickuplines my friend"
        >
            very nice pickups yes
        </HelpBtn>
        <HelpBtn
            open
            title="Here is some help with some nice pickuplines my friend"
        >
            very nice pickups yes
        </HelpBtn>
        <HelpBtn
            open
            title="Here is some help with some nice pickuplines my friend"
        >
            very nice pickups yes
        </HelpBtn>
    </div>
);
export default helpBtn;
