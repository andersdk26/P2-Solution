'use client';
import { JSX, useEffect } from 'react';
import { useState } from 'react';
import { group } from './group';
import getUserById from '@/actions/friends/getUserById';
import goToGroupRecommendations from '@/actions/groups/goToGroupRecommendations';
import useRedirect from '@/components/redirect';
import verifyUser from '@/actions/logIn/authenticateUser';
import { RemoveMemberFromDb } from '@/actions/groups/adminGroupActions';

export default function GroupIcon({
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
    // Pop up for leave group
    const [LeaveGroupOpen, setLeaveGroupOpen] = useState(false);

    // make array with the settings
    const settingsList = settings.split('|');

    const redirect = useRedirect(); // Custom hook for redirection

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
    }, []);

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
                <p className={`text-xl  m-2 font-bold`}>{groupName}</p>
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
                    className={`fixed top-4 left-0 z-40 w-screen h-screen flex items-center justify-center`}
                >
                    {/* left div, About group information */}
                    <div
                        // style inline because tailwind doesnt like dynamic colorchanges
                        style={{
                            backgroundColor: settingsList[1],
                            color: settingsList[2],
                        }}
                        className={`float z-30 w-5/6 h-2/3 border-2 border-solid border-[#282F72]  rounded-3xl m-4 align-center items-center overflow-scroll`}
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

                        <div className="left-8 text-left float-left ml-4 mt-0">
                            <p className="text-xl m-2 font-bold">
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

                            {/* Go to group recommendations. */}
                            <button
                                onClick={() => {
                                    goToGroupRecommendations(
                                        groupId,
                                        groupName
                                    );
                                    redirect('/Groups/Recommendations');
                                }}
                                className="bg-black text-white m-4 ml-0 p-2 rounded-sm bottom-4 border-2 border-white cursor-pointer hover:brightness-80"
                            >
                                Go to group recommendations
                            </button>

                            <br />

                            {/* Leave group button */}
                            <button
                                className="bg-red-500 text-black m-4 ml-0 p-2 rounded-sm bottom-4 cursor-pointer hover:brightness-80"
                                onClick={() => {
                                    setLeaveGroupOpen(true);
                                }}
                            >
                                Leave group
                            </button>
                        </div>
                    </div>
                </section>
            )}
            {/* the information about groups in the box */}
            {LeaveGroupOpen && (
                <aside
                    className={`fixed top-4 left-0 z-40 w-screen h-screen flex items-center justify-center`}
                >
                    {/* the box container */}
                    <div
                        className={`z-50 w-2/3 h-1/2 border-2 border-solid border-[#282F72] bg-[#9fa3d1] rounded-3xl m-4 overflow-scroll`}
                    >
                        {/* the close button */}
                        <button
                            className="cursor-pointer float-right right-4 top-3 mr-4 mt-2 mb-0 z-50 cursor-pointer text-2xl hover:opacity-85 "
                            onClick={() => {
                                setLeaveGroupOpen(false);
                            }}
                        >
                            <u>Close</u>
                        </button>

                        <div className="align-center items-center content-center text-center mt-4">
                            <p className="text-3xl text-center">
                                Are you sure you want to leave {groupName}?
                            </p>
                            <button
                                className="bg-red-500 text-4xl text-black m-12 p-2 rounded-sm bottom-4 cursor-pointer hover:brightness-80"
                                onClick={async () => {
                                    const currentUser = `${await verifyUser()}`;
                                    await RemoveMemberFromDb(
                                        currentUser,
                                        groupMembers,
                                        groupId
                                    );
                                    alert(`You have left ${groupName}`);
                                    setLeaveGroupOpen(false);
                                    setAboutGroupOpen(false);
                                    location.reload();
                                }}
                            >
                                Leave
                            </button>
                        </div>

                        <div className="align-center items-center content-center text-center mt-10"></div>
                    </div>
                </aside>
            )}
        </>
    );
}
