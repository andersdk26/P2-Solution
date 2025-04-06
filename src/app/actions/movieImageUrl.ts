'use server';
import { db } from 'db';
import { IMDBImageIdTable, movieLinkIdTable } from 'db/schema';
import { eq } from 'drizzle-orm';

export default async function getMovieImageURL(
    movieId: number
): Promise<string> {
    let result;

    // Database
    try {
        // Request IMDB and TMDB movie IDs
        result = await db
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

        if (
            !result ||
            result.length === 0 ||
            ((!result[0].imdbId || !result[0].imdbMovieId) && !result[0].tmdbId)
        ) {
            throw 'Could not find movie id';
        }
    } catch (error) {
        console.error(
            `Error getting movie image for movieId: ${movieId}.`,
            error
        );
        return '';
    }

    // IMDB
    try {
        if (result[0].imdbId && result[0].imdbMovieId) {
            // Add leading zeros to imdb ID
            const imdbId = '0000000'
                .substring(result[0].imdbId.toString().length)
                .concat(result[0].imdbId.toString());

            // Get link to IMDB movie poster
            const imdbFetch = await fetch(
                `https://www.imdb.com/title/tt${imdbId}/mediaviewer/rm${result[0].imdbMovieId}/?ref_=tt_ov_i`
            );

            const imdbFetchBody = await imdbFetch?.text();

            // Find all media-amazon image links
            const imdbImageLink = imdbFetchBody.match(
                /https:\/\/m\.media-amazon.com\/images\/M\/+[a-zA-Z0-9]+@\._V1_\.jpg/g
            );

            // Return imdb image link
            if (imdbImageLink && imdbImageLink.length > 1) {
                return imdbImageLink[1]; // return first image (0 is the prevous image)
            }
        }
    } catch (error) {
        console.error(
            `Error getting IMDB image for movieId: ${movieId}.`,
            error
        );
    }

    // TMDB
    try {
        if (result[0].tmdbId) {
            // Get link to TMDB movie poster
            const tmdbFetch = await fetch(
                `https://www.themoviedb.org/movie/${result[0].tmdbId}`
            );

            const tmdbFetchBody = await tmdbFetch?.text();

            // Find all themoviedb image links
            const tmdbImageLink = tmdbFetchBody.match(
                /https:\/\/media\.themoviedb\.org\/t\/p\/w300_and_h450_bestv2\/+[a-zA-Z0-9]+\.jpg/g
            );

            // Return tmdb image link
            if (tmdbImageLink && tmdbImageLink.length) {
                return tmdbImageLink[0]; // return first image
            }
        }
    } catch (error) {
        console.error(
            `Error getting TMDB image for movieId: ${movieId}.`,
            error
        );
    }

    return '';
}
