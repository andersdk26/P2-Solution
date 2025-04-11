'use client';
import { JSX } from 'react';
import { useState } from 'react';
import '@/styles/group.css';

export default function SearchGroupIcon(): JSX.Element {
    const [isAboutGroupOpen, setAboutGroupOpen] = useState(false);

    const toggleGroup = (): void => {
        setAboutGroupOpen(!isAboutGroupOpen);
    };

    return (
        <>
            {/* The div for the entire box, onclick: open the create group pop-up */}
            <div
                className={`size-60 border-2 border-solid border-[#282F72] bg-[#9fa3d1] hover:brightness-80 text-[#282f72] inline-block rounded-3xl m-4 text-center align-top items-center  content-center justify-center  cursor-pointer`}
                onClick={toggleGroup}
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
                            onClick={toggleGroup}
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
                    </div>
                </section>
            )}
        </>
    );
}
