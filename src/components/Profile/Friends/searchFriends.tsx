'use client';
import { JSX, useState } from 'react';
import { getUserById, searchForUsers, user } from './friends';

export function SearchFriends(): JSX.Element {
    const [searchResult, setSearchResult] = useState<user[]>([]);

    return (
        <>
            <form className="w-120 justify-stretch mx-auto py-4 text-black">
                <input
                    type="search"
                    id="coldStartMovieSearch"
                    className="block w-full p-4 rounded-full bg-gray-100"
                    placeholder="Search for users..."
                    // When the user types something, call function to fetch movies with matching search query.
                    onChange={async (e) => {
                        setSearchResult(await getUserById(e.target.value));
                    }}
                />
            </form>

            <section
                id="searchResults"
                className="absolute w-120 mx-auto bg-gray-100 rounded-3xl max-h-100 overflow-scroll"
            >
                {searchResult.map((user) => (
                    <p
                        key={user.userId} // movieId is used as identifier as it ensures that each item has a unique key.
                        // onClick={/* does something when click on movie */}
                        className={`py-2 px-4 justify-between hover:bg-blue-500 hover:text-white rounded-3xl cursor-pointer`}
                    >
                        <span className="text-left text-black prevent-select">
                            {user.userName}
                        </span>
                    </p>
                ))}
            </section>
        </>
    );
}
