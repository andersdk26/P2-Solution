'use client';

import React, { JSX } from 'react';
import '@/styles/globals.css';

const Help = (): JSX.Element => (
    <div className="text-center">
        <h1>Help</h1>
        <h3>Here are the most common FAQ we receive! </h3>
        <button className="helpBtn">
            Here is some help with some nice pickuplines my friend
        </button>
        <button className="helpBtn">
            If they made you in C, you would have a pointer to my heart!
        </button>
        <button className="helpBtn">let me be your CSS to your HTML</button>
        <button className="helpBtn">
            Are you a keyboard? Because you are just my type
        </button>
        <button className="helpBtn">
            Are you a computer? Because you are really hot!
        </button>
        <button className="helpBtn">
            Are you a function? Because I want to call you
        </button>
        <button className="helpBtn">
            Fork my heart because I'm ready to commit
        </button>
        <button className="helpBtn">
            I've spent so much time working with computers, you bet I know how
            to turn things on
        </button>
        <button className="helpBtn">
            If I pull and push it in, know that I am already committing.
        </button>
    </div>
);
export default Help;
