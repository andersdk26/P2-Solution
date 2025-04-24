'use client';
import { JSX } from 'react';
import { useState, useEffect } from 'react';
import { getGroupById, group } from './group';
import getUserById from '@/actions/friends/getUserById';

// input: takes a group and a conditional function as input
function GroupRequest({
    group,
    conditionalFunction,
}: {
    group: group;
    conditionalFunction: any; // figure out the actual typing required for functions
}): JSX.Element {
    //returns the pop-up to send friend request
    return (
        <div className="border-[#282F72] text-[#282F72] bg-[#babdde] border-2 border-solid rounded-2xl mx-124 py-4 fixed  w-100 h-40 text-center align-center justify-center top-84">
            Ask to join <b>{group.groupName}</b>?
            <br />
            {/* send request button */}
            <button
                className="bg-green-500 text-black m-4 p-2 rounded-sm bottom-4 cursor-pointer ml-0 hover:brightness-80"
                onClick={() => {
                    alert('Request sent');
                    conditionalFunction(false);
                }}
            >
                Join
            </button>
            {/* close button */}
            <button
                className="bg-[#282F72] text-[#f3f4f6] m-4 p-2 rounded-sm bottom-4 cursor-pointer hover:brightness-80"
                onClick={() => conditionalFunction(false)}
            >
                Close
            </button>
        </div>
    );
}

export default function SearchGroupIcon(): JSX.Element {
    const [isAboutGroupOpen, setAboutGroupOpen] = useState(false);
    const [searchResult, setSearchResult] = useState<group[]>([]);
    // open the send request to group admin
    const [isGroupRequestIconOpen, setGroupRequestIconOpen] = useState(false);
    // sets the selected group for the pop-up
    const [SelectedGroup, setSelectedGroup] = useState<group>();
    //the username of the admin
    const [AdminUsername, setAdminUsername] = useState('');
    const [AdminId, setAdminId] = useState<number>();

    //set username of the admin
    useEffect(() => {
        const getAdminName = async (): Promise<void> => {
            setAdminUsername(await getUserById(AdminId));
        };
        getAdminName();
    });

    return (
        <>
            {/* The div for the entire box, onclick: open the create group pop-up */}
            <div
                className={`size-60 border-2 border-solid border-[#282F72] bg-[#9fa3d1] hover:brightness-80 text-[#282f72] inline-block rounded-3xl m-4 text-center align-top items-center  content-center justify-center  cursor-pointer`}
                onClick={() => setAboutGroupOpen(!isAboutGroupOpen)}
            >
                <p className="text-9xl m-0">+</p>
                <p className="text-2xl m-0">Search Group</p>
            </div>

            {/* the information about groups in the box */}
            {isAboutGroupOpen && (
                // Container for the about group
                <section
                    className={`fixed top-4 left-0 z-40 w-screen h-screen flex items-center justify-center`}
                >
                    {/* left div, About group information */}
                    <div
                        className={`float z-30 w-5/6 h-2/3 border-2 border-solid border-[#282F72] bg-[#9fa3d1] rounded-3xl m-4 align-center items-center overflow-scroll`}
                    >
                        {/* close button */}
                        <button
                            className={`float-right right-4 top-3 mr-4 mt-2 mb-0 z-50 cursor-pointer text-2xl hover:opacity-85`}
                            onClick={() => setAboutGroupOpen(!isAboutGroupOpen)}
                        >
                            <u>Close</u>
                        </button>

                        <h5
                            className={` text-5xl m-2 font-bold text-center mt-10 `}
                        >
                            Search groups
                        </h5>
                        <p className="text-center mt-4 text-xl">
                            Search for groups using the group ID!
                        </p>
                        <form className="w-120 justify-stretch mx-auto py-4 text-black">
                            <input
                                type="search"
                                id="groupSearch"
                                className="block w-full p-4 rounded-full bg-gray-100"
                                placeholder="Search for groups..."
                                // When the user types something, call function to fetch movies with matching search query.
                                onChange={async (e) => {
                                    setSearchResult(
                                        await getGroupById(e.target.value)
                                    );
                                }}
                            />
                        </form>

                        <aside
                            id="searchResults"
                            className="block w-120 mx-auto bg-gray-100 rounded-3xl max-h-100 overflow-scroll align-center content-center"
                        >
                            {searchResult.map((group) => (
                                //get groupadmin's username

                                // movieId is used as identifier as it ensures that each item has a unique key.
                                <div key={group.groupId}>
                                    <p
                                        onClick={() => {
                                            setSelectedGroup(group);
                                            setGroupRequestIconOpen(
                                                !isGroupRequestIconOpen
                                            );
                                            setAdminId(group.groupAdmin);
                                        }}
                                        className={`py-2 px-4 justify-between hover:bg-blue-500 hover:text-white rounded-3xl cursor-pointer`}
                                    >
                                        <span className="text-left text-black prevent-select">
                                            <b>{group.groupName}</b> ID:{' '}
                                            {group.groupId}, Admin:{' '}
                                            {AdminUsername}
                                        </span>
                                    </p>
                                </div>
                            ))}

                            {/* the box to send group request for that ID */}
                            {isGroupRequestIconOpen && (
                                <GroupRequest
                                    group={SelectedGroup}
                                    conditionalFunction={
                                        setGroupRequestIconOpen
                                    }
                                />
                            )}
                        </aside>
                    </div>
                </section>
            )}
        </>
    );
}
