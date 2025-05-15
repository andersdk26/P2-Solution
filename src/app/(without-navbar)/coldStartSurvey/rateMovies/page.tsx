'use client';

import { JSX } from 'react';
import RatingCarousel from '@/components/coldStarSurvey/rateMovies/ratingCarousel';
import useRedirect from '@/components/redirect';

export default function Home(): JSX.Element {
    const redirect = useRedirect(); // Custom hook for redirection

    return (
        <main>
            <h1 className="content-center text-center m-auto">
                Rate your movies!
            </h1>

            {/* back button to the cold start survey */}
            <button
                onClick={() => redirect('coldStartSurvey')}
                className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdee7] font-bold py-2 px-4 rounded-sm ml-10"
            >
                Back
            </button>

            <section className="m-auto text-center content-center justify-center">
                <RatingCarousel />
            </section>

            {/* submit button that redirects to main page */}
            <button
                onClick={() => {
                    // removes the movies stored during cold start survey
                    localStorage.removeItem('selectedMovies');
                    redirect('//');
                }}
                className="bg-[#282F72] hover:bg-[#424ebd] cursor-pointer text-[#dcdee7] font-bold py-2 px-4 rounded-sm mr-10 right-0 absolute"
            >
                Submit
            </button>
        </main>
    );
}
