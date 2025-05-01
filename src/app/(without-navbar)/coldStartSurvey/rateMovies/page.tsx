'use client';

import { JSX } from 'react';
import { useState, useEffect } from 'react';
import { movie } from '@/actions/movie/movie';
import { useRouter } from 'next/navigation'; // Import useRouter
import Image from 'next/image';
import RatingCarousel from '@/components/coldStarSurvey/rateMovies/ratingCarousel';
import GetMovieImage from '@/components/movie/MovieImage';
import GetMovieTitle from '@/components/movie/MovieTitle';
import saveMovieRatings from '@/actions/movie/saveMovieRating';
import verifyUser from '@/actions/logIn/authenticateUser';
import useRedirect from '@/components/redirect';
import ratedMovies from '@/components/coldStarSurvey/rateMovies/ratingUtils';

type rating = {
    movieId: number;
    rating: number;
};

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
    const redirect = useRedirect(); // Custom hook for redirection
    // Declare array of selected movies.
    const [selectedMovies, setSelectedMovies] = useState<movie[]>([]);

    // Retrieve data from local storage.
    useEffect(() => {
        const savedMovies = JSON.parse(
            localStorage.getItem('selectedMovies') || '[]'
        );
        setSelectedMovies(savedMovies);
        console.log('savedMovies', savedMovies);
    }, []);

    return (
        <main>
            <h1 className="content-center text-center m-auto">
                Rate your movies!
            </h1>

            <button
                onClick={() => redirect('coldStartSurvey')}
                className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdee7] font-bold py-2 px-4 rounded-sm ml-10"
            >
                Back
            </button>

            <section className="m-auto text-center content-center justify-center">
                <RatingCarousel />
            </section>

            <button
                onClick={() => {
                    // for (const rating of ratedMovies) {
                    //     saveMovieRatings(userId, rating[0], rating[1]);
                    // }
                    localStorage.removeItem('selectedMovies');
                    redirect('');
                }}
                className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdee7] font-bold py-2 px-4 rounded-sm mr-10 right-0 absolute cursor-pointer"
            >
                Submit
            </button>

            {/* <section>
                {selectedMovies.map((movie) => (
                    <div key={movie.movieId}>
                        <p>{movie.movieTitle}</p>
                    </div>
                ))}
            </section> */}
        </main>
    );
}
