'use server';
import { db } from 'db';
import { movieLinkIdTable } from 'db/schema';
import { eq } from 'drizzle-orm';

export default async function getMovieImageURL(
    imageId: number
): Promise<string> {
    // const func = async () => {
    //     const result = await db
    //         .select({ tmdbId: movieLinkIdTable.tmdbId })
    //         .from(movieLinkIdTable)
    //         .where(eq(movieLinkIdTable.id, movieId));

    //     console.log(result);
    // };
    return 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/hvFqDa1ggUIy5RqYEsTOSxQBP0L.jpg';
}
