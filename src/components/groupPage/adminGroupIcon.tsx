'use client';
import { JSX, useEffect } from 'react';
import { useState } from 'react';
import { group } from './group';
import getUserById from '@/actions/friends/getUserById';
import { searchUserById, user } from '../Profile/Friends/friends';
import { AddUserToGroup } from '@/actions/groups/adminGroupActions';

export default function AdminGroupIcon({
    groupId,
    groupName,
    groupAdmin,
    groupMembers,
    settings,
}: group): JSX.Element {
    //keeps track of the pop up
    const [isAboutGroupOpen, setAboutGroupOpen] = useState(false);
    //open popup for adding group members
    const [isAddFriendsOpen, setAddFriendsOpen] = useState(false);
    //the array with the usernames of members
    const [MemberUsernames, setMemberUsernames] = useState<string[]>([]);
    //the username of the admin
    const [AdminUsername, setAdminUsername] = useState('');
    // search result
    const [searchResult, setSearchResult] = useState<user[]>([]);

    // make array with the settings
    const settingsList = settings.split('|');

    // get the members id's to usernames
    //first make into array
    const membersId = groupMembers.split('|');
    // get how many members in the group by counting length of array
    const memberCount = membersId.length;
    // then get username for each of the members
    useEffect(() => {
        const getMemberUsernames = async (): Promise<void> => {
            const array = [];
            for (const id of membersId) {
                array.push(await getUserById(parseInt(id)));
            }
            setMemberUsernames(array);
        };
        getMemberUsernames();
    }, []);

    //set username of the admin
    useEffect(() => {
        const getAdminName = async (): Promise<void> => {
            setAdminUsername(await getUserById(groupAdmin));
        };
        getAdminName();
    });

    const handleAddUserToGroup = (addedUser: user) => {
        AddUserToGroup(groupId, groupMembers, addedUser.userId);
        // notify that there has been a success
        alert(`${addedUser} has been added to your group!`);
        // close the pop up for the add friend
        setAddFriendsOpen(false);
    };

    return (
        <>
            {/* The div for the entire box, onclick: open the about group */}
            <div
                // style inline because tailwind doesnt like dynamic colorchanges
                style={{
                    backgroundColor: settingsList[1],
                    color: settingsList[2],
                }}
                className={`size-60 border-2 border-solid border-[#282F72] hover:brightness-80 inline-block rounded-3xl m-4 text-center align-center content-center justify-center cursor-pointer`}
                onClick={() => setAboutGroupOpen(!isAboutGroupOpen)}
            >
                <p className={`text-xl m-2 font-bold`}>{groupName}</p>
                <p className="text-9xl m-0 select-none">{settingsList[0]}</p>
                <p className={`text-l m-2`}>
                    Members:
                    <span className="font-bold">{memberCount}</span>
                </p>
            </div>

            {/* the information about groups in the box */}
            {isAboutGroupOpen && (
                // Container for the about group
                <section
                    className={`fixed top-4 left-0 z-40 w-screen h-screen flex items-center justify-center `}
                >
                    {/* left div, About group information */}
                    <div
                        // style inline because tailwind doesnt like dynamic colorchanges
                        style={{
                            backgroundColor: settingsList[1],
                            color: settingsList[2],
                        }}
                        className={`float z-30 w-5/6 h-2/3 border-2 border-solid border-[#282F72] rounded-3xl m-4 align-center items-center overflow-scroll`}
                    >
                        {/* close button */}
                        <button
                            className={`float-right right-4 top-3 mr-4 mt-2 mb-0 z-50 cursor-pointer text-2xl hover:opacity-85`}
                            onClick={() => setAboutGroupOpen(!isAboutGroupOpen)}
                        >
                            <u>Close</u>
                        </button>
                        <br />

                        {/* Group information */}
                        <h5
                            className={`text-5xl m-2 font-bold text-center mt-4`}
                        >
                            {groupName}
                        </h5>
                        <p className="text-s m-0 text-center mt-0">
                            ID: {groupId}
                        </p>

                        <div className="left-8 text-left float-left ml-4">
                            <p className="text-xl m-2 font-bold mt-0">
                                Admin:
                                <span className="font-normal">
                                    {AdminUsername}
                                </span>
                            </p>
                            {/* List group members */}
                            <p className="text-xl m-2 font-bold">Members:</p>
                            {MemberUsernames.map((member) => (
                                <p
                                    className="font-normal ml-6 list-item text-xl"
                                    key={member}
                                >
                                    {member}
                                </p>
                            ))}

                            <p className="text-xl m-2 font-bold">
                                Last movie seen in group:
                                <span className="font-normal ml-6">?</span>
                            </p>

                            {/* Get new recommendation */}
                            <button className="bg-black text-white m-4 p-2 rounded-sm bottom-4 border-2 border-white mb-0 ml-0 cursor-pointer hover:brightness-80">
                                Get New Recommendation!
                            </button>

                            <br />
                            {/* Invite group members */}
                            <button
                                className="bg-green-500 text-black m-4 ml-0 p-2 rounded-sm bottom-4 cursor-pointer hover:brightness-80"
                                onClick={() => {
                                    setAddFriendsOpen(true);
                                }}
                            >
                                Add members
                            </button>

                            {/* Leave group button */}
                            <button className="bg-red-500 text-black m-4 p-2 rounded-sm bottom-4 cursor-pointer hover:brightness-80">
                                Delete group
                            </button>
                        </div>

                        {/* right div, change group settings */}
                        <div className="right-8 mr-4 text-right float-right text-xl">
                            <p>Change Group name</p>
                            <input
                                className="text-black bg-white border-black border-2"
                                type="text"
                            />
                            <br />
                            <label htmlFor="Emoji">Change Emoji</label>
                            <br />
                            <select
                                name="Emoji"
                                id="Emoji"
                                className="text-5xl"
                            >
                                <option value="camera">🎥</option>
                                <option value="projector">📽️</option>
                                <option value="film">🎞️</option>
                                <option value="clapper">🎬</option>
                                <option value="popcorn">🍿</option>
                                <option value="tv">📺</option>
                                <option value="vhs">📼</option>
                                <option value="cd">💿</option>
                            </select>
                            <p>Change Background color</p>
                            <input
                                type="color"
                                name="backgroundColor"
                                id="backgroundColorSelect"
                                className="rounded-sm border-black border-2"
                            />
                            <p>Change Text color</p>
                            <input
                                type="color"
                                className="rounded-sm border-black border-2"
                            />
                        </div>
                    </div>
                </section>
            )}
            {/* the information about groups in the box */}
            {isAddFriendsOpen && (
                <aside
                    className={`fixed top-4 left-0 z-40 w-screen h-screen flex items-center justify-center`}
                >
                    {/* the box container */}
                    <div
                        className={`z-50 w-2/3 h-1/2 border-2 border-solid border-[#282F72] bg-[#9fa3d1] rounded-3xl m-4 align-center items-center overflow-scroll`}
                    >
                        {/* the close button */}
                        <button
                            className="cursor-pointer float-right right-4 top-3 mr-4 mt-2 mb-0 z-50 cursor-pointer text-2xl hover:opacity-85 "
                            onClick={() => {
                                setAddFriendsOpen(false);
                            }}
                        >
                            <u>Close</u>
                        </button>

                        <div className="fixed mt-10 left-2/5 content-center align-center items-center">
                            {/* the search form */}
                            <form
                                className="w-80 justify-stretch py-2 text-black "
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <input
                                    type="search"
                                    id="UserSearch"
                                    className="block w-full p-2 px-4 rounded-full bg-gray-100"
                                    placeholder="Search for users..."
                                    // When the user types something, call function to fetch movies with matching search query.
                                    onChange={async (e) => {
                                        setSearchResult(
                                            await searchUserById(e.target.value)
                                        );
                                    }}
                                />
                            </form>
                            {/* section for the search results */}
                            <aside
                                id="searchResults"
                                className="top-87 w-80 bg-gray-100 rounded-3xl max-h-50 overflow-scroll"
                            >
                                {searchResult.map((user) => (
                                    // movieId is used as identifier as it ensures that each item has a unique key.
                                    <div key={user.userId}>
                                        <p
                                            onClick={() => {
                                                // set the current selected user to the user that is clicked
                                                handleAddUserToGroup(user);
                                            }}
                                            className={`py-2 px-4 justify-between hover:bg-blue-500 hover:text-white rounded-3xl cursor-pointer`}
                                        >
                                            <span className="text-left text-black prevent-select">
                                                {user.userName}
                                            </span>
                                        </p>
                                    </div>
                                ))}
                            </aside>
                        </div>
                    </div>
                </aside>
            )}
        </>
    );
}
