'use client';

import { JSX } from 'react';
import { useState, useEffect } from 'react';
import { movie } from 'app/actions/movie';
import { useRouter } from 'next/navigation'; // Import useRouter
import Image from 'next/image';
import RatingCarousel from '@/components/Rating/ratingCarousel';
import GetMovieImage from '@/components/GetMovieImage';
import GetMovieTitle from '@/components/Rating/getMovieTitle';

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

//movie posters: moviePosters from public
// ####################################################################################################

export default function Home(): JSX.Element {
    // Declare array of selected movies.
    const [selectedMovies, setSelectedMovies] = useState<movie[]>([]);
    const router = useRouter(); // Use the useRouter hook

    // Retrieve data from local storage.
    useEffect(() => {
        const savedMovies = JSON.parse(
            localStorage.getItem('selectedMovies') || '[]'
        );
        setSelectedMovies(savedMovies);
    }, []);

    const redirrectProfile = (path: string): void => {
        if (path) {
            router.push(path);
        }
    };

    return (
        <main>
            <h1 className="content-center text-center m-auto">
                Rate your movies!
            </h1>

            <button
                onClick={() => redirrectProfile('/coldStartSurvey')}
                className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold py-2 px-4 rounded-sm ml-10"
            >
                Back
            </button>

            <section className="m-auto text-center content-center justify-center">
                <RatingCarousel movieId={selectedMovies} />
            </section>

            {/* <section>
                <h2>title</h2>
                {/* <Image className="absolute top-0 left-1/2 transform -translate-x-1/2 scale-100 z-20 transition-all duration-500"></Image> */}
            {/* <Image
                    key={index}
                    src={`moviePosters.movie${x}`}
                    alt="Movie poster"
                    width={320}
                    height={480}
                />
                rating */}
            {/* <button>left</button>
                <button>right</button>
            </section> */}

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
