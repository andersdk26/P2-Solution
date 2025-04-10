'use client';

import { JSX, useState } from 'react';
import Image from 'next/image';
import '@/styles/mainPage.css'; // Import CSS file

export default function RatingPopcorn(): JSX.Element {
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const handleRatingChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newRating = Number(event.target.value);
        if (newRating === selectedRating) {
            //undo rating
            setSelectedRating(0);
        } else {
            // To change rating
            setSelectedRating(Number(event.currentTarget.value));
            console.log('event:', event.currentTarget.value);
            console.log('selected:', selectedRating);
        }
    };

    return (
        <div className="ratingRow">
            <ul>
                <li>
                    <input
                        type="checkbox"
                        name="rating"
                        value="1"
                        checked={
                            selectedRating === 1 ||
                            selectedRating === 2 ||
                            selectedRating === 3 ||
                            selectedRating === 4 ||
                            selectedRating === 5
                        }
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
                        checked={
                            selectedRating === 2 ||
                            selectedRating === 3 ||
                            selectedRating === 4 ||
                            selectedRating === 5
                        }
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
                        checked={
                            selectedRating === 3 ||
                            selectedRating === 4 ||
                            selectedRating === 5
                        }
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
                        checked={selectedRating === 4 || selectedRating === 5}
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
