'use server';

import { movie } from '@/actions/movie/movie';
import { testRatings } from '@/db/schema';
import { db } from 'db';
import { ne } from 'drizzle-orm';

type rating = {
    movieId: number;
    rating: number;
};

export type user = {
    userId: number;
    ratings: rating[];
};

export default async function collaborativeFiltering(
    userId: number
): Promise<number> {
    // Hent alle brugere fra databasen (undtagen den bruger man find anbefalinger til).
    const ratings = await db
        .select({
            userId: testRatings.userId,
            movieId: testRatings.movieId,
            movieRating: testRatings.movieRating,
        })
        .from(testRatings)
        .where(ne(testRatings.userId, userId));

    // Gem dem og deres ratings som user objects i et array.
    // const userRatings = [];

    for (const user of ratings) {
        //console.log(user);
    }

    console.log(ratings.length);

    // Find fem brugere der minder om brugeren der bliver sat ind i funktionen med cosine similarity.
    // Find de fem brugeres ratings, og find gennemsnittet af de film, som flere brugere har rated.
    // Returner en sorteret liste med alle de film de fem brugere har set.

    return 2;
}
