'use client';
import { JSX, useState } from 'react';
import { searchUserById, user } from './friends';
import { SendFriendRequest } from '@/actions/friends/friendRequests';
import verifyUser from '@/actions/logIn/authenticateUser';
import { GetFriends } from '@/actions/friends/friendsList';

// input: takes a user and a conditional function as input
function FriendRequest({
    user,
    conditionalFunction,
}: {
    user: user;
    conditionalFunction: (boolean: boolean) => void; // figure out the actual typing required for functions
}): JSX.Element {
    //returns the pop-up to send friend request

    return (
        <div className="border-[#282F72] bg-[#9fa3d1] border-2 border-solid rounded-2xl mx-124 py-4 fixed  w-100 h-40 text-center align-center justify-center top-74">
            Send <b>{user.userName}</b> a friend request?
            <br />
            {/* send request button */}
            <button
                className="bg-green-500 text-black m-4 p-2 rounded-sm bottom-4 cursor-pointer ml-0 hover:brightness-80"
                onClick={async () => {
                    if ((await verifyUser()) === user.userId) {
                        alert('You can not send friend requests to yourself!');
                    } else {
                        const status = await SendFriendRequest(
                            await verifyUser(),
                            user.userId
                        );

                        if (status === -1) {
                            alert('You are already friends with this user!');
                        } else if (status === 0) {
                            alert(
                                'One of you already has a pending friend request from the other!'
                            );
                        } else {
                            alert(`Friend request sent to ${user.userName}!`);
                        }
                    }

                    conditionalFunction(false);
                }}
            >
                Add friend
            </button>
            {/* close button */}
            <button
                className="bg-[#282F72] m-4 p-2 rounded-sm bottom-4 cursor-pointer hover:brightness-80"
                onClick={() => conditionalFunction(false)}
            >
                Close
            </button>
        </div>
    );
}

export function SearchFriends(): JSX.Element {
    // state for search research
    const [searchResult, setSearchResult] = useState<user[]>([]);
    // Toggles open the box to send friend request
    const [isFriendRequestIconOpen, setFriendRequestIconOpen] = useState(false);
    // overview of which user is currently selected
    const [selectedUser, setSelectedUser] = useState<user>();

    return (
        <>
            {/* search form input */}
            <form className="w-120 justify-stretch py-4 text-black">
                <input
                    type="search"
                    id="UserSearch"
                    className="block w-full p-4 rounded-full bg-gray-100"
                    placeholder="Search for users..."
                    // When the user types something, call function to fetch movies with matching search query.
                    onChange={async (e) => {
                        setSearchResult(await searchUserById(e.target.value));
                    }}
                />
            </form>

            {/* section for the search results */}
            <section
                id="searchResults"
                className="absolute w-120 mx-auto bg-gray-100 rounded-3xl max-h-50"
            >
                {searchResult.map((user) => (
                    // User ID is used as identifier as it ensures that each item has a unique key.
                    <div key={user.userId}>
                        <p
                            onClick={() => {
                                // Set the current selected user to the user that is clicked on.
                                setSelectedUser(user);
                                setFriendRequestIconOpen(
                                    !isFriendRequestIconOpen
                                );
                            }}
                            className={`py-2 px-4 justify-between hover:bg-blue-500 hover:text-white rounded-3xl cursor-pointer`}
                        >
                            <span className="text-left text-black prevent-select">
                                {user.userName}
                            </span>
                        </p>
                    </div>
                ))}
                {/* the box to send friend request for that ID */}
                {isFriendRequestIconOpen && (
                    <FriendRequest
                        user={selectedUser!}
                        conditionalFunction={setFriendRequestIconOpen}
                    />
                )}
            </section>
        </>
    );
}
