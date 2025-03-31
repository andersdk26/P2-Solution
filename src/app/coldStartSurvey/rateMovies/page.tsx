'use client';

import { JSX } from 'react';
import { useState, useEffect } from 'react';
import { movie } from 'app/actions/movie';

export default function Home(): JSX.Element {
    // Declare array of selected movies.
    const [selectedMovies, setSelectedMovies] = useState<movie[]>([]);

    // Retrieve data from local storage.
    useEffect(() => {
        const savedMovies = JSON.parse(
            localStorage.getItem('selectedMovies') || '[]'
        );
        setSelectedMovies(savedMovies);
    }, []);

    // ####################################################################################################
    // I har et useState array (selectedMovies) af movie objekter struktureret på følgende måde:
    /*
        export type movie = {
           movieId: number;
           movieTitle: string;
           movieGenres: string;
        };
    */
    // Dette array indeholder alle de film brugeren har valgt i første step af cold-start surveyen.
    //
    // Her er en liste med ting jeg tænker der nok skal være på siden.
    //
    // Titel på film samt hvilken film man er nået til, f.eks. Titanic (3/8).
    // Filmplakat. Alternativt bare et placeholder billede, indtil vi kan hente filmplakater.
    // Popcorn rating knapper til den viste film.
    // "Har ikke set" knap.
    // Finish/submit knap (skal tage en til vores main/homepage samt sende ratings til databasen).
    //
    // Hvis i kommer i tanke om flere ting kan i selvfølgelig bare tilføje dem.
    // ####################################################################################################

    return (
        <main>
            <p>Hello World!</p>

            <section>
                {selectedMovies.map((movie) => (
                    <div key={movie.movieId}>
                        <p>{movie.movieTitle}</p>
                    </div>
                ))}
            </section>
        </main>
    );
}
