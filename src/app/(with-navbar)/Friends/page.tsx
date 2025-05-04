'use client';
import React, { JSX, useEffect, useState } from 'react';
import { SearchFriends } from '@/components/Profile/Friends/searchFriends';
import {
    AcceptFriendRequest,
    DeclineFriendRequest,
    GetFriendRequest,
    RemoveFriend,
} from '@/actions/friends/friendRequests';
import verifyUser from '@/actions/logIn/authenticateUser';
import getUserById from '@/actions/friends/getUserById';
import getUserID from '@/actions/logIn/userID';
import { GetFriends } from '@/actions/friends/friendsList';

export default function Friends(): JSX.Element {
    // Pop up for unfriending someone
    const [unfriendOpen, setUnfriendOpen] = useState(0);

    const [userId, setUserId] = useState('User ID#');

    const [FriendRequests, setFriendRequests] = useState<{ from: number }[]>(
        []
    );
    const [friendRequestList, setFriendRequestList] = useState([
        <p className="text-[#282f72]" key={0}>
            You have no pending friend requests.
        </p>,
    ]);
    const [FriendsList, setFriendsList] = useState<number[]>([]);
    const [friendsListObject, setFriendsListObject] = useState([
        <p className="ml-4 text-[#282f72]" key={0}>
            No friends to show.
        </p>,
    ]);
    const [unfriendName, setUnfriendName] = useState('');

    // fetching of your own userId to show the user
    useEffect(() => {
        const fetchUserId = async (): Promise<void> => {
            setUserId(String(await getUserID(verifyUser()))); // setUserId recieves the functions of getUserID(verifyuser)
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        const getName = async () => {
            if (unfriendOpen === 0) {
                setUnfriendName('');
                return;
            }

            setUnfriendName(await getUserById(unfriendOpen));
        };
        getName();
    }, [unfriendOpen]);

    const getFriendRequests = async (): Promise<void> => {
        setFriendRequests(await GetFriendRequest(await verifyUser()));
    };

    useEffect(() => {
        getFriendRequests();
    }, []);

    useEffect(() => {
        const updateFriendRequestList = async (): Promise<void> => {
            const resolvedRequests = await Promise.all(
                FriendRequests.map(async (request) => (
                    <div
                        className="flex items-center space-x-2 bg-[#9fa3d1] mb-4 p-4 rounded-sm"
                        key={request.from}
                    >
                        <p className="my-auto w-64 py-4">
                            {await getUserById(request.from)}
                        </p>
                        <button
                            className="bg-[#2ec400] hover:bg-[#259e00] text-[#ffffff] font-bold py-2 px-4 rounded-sm cursor-pointer"
                            onClick={async () => {
                                AcceptFriendRequest(
                                    request.from,
                                    await verifyUser()
                                );
                                getFriendRequests();
                                getFriendsList();
                            }}
                        >
                            Accept
                        </button>
                        <button
                            className="bg-[#db0000] hover:bg-[#b00000] text-[#ffffff] font-bold py-2 px-4 relative rounded-sm cursor-pointer"
                            onClick={async () => {
                                DeclineFriendRequest(
                                    request.from,
                                    await verifyUser()
                                );
                                getFriendRequests();
                            }}
                        >
                            Decline
                        </button>
                    </div>
                ))
            );
            setFriendRequestList(resolvedRequests);
        };
        updateFriendRequestList();
    }, [FriendRequests]);

    const getFriendsList = async (): Promise<void> => {
        setFriendsList(await GetFriends(await verifyUser()));
    };

    useEffect(() => {
        getFriendsList();
    }, []);

    useEffect(() => {
        const updateFriendList = async (): Promise<void> => {
            if (!FriendsList.length) {
                return;
            }

            const resolvedFriends = await Promise.all(
                FriendsList.map(async (id) => (
                    <div
                        className="flex items-center space-x-2 bg-[#9fa3d1] mr-25 mb-4 p-4 rounded-sm"
                        key={id}
                    >
                        <p className="ml-4 my-auto w-64 py-4">
                            {await getUserById(id)}
                        </p>
                        <button
                            className="bg-[#db0000] hover:bg-[#b00000] text-[#ffffff] font-bold my-auto py-2 px-4 mr-2 ml-auto relative rounded-sm cursor-pointer"
                            onClick={() => {
                                setUnfriendOpen(id);
                            }}
                        >
                            Remove friend
                        </button>
                    </div>
                ))
            );
            setFriendsListObject(resolvedFriends);
        };
        updateFriendList();
    }, [FriendsList]);

    return (
        <>
            {/* entire page section */}
            <section className="p-8">
                <section className="ml-100 mr-100 h-1/2 w-1/2 p-1 rounded-sm bg-[#9fa3d1]">
                    {/* your friends section */}
                    <section className="h-auto m-4 p-4 bg-[#babdde] rounded-sm">
                        <h2>Your friends</h2>
                        <p className="ml-4 text-[#282f72]">
                            Here, you can view and manage your friends.
                        </p>
                        <div className="pl-4 pt-4 text-[#282f72]">
                            {friendsListObject}
                        </div>
                    </section>

                    {/* searching for users section */}
                    <section className="h-80 p-4 m-4 bg-[#babdde] rounded-sm">
                        <h2>Search for users</h2>
                        <p className="ml-4 text-[#282f72]">
                            Search for users by their user ID or their username
                            to send them a friend request.
                        </p>
                        <p className="ml-4 text-[#282f72]">
                            Your user ID: #{userId}
                        </p>
                        <aside className="align-left content-left justify-left text-left table ml-4 rounded-sm">
                            <SearchFriends />
                        </aside>
                    </section>

                    {/* friend requests section */}
                    <section className="h-auto m-4 p-4 bg-[#babdde] rounded-sm">
                        <h2>Friend requests</h2>
                        <p className="ml-4 text-[#282f72]">
                            Here, you can accept or decline incoming friend
                            requests.
                        </p>
                        <div className="mr-25 pl-4 pt-4 text-[#282f72]">
                            {friendRequestList}
                        </div>
                    </section>
                </section>
            </section>
            {/* pop-up to confirm to unfriend*/}
            {unfriendOpen && (
                <aside
                    className={`fixed top-4 left-0 z-40 w-2/3 h-2/3 flex items-center justify-center`}
                    onLoad={() => alert(unfriendOpen)}
                >
                    {/* the box container */}
                    <div
                        className={`z-50 w-2/3 h-1/2 border-2 border-solid border-[#282F72] bg-[#9fa3d1] rounded-3xl m-4`}
                    >
                        {/*the close button*/}
                        <button
                            className="cursor-pointer float-right right-4 top-3 mr-4 mt-2 mb-0 z-50 cursor-pointer text-2xl hover:opacity-85 "
                            onClick={() => {
                                setUnfriendOpen(0);
                            }}
                        >
                            <u>Close</u>
                        </button>
                        {/* Affirmation of unfriending-part */}
                        <div className="align-center items-center content-center text-center mt-4">
                            <p className="text-3xl text-center">
                                Are you sure you want to unfriend {unfriendName}
                                ?
                            </p>
                            <button
                                className="bg-[#db0000] hover:bg-[#b00000] text-[#ffffff] font-bold my-auto py-2 px-4 p-5 mt-20 rounded-sm cursor-pointer"
                                onClick={async () => {
                                    // removes the specific friend, when clicked
                                    RemoveFriend(
                                        await verifyUser(),
                                        unfriendOpen
                                    );
                                    alert(
                                        `${unfriendName} has been removed from your friends!`
                                    );

                                    getFriendsList(); // updates friendlist
                                    setUnfriendOpen(0); // closes pop-up
                                    location.reload(); // reloads page
                                }}
                            >
                                Remove {unfriendName}
                            </button>
                        </div>
                    </div>
                </aside>
            )}
        </>
    );
}
