import { JSX } from 'react';
import { useState } from 'react';
import { groupId } from 'app/(with-navbar)/Groups/page';
import '@/styles/group.css';

export default function GroupRequestIcon({ groupId }: groupId): JSX.Element {
    const [isAboutGroupOpen, setAboutGroupOpen] = useState(false);

    const memberCount = groupId.Members.length;

    const toggleGroup = (): void => {
        setAboutGroupOpen(!isAboutGroupOpen);
    };

    return (
        <>
            {/* The div for the entire box, onclick: open the about group */}
            <div
                // style inline because tailwind doesnt like dynamic colorchanges
                style={{
                    backgroundColor: groupId.Settings.BackgroundColor,
                    color: groupId.Settings.TextColor,
                }}
                className={`size-60 border-2 border-solid border-[#282F72]  inline-block rounded-3xl m-4 text-center align-center cursor-pointer`}
                onClick={toggleGroup}
            >
                <p className={`text-xl  m-2 font-bold`}>{groupId.Name}</p>
                <p className="text-9xl m-0 select-none">
                    {groupId.Settings.Emoji}
                </p>
                <p className={`text-l m-2`}>
                    Members:
                    <span className="font-bold">{memberCount}</span>
                </p>
            </div>

            {/* the information about groups in the box */}
            {isAboutGroupOpen && (
                // Container for the about group
                <section
                    className={`fixed top-0 left-0 z-40 w-screen h-screen flex items-center justify-center `}
                >
                    {/* left div, About group information */}
                    <div
                        // style inline because tailwind doesnt like dynamic colorchanges
                        style={{
                            backgroundColor: groupId.Settings.BackgroundColor,
                            color: groupId.Settings.TextColor,
                        }}
                        className={`float z-30 w-300 h-150 border-2 border-solid border-[#282F72]  rounded-3xl m-4 align-center items-center`}
                    >
                        {/* close button */}
                        <button
                            className={`float-right right-4 top-3 mr-4 mt-2 mb-0 z-50 cursor-pointer text-2xl hover:opacity-85`}
                            onClick={toggleGroup}
                        >
                            <u>Close</u>
                        </button>
                        <br />

                        {/* Group information */}
                        <h5
                            className={`text-5xl m-2 font-bold text-center mt-4`}
                        >
                            {groupId.Name}
                        </h5>
                        <p className="text-s m-0 text-center mt-0">
                            ID: {groupId.Id}
                        </p>

                        <div className="left-8 text-left float-left ml-4 ">
                            <p className="text-xl m-2 font-bold mt-0">
                                Admin:
                                <span className="font-normal">
                                    {groupId.Admin}
                                </span>
                            </p>
                            {/* List group members */}
                            <p className="text-xl m-2 font-bold">Members:</p>
                            {groupId.Members.map((member) => (
                                <p
                                    className="font-normal ml-6 list-item text-xl"
                                    key={member}
                                >
                                    {/* ★  */}
                                    {member}
                                </p>
                            ))}

                            <br />
                            <p className="text-4xl">
                                <i>
                                    {groupId.Name} wants you to join their
                                    group!
                                </i>
                            </p>
                            {/* Accept invite butto */}
                            <button className="bg-green-500 text-black m-4 p-2 rounded-sm bottom-4 cursor-pointer ml-0">
                                Accept
                            </button>

                            {/* deny invite button */}
                            <button className="bg-red-500 text-black m-4 p-2 rounded-sm bottom-4 cursor-pointer">
                                Reject
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
