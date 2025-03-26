import { JSX } from 'react';

export default function Home(): JSX.Element {
    return <p>Hello World!</p>;

    // I får et array af movie objekter struktureret på følgende måde:

    /*
    export type movie = {
        movieId: number;
        movieTitle: string;
        movieGenres: string[];
    };
    */

    // Dette array indeholder alle de film brugeren har valgt i første step af cold-start surveyen.

    // Vis titel på film
    // Vis filmplakat
    // Popcorn rating knapper
    // "Har ikke set" knap
    // Finish/submit knap (skal tage en til vores main/homepage samt sende ratings til databasen)
}
