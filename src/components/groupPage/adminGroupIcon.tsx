'use client';
import { JSX, useEffect } from 'react';
import { useState } from 'react';
import { group } from './group';
import getUserById from '@/actions/friends/getUserById';
import { useFormState } from 'react-dom';

export default function AdminGroupIcon({
    groupId,
    groupName,
    groupAdmin,
    groupMembers,
    settings,
}: group): JSX.Element {
    //keeps track of the pop up
    const [isAboutGroupOpen, setAboutGroupOpen] = useState(false);
    //the array with the usernames of members
    const [MemberUsernames, setMemberUsernames] = useState<string[]>([]);
    //the username of the admin
    const [AdminUsername, setAdminUsername] = useState('');

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
                            <button className="bg-green-500 text-black m-4 ml-0 p-2 rounded-sm bottom-4 cursor-pointer hover:brightness-80">
                                Invite members
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
        </>
    );
}
