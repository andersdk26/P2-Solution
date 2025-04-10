import { JSX, useRef } from 'react';
import { useState } from 'react';
import AboutGroup from './aboutGroup';
import { groupId } from 'app/(with-navbar)/Groups/page';

export default function GroupIcon({ groupId }: groupId): JSX.Element {
    const [isAboutGroupOpen, setAboutGroupOpen] = useState(false);
    // const backgroundDivRef = useRef<HTMLDivElement | null>(null);

    const color = `bg-${groupId.Color}`;
    const textColor = `text-${groupId.TextColor}`;
    const memberCount = groupId.Members.length;

    const toggleGroup = (): void => {
        setAboutGroupOpen(!isAboutGroupOpen);
    };

    return (
        <>
            {/* <div
                className="none w-full h-full z-3 bg-black"
                id="backgroundDiv"
                onClick={() => {
                    setAboutGroupOpen(false);
                    if (backgroundDivRef.current) {
                        backgroundDivRef.current.style.display = 'none';
                    }
                }}
            ></div> */}
            {/* The div for the entire box, onclick: open the about group */}
            <div
                className={`size-60 border-2 border-solid border-[#282F72] ${color} ${textColor} inline-block rounded-3xl m-4 text-center align-center cursor-pointer`}
                onClick={toggleGroup}
            >
                <p className={`text-xl ${textColor} m-2 font-bold`}>
                    {groupId.Name}
                </p>
                <p className="text-9xl m-0 select-none">{groupId.Emoji}</p>
                <p className={`text-l m-2`}>
                    Members:
                    <span className="font-bold">{memberCount}</span>
                </p>
            </div>

            {/* the information about groups in the box */}
            {isAboutGroupOpen && (
                // Container for the about group
                <section
                    className={`fixed top-0 left-0 z-40 w-screen h-screen flex items-center justify-center ${textColor}`}
                >
                    {/* left div, About group information */}
                    <div
                        className={`float z-30 w-300 h-150 border-2 border-solid border-[#282F72] ${color} rounded-3xl m-4 align-center items-center`}
                    >
                        {/* close button */}
                        <button
                            className={`float-right right-4 top-3 mr-4 mt-2 mb-0 z-50 cursor-pointer text-xl`}
                            onClick={toggleGroup}
                        >
                            <u>Close</u>
                        </button>
                        <br />

                        {/* Group information */}
                        <h5 className={`text-5xl m-4 font-bold text-center`}>
                            {groupId.Name}
                        </h5>
                        <p className="text-s m-2 text-center">
                            ID: {groupId.Id}
                        </p>

                        <div className="left-8 text-left float-left ml-4">
                            <p className="text-xl m-2 font-bold">
                                Admin:
                                <span className="font-normal">
                                    {groupId.Admin}
                                </span>
                            </p>
                            {/* List group members */}
                            <p className="text-xl m-2 font-bold">
                                Members:
                                {groupId.Members.map((member) => (
                                    <li
                                        className="font-normal ml-6"
                                        key={member}
                                    >
                                        {member}
                                    </li>
                                ))}
                            </p>
                            <p className="text-xl m-2 font-bold">
                                Last movie seen in group:
                                <span className="font-normal ml-6">?</span>
                            </p>

                            {/* Get new recommendation */}
                            <button className="bg-black text-white m-4 p-2 rounded-sm bottom-4">
                                Get New Recommendation!
                            </button>

                            <br />
                            {/* Add group members */}
                            <button className="bg-green-500 text-black m-4 p-2 rounded-sm bottom-4">
                                Add members
                            </button>

                            {/* Leave group button */}
                            <button className="bg-red-500 text-black m-4 p-2 rounded-sm bottom-4">
                                Leave group
                            </button>
                        </div>

                        {/* right div, change group settings */}
                        <div className="right-8 mr-4 text-right float-right">
                            <p>Change Group name</p>
                            <input
                                className="text-black bg-white"
                                type="text"
                            />
                            <p>Change Emoji</p>
                            <input
                                className="text-black bg-white"
                                type="dropdown"
                            />
                            <p>Change Background color</p>
                            <input
                                type="color"
                                name="backgroundColor"
                                id="backgroundColorSelect"
                                className="rounded-sm"
                            />
                            <p>Change Text color</p>
                            <input type="color" className="rounded-sm" />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
