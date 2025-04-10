'use client';
import React, { JSX } from 'react';
import '@/styles/globals.css';
import HelpBtn from '@/components/Help/HelpBtn';

const helpBtn = (): JSX.Element => (
    <div className="text-center">
        <h1>Help</h1>
        <HelpBtn open title="Who are we?">
            We are group number ... from Software!
        </HelpBtn>
        <HelpBtn open title="What is this website?">
            This is a website where you and/or your group can recieve movie
            recommendations, in case you guys can't agree on anything to watch!
        </HelpBtn>
        <HelpBtn open title="When is our project exam?">
            No clue yet ☹️
        </HelpBtn>
        <HelpBtn open title="When is the project deadline due?">
            The 28th of May 2025!
        </HelpBtn>
        <HelpBtn open title="Hvem er Saunagusmester?">
            Mia! 🧖🏻‍♀️
        </HelpBtn>
    </div>
);
export default helpBtn;
