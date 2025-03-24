'use server';

import { db } from 'db';
import { moviesTable } from 'db/schema';

export type movie = {
    movieId: number;
    movieTitle: string;
    movieGenres: string[];
};

// export let listOfMovies: Array<movie>;

export async function searchForMovie(searchQuery: string): Promise<string[]> {
    // Only search if at least 3 letters are typed.
    if (searchQuery.length < 3) {
        return [];
    }

    // Split search query into words.
    const terms = searchQuery.split(' ');

    const matchingResults = [];

    // Get movies from database
    const movies = await db.select().from(moviesTable);

    console.log(`> Results for query: "${searchQuery}" <`);

    // For every movie fetched.
    for (let i = 0; i < movies.length; i++) {
        let containsTerms = true;
        // Check if the movie titles contains every search term.
        for (let j = 0; j < terms.length; j++) {
            if (
                !movies[i].title
                    .toLowerCase()
                    .includes(terms[j].toLocaleLowerCase())
            ) {
                // If a term is not found in the movie title, set boolean to false and break out of the for loop.
                containsTerms = false;
                break;
            }
        }
        if (containsTerms) {
            console.log(movies[i].title);
            matchingResults.push(movies[i].title);
        }
    }
    console.log('--------------------');
    return matchingResults;
}
