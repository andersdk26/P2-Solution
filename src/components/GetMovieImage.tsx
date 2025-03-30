// 'use server';
import { db } from 'db';
import { JSX } from 'react';
import Image from 'next/image';
import { movieLinkIdTable, usersTable } from 'db/schema';
import { eq } from 'drizzle-orm';

export type movie = {
    movieId: number;
    movieTitle: string;
    movieGenres: string;
};

interface getMovieImageProps {
    movieId: number;
    height?: number;
    width?: number;
}

export default function GetMovieImage({
    movieId,
    height = undefined,
    width = undefined,
}: getMovieImageProps): JSX.Element {
    return (
        <img
            src={getTMDBImage(movieId)}
            alt="movieImage"
            height={height}
            width={width}
        />
    );
}

function getTMDBImage(movieId: number): string {
    // movie id: 1 ==> TMDB id: 862 from Db

    func(movieId);

    if (movieId === 1) {
        return 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/j067U2Krh9OlM7iDACCHRbod9Hj.jpg';
    } else if (movieId === 2) {
        return 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg';
    } else if (movieId === 3) {
        return 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/31GlRQMiDunO8cl3NxTz34U64rf.jpg';
    } else if (movieId === 4) {
        return 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg';
    } else if (movieId === 5) {
        return 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/6FRFIogh3zFnVWn7Z6zcYnIbRcX.jpg';
    }
    return 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/hvFqDa1ggUIy5RqYEsTOSxQBP0L.jpg';
}

export async function func(movieId: number): Promise<void> {
    // const result = await db
    //     .select({ tmdbId: movieLinkIdTable.tmdbId })
    //     .from(movieLinkIdTable)
    //     .where(eq(movieLinkIdTable.id, movieId));
    // console.log(result);
    const result = await db
        .select({
            id: usersTable.id,
            username: usersTable.username,
            password: usersTable.password,
        })
        .from(usersTable)
        .where(eq(usersTable.username, 'User'));
    console.log(result);
}
