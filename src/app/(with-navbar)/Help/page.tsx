'use client';
import React, { JSX } from 'react';
import '@/styles/globals.css';
import HelpBtn from '@/components/Help/HelpBtn';

const helpBtn = (): JSX.Element => (
    <div className="text-center">
        <h1>FAQ</h1>
        <HelpBtn title="Who are we?">
            We are group cs-25-sw-2-10 from Software!
        </HelpBtn>
        <HelpBtn title="What is this website?">
            This is a website where you and/or your group can recieve movie
            recommendations, in case you guys can&apos;t agree on anything to
            watch!
        </HelpBtn>
        <HelpBtn title="How does my recommendations work?">dsadsadsa</HelpBtn>
        <HelpBtn title="How does my groups recommendations work?">
            The algorithm takes your individual movie recommendations, compares
            it, and finds a movie the entire lot of you might be interested to
            see
        </HelpBtn>
        <HelpBtn title="When is our project exam?">No clue yet ☹️</HelpBtn>
        <HelpBtn title="When is the project deadline due?">
            The 28th of May 2025!
        </HelpBtn>
        <HelpBtn title="Hvem er Saunagusmester?">Mia! 🧖🏻‍♀️</HelpBtn>
    </div>
);
export default helpBtn;
