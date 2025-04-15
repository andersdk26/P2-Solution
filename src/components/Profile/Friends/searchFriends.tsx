import { JSX, useState } from 'react';

export function SearchFriends(): JSX.Element {
    // Create useState array for storing search results.
    const [searchResult, setSearchResult] = useState<movie[]>([]);

    return (
        <>
            {/* Search bar for finding movies */}
            <form
                className="max-w-[928px] mx-auto py-4"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="search"
                    id="coldStartMovieSearch"
                    className="block w-full p-4 rounded-full bg-gray-100 text-black"
                    placeholder="Search for movies..."
                    // When the user types something, call function to fetch movies with matching search query.
                    onChange={async (e) => {
                        setSearchResult(
                            await searchForMovie(e.target.value, 10)
                        );
                    }}
                />
            </form>

            <section
                id="searchResults"
                className="max-w-[928px] mx-auto bg-gray-100 rounded-3xl"
            >
                {searchResult.map((movie) => (
                    <p
                        key={movie.movieId} // movieId is used as identifier as it ensures that each item has a unique key.
                        onClick={() => handleSelectMovie(movie)} // Call function to toggle movie selection when clicked on.
                        className={`py-2 px-4 flex justify-between ${selectedMovies.some((m) => m.movieId === movie.movieId) ? 'bg-green-500 font-bold' : 'bg-gray-100 font-normal'} hover:bg-blue-500 text-black hover:text-white rounded-3xl cursor-pointer`}
                    >
                        <span className="text-left prevent-select">
                            {movie.movieTitle}
                        </span>
                        <span className="text-right prevent-select">
                            ID: {movie.movieId}
                        </span>
                    </p>
                ))}
            </section>
        </>
    );
}
