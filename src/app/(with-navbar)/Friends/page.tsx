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
import { GetFriends } from '@/actions/friends/friendsList';
import LoadingPage from '@/components/loading';
import FriendToast from '@/components/toast/toast';

export default function Friends(): JSX.Element {
    // Pop up for unfriending someone - when zero, the pop-up is closed
    const [unfriendOpen, setUnfriendOpen] = useState(0);

    const [unfriendName, setUnfriendName] = useState('');

    // To visualise your own userId - is also in profile settings
    const [userId, setUserId] = useState('User ID#');

    //
    const [FriendRequests, setFriendRequests] = useState<{ from: number }[]>(
        []
    );

    // Key is zero, because it has to have a value
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

    // loading page - is true when loading, when not, becomes false
    const [isLoadingFriendsList, setIsLoadingFriendsList] = useState(true);
    const [isLoadingRequest, setIsLoadingRequest] = useState(true);

    // toast message - shows when friend request is accepted, declined or removed
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error';
    } | null>(null);

    // fetching of your own userId to show the user
    useEffect(() => {
        const fetchUserId = async (): Promise<void> => {
            setUserId(String(await verifyUser())); // setUserId fetches the current userId - makes number into string
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        const getName = async () => {
            if (unfriendOpen === 0) {
                // if pop-up is closed, then no name
                setUnfriendName('');
                return;
            }

            setUnfriendName(await getUserById(unfriendOpen)); // else, finds the users name
        };
        getName();
    }, [unfriendOpen]);

    const getFriendRequests = async (): Promise<void> => {
        // takes current users id, returns a list of numbers of the ID's,
        // where the receiver is curent user and status is 0 (meaning, not accepted)
        setFriendRequests(await GetFriendRequest(await verifyUser()));
    };

    useEffect(() => {
        getFriendRequests(); // function gets called
    }, []);

    const getFriendsList = async (): Promise<void> => {
        setFriendsList(await GetFriends(await verifyUser())); // takes the current user, sees whether or not it is the sender or receiver, and updates number to 1 (accepted)
        setIsLoadingFriendsList(false);
    };

    useEffect(() => {
        getFriendsList();
    }, []);

    useEffect(() => {
        const updateFriendRequestList = async (): Promise<void> => {
            const resolvedRequests = await Promise.all(
                // a constant that waits until everything is done
                FriendRequests.map(async (request) => (
                    <div
                        className="flex items-center space-x-2 bg-[#9fa3d1] mb-4 p-4 rounded-sm"
                        key={request.from}
                    >
                        <p className="my-auto w-64 py-4">
                            {/* prints out the specific user name */}
                            {await getUserById(request.from)} wants to be your
                            friend!
                        </p>
                        <button
                            className="bg-[#2ec400] hover:bg-[#259e00] text-[#ffffff] font-bold py-2 px-4 rounded-sm cursor-pointer"
                            onClick={async () => {
                                // takes the sender's ID and Receiver (current user) Id and changed status from 0 (pending) to 1 (accepted)
                                AcceptFriendRequest(
                                    request.from,
                                    await verifyUser()
                                );
                                // calls the function that update the friends list and friend request list
                                getFriendRequests();
                                getFriendsList();
                            }}
                        >
                            Accept
                        </button>
                        <button
                            className="bg-[#db0000] hover:bg-[#b00000] text-[#ffffff] font-bold py-2 px-4 relative rounded-sm cursor-pointer"
                            onClick={async () => {
                                // takes the sender's ID and Receiver (current user) Id and deletes from table
                                DeclineFriendRequest(
                                    request.from,
                                    await verifyUser()
                                );
                                getFriendRequests(); // calls the function that updates the friends list
                            }}
                        >
                            Decline
                        </button>
                    </div>
                ))
            );
            setFriendRequestList(resolvedRequests);
            setIsLoadingRequest(false);
        };
        updateFriendRequestList();
    }, [FriendRequests]);

    // useEffect to show the toast message when the component mounts
    // It checks localStorage for a stored message and displays it if found.
    useEffect(() => {
        const storedToast = localStorage.getItem('toastMessage');
        if (storedToast) {
            setToast(JSON.parse(storedToast)); // Display the toast
            localStorage.removeItem('toastMessage'); // Clear the stored message
        }
    }, []);

    useEffect(() => {
        const updateFriendList = async (): Promise<void> => {
            if (!FriendsList.length) {
                // if friendslist is zero, return nothings
                return;
            }

            const resolvedFriends = await Promise.all(
                FriendsList.map(async (id) => (
                    <div
                        className="flex items-center space-x-2 bg-[#9fa3d1] mr-25 mb-4 p-4 rounded-sm"
                        key={id}
                    >
                        <p className="ml-4 my-auto w-64 py-4">
                            {await getUserById(id)}{' '}
                            {/* finds the specific userId */}
                        </p>
                        <button
                            className="bg-[#db0000] hover:bg-[#b00000] text-[#ffffff] font-bold my-auto py-2 px-4 mr-2 ml-auto relative rounded-sm cursor-pointer"
                            onClick={() => {
                                setUnfriendOpen(id); // pop-up to remove friend
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

    if (isLoadingFriendsList || isLoadingRequest) return <LoadingPage />;

    return (
        <>
            {toast && (
                <FriendToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
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
                    className={`fixed top-4 left-0 z-40 w-2/3 h-2/3 flex items-center justify-center ml-72`}
                >
                    {/* the box container */}
                    <div
                        className={`z-50 w-2/3 h-1/2 border-2 border-solid border-[#282F72] bg-[#9fa3d1] rounded-3xl m-4`}
                    >
                        {/*the close button*/}
                        <button
                            className="cursor-pointer float-right right-4 top-3 mr-4 mt-2 mb-0 z-50 cursor-pointer text-2xl hover:opacity-85 "
                            onClick={() => {
                                setUnfriendOpen(0); // pop-up closes
                            }}
                        >
                            <u>Close</u>
                        </button>
                        {/* Affirmation of unfriending-part */}
                        <div className="align-center items-center content-center text-center mt-15">
                            <p className="text-3xl text-center">
                                Are you sure you want to unfriend {unfriendName}
                                ?
                            </p>
                            <button
                                className="bg-[#db0000] hover:bg-[#b00000] text-[#ffffff] font-bold my-auto py-2 px-4 p-5 mt-10 rounded-sm cursor-pointer"
                                onClick={async () => {
                                    // removes the specific friend from table, when clicked
                                    RemoveFriend(
                                        await verifyUser(),
                                        unfriendOpen
                                    );
                                    getFriendsList(); // updates friendlist
                                    setUnfriendOpen(0); // closes pop-up
                                    location.reload(); // reloads page

                                    // Store the toast message in localStorage
                                    localStorage.setItem(
                                        'toastMessage',
                                        JSON.stringify({
                                            message: `You have unfriended ${unfriendName}`,
                                            type: 'success',
                                        })
                                    );
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
