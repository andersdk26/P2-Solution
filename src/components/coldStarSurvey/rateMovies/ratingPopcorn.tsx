'use client';

import { JSX, useEffect, useState } from 'react';
import Image from 'next/image';
import '@/styles/mainPage.css'; // Import CSS file
import {
    getMovieRating,
    rateMovie,
    removeMovieRating,
} from '@/actions/movie/movieRating';

interface RatingPopcornProps {
    movieId: number;
}

export default function RatingPopcorn({
    movieId,
}: RatingPopcornProps): JSX.Element {
    const [selectedRating, setSelectedRating] = useState<number>(0);

    const handleRatingChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newRating = Number(event.target.value); // initialising of newRating to a number of the current value selected

        if (newRating === selectedRating) {
            //undo rating
            setSelectedRating(0);
            removeMovieRating(movieId); // Remove rating from the database
        } else {
            // To change rating
            setSelectedRating(Number(event.target.value));
            rateMovie(movieId, newRating); // Update rating in the database
        }
    };

    useEffect(() => {
        (async (): Promise<void> => {
            if (!movieId) return; // If no movie is selected, do nothing
            setSelectedRating(await getMovieRating(movieId));
        })();
    }, [movieId]); // Get the rating when a movie is selected

    return (
        <div className="ratingRow">
            <ul>
                <li>
                    <input
                        type="checkbox"
                        name="rating"
                        value="1"
                        checked={selectedRating > 0 && selectedRating <= 5}
                        onChange={handleRatingChange}
                        id="rating1"
                    />
                    <label htmlFor="rating1">
                        <Image
                            src={'/img/popcornRating/popcorn1.png'}
                            alt={'Popcorn Rating 1'}
                            width={40}
                            height={40}
                            className="popcorn1"
                            id="popcorn_img1"
                        ></Image>
                    </label>
                </li>
                <li>
                    <input
                        type="checkbox"
                        name="rating"
                        value="2"
                        checked={selectedRating > 1 && selectedRating <= 5}
                        onChange={handleRatingChange}
                        id="rating2"
                    />
                    <label htmlFor="rating2">
                        <Image
                            src={'/img/popcornRating/popcorn2.png'}
                            alt={'Popcorn Rating 2'}
                            width={40}
                            height={40}
                            className="popcorn2"
                            id="popcorn_img2"
                        ></Image>
                    </label>
                </li>
                <li>
                    <input
                        type="checkbox"
                        name="rating"
                        value="3"
                        checked={selectedRating > 2 && selectedRating <= 5}
                        onChange={handleRatingChange}
                        id="rating3"
                    />
                    <label htmlFor="rating3">
                        <Image
                            src={'/img/popcornRating/popcorn3.png'}
                            alt={'Popcorn Rating 3'}
                            width={40}
                            height={40}
                            className="popcorn3"
                            id="popcorn_img3"
                        ></Image>
                    </label>
                </li>
                <li>
                    <input
                        type="checkbox"
                        name="rating"
                        value="4"
                        checked={selectedRating > 3 && selectedRating <= 5}
                        onChange={handleRatingChange}
                        id="rating4"
                    />
                    <label htmlFor="rating4">
                        <Image
                            src={'/img/popcornRating/popcorn4.png'}
                            alt={'Popcorn Rating 4'}
                            width={40}
                            height={40}
                            className="popcorn4"
                            id="popcorn_img4"
                        ></Image>
                    </label>
                </li>
                <li>
                    <input
                        type="checkbox"
                        name="rating"
                        value="5"
                        checked={selectedRating === 5}
                        onChange={handleRatingChange}
                        id="rating5"
                    />
                    <label htmlFor="rating5">
                        <Image
                            src={'/img/popcornRating/popcorn5.png'}
                            alt={'Popcorn Rating 5'}
                            width={40}
                            height={40}
                            className="popcorn5"
                            id="popcorn_img5"
                        ></Image>
                    </label>
                </li>
            </ul>
        </div>
    );
}
