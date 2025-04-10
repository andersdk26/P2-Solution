import { JSX } from 'react';
import { useState } from 'react';
import '@/styles/group.css';

export default function CreateGroupIcon(): JSX.Element {
    const [isAboutGroupOpen, setAboutGroupOpen] = useState(false);

    const toggleGroup = (): void => {
        setAboutGroupOpen(!isAboutGroupOpen);
    };

    return (
        <>
            {/* The div for the entire box, onclick: open the create group pop-up */}
            <div
                className={`size-60 border-2 border-solid border-[#282F72] bg-[#9fa3d1] text-[#282f72] inline-block rounded-3xl m-4 text-center align-center items-center  content-center justify-center cursor-pointer`}
                onClick={toggleGroup}
            >
                <p className="text-9xl m-0">+</p>
                <p className="text-2xl m-0">Create Group</p>
            </div>

            {/* the information about groups in the box */}
            {isAboutGroupOpen && (
                // Container for the about group
                <section
                    className={`fixed top-0 left-0 z-40 w-screen h-screen flex items-center justify-center`}
                >
                    {/* left div, About group information */}
                    <div
                        className={`float z-30 w-300 h-150 border-2 border-solid border-[#282F72] bg-[#9fa3d1] rounded-3xl m-4 align-center items-center`}
                    >
                        {/* close button */}
                        <button
                            className={`float-right right-4 top-3 mr-4 mt-2 mb-0 z-50 cursor-pointer text-2xl hover:opacity-85`}
                            onClick={toggleGroup}
                        >
                            <u>Close</u>
                        </button>
                    </div>
                </section>
            )}
        </>
    );
}
