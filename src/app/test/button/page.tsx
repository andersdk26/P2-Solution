'use client'; // Kører i browseren

import { JSX, useState } from 'react';
import fetchData from '@/components/fetchData';

export default function ClientComponent(): JSX.Element {
    const [count, setCount] = useState(0); // variable initialiseres til 0 og setCount er en funktion til at opdatere variablen
    const [message, setMessage] = useState('');

    const handleClick = async (): Promise<void> => {
        const response = await callServerAction(); // Kald server-funktionen
        alert(response);
    };

    const handleClick2 = async (): Promise<void> => {
        const response = await fetchData();
        setMessage(response);
    };

    return (
        <>
            <button
                onClick={() => setCount(count + 1)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-10"
            >
                Klik her ({count})
            </button>
            <button
                onClick={handleClick}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-10"
            >
                Server kommando
            </button>
            <button
                onClick={handleClick2}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-10"
            >
                Kald Server Action
            </button>
            <p>{message}</p>
        </>
    );
}

async function callServerAction(): Promise<string> {
    'use client'; // Denne funktion kører i browseren

    const response = await fetch('/api/test', {
        // Sender en Post request til /api/test og forventer et svar
        method: 'POST',
        body: JSON.stringify({ action: 'test' }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const object = await response.json(); // Konverterer svaret til et objekt
    console.log(object);

    return object.text; // Returnerer teksten fra objektet
}
