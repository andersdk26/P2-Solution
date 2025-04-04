'use server';
import { db } from 'db';
import { IMDBImageIdTable, movieLinkIdTable } from 'db/schema';
import { eq } from 'drizzle-orm';
import { JSDOM } from 'jsdom';

export default async function getMovieImageURL(
    movieId: number
): Promise<string> {
    const result = await db
        .select({
            tmdbId: movieLinkIdTable.tmdbId,
            imdbId: movieLinkIdTable.imdbId,
            imdbMovieId: IMDBImageIdTable.imageId,
        })
        .from(movieLinkIdTable)
        .leftJoin(
            IMDBImageIdTable,
            eq(movieLinkIdTable.imdbId, IMDBImageIdTable.id)
        )
        .where(eq(movieLinkIdTable.id, movieId));

    console.log(result);

    const imdbPageBody = await fetch(
        `https://www.imdb.com/title/tt${result[0].imdbId}/mediaviewer/rm${result[0].imdbMovieId}/?ref_=tt_ov_i`
    ).then((response) => response.text());
    // .then(
    //     (body) =>
    //         body.split('<img src="https://m.media-amazon.com/images/M/')
    //     // .split(
    //     //     '" sizes="100vw" srcset="https://m.media-amazon.com/images/M/'
    //     // )
    // );
    // .then((body) => new JSDOM(body));
    console.log(imdbPageBody);

    return 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/hvFqDa1ggUIy5RqYEsTOSxQBP0L.jpg';
}
