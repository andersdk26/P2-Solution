import { JSX } from 'react';
import { useState } from 'react';
import '@/styles/group.css';

export default function CreateGroupIcon(): JSX.Element {
    const [isAboutGroupOpen, setAboutGroupOpen] = useState(false);
    const [GroupName, setGroupName] = useState('');
    const [BackgroundColor, setBackgroundColor] = useState('');
    const [TextColor, setTextColor] = useState('');
    const [EmojiSelect, setEmojiSelect] = useState('');

    const toggleGroup = (): void => {
        setAboutGroupOpen(!isAboutGroupOpen);
    };

    const backgroundText = `bg-[${BackgroundColor}]`;
    const textColor = `text-[${TextColor}]`;
    console.log(backgroundText, textColor);

    const handleSubmit = (e): void => {
        e.preventDefault();

        const backgroundText = `bg-[${BackgroundColor}]`;
        const textColor = `text-[${TextColor}]`;
        console.log(
            `Form submitted, ${GroupName}`,
            backgroundText,
            textColor,
            EmojiSelect
        );
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
                    {/* the box container */}
                    <div
                        className={`z-30 w-300 h-150 border-2 border-solid border-[#282F72] bg-[#9fa3d1] rounded-3xl m-4 align-center items-center`}
                    >
                        {/* close button */}
                        <button
                            className={`float-right right-4 top-3 mr-4 mt-2 mb-0 z-50 cursor-pointer text-2xl hover:opacity-85`}
                            onClick={toggleGroup}
                        >
                            <u>Close</u>
                        </button>

                        {/* heading */}
                        <h5
                            className={` text-5xl m-2 font-bold text-center mt-10 `}
                        >
                            Create a group
                        </h5>

                        {/* Flex container for the content*/}
                        <section className="grid grid-cols-2">
                            {/* submit form , left side */}
                            <div className="text-left ml-4  text-xl">
                                <form onSubmit={handleSubmit}>
                                    <p className="mb-1 mt-1">
                                        Search for friends username or user ID:
                                    </p>
                                    <input
                                        type="text"
                                        className="bg-white text-black"
                                        placeholder="mrBeans123 or #xyz987"
                                    />
                                    <p className="mb-1 mt-1">
                                        Choose a groupname:
                                    </p>
                                    <input
                                        type="text"
                                        className="bg-white text-black"
                                        onChange={(e) =>
                                            setGroupName(e.target.value)
                                        }
                                        value={GroupName}
                                        placeholder="Watchparty"
                                        minLength={1}
                                        maxLength={10}
                                    />
                                    <p className="mb-1 mt-1">
                                        Pick background color:
                                    </p>
                                    <input
                                        type="color"
                                        onChange={(e) =>
                                            setBackgroundColor(e.target.value)
                                        }
                                        value={BackgroundColor}
                                    />
                                    <p className="mb-1 mt-1">
                                        Pick Text-color:{' '}
                                    </p>
                                    <input
                                        type="color"
                                        onChange={(e) =>
                                            setTextColor(e.target.value)
                                        }
                                        value={TextColor}
                                    />
                                    <br />
                                    <label htmlFor="Emoji">
                                        Pick an Icon:{' '}
                                    </label>
                                    <br />
                                    <select
                                        name="Emoji"
                                        id="Emoji"
                                        className="text-5 xl mt-1 mb-1"
                                        onChange={(e) =>
                                            setEmojiSelect(e.target.value)
                                        }
                                        value={EmojiSelect}
                                    >
                                        <option value="🎥">🎥</option>
                                        <option value="📽️">📽️</option>
                                        <option value="🎞️">🎞️</option>
                                        <option value="🎬">🎬</option>
                                        <option value="🍿">🍿</option>
                                        <option value="📺">📺</option>
                                        <option value="📼">📼</option>
                                        <option value="💿">💿</option>
                                    </select>
                                    <br />
                                    <button
                                        className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold py-2 px-4 rounded-sm"
                                        type="submit"
                                    >
                                        Create Group
                                    </button>
                                </form>
                            </div>

                            {/* Right div for display group */}
                            <section className="flex grid-cols-2  ">
                                {/* Left for the members list */}
                                <aside className="text-left">
                                    {/* Display members */}
                                    <p className="mt-1 text-xl">
                                        Group members:
                                    </p>
                                    <p>1</p>
                                    <p>2</p>
                                </aside>

                                {/* right for the group icon display */}
                                <aside className="align-right  ">
                                    {/* Group box visual */}
                                    <div
                                        className={`float size-60 border-2 border-solid border-[#282F72] ${backgroundText} ${textColor} rounded-3xl m-4 text-center align-center content-center justify-center`}
                                    >
                                        <p
                                            className={`text-xl ${textColor} m-2 font-bold`}
                                        >
                                            {GroupName}
                                        </p>
                                        <p
                                            className={`text-9xl m-0 select-none`}
                                        >
                                            {EmojiSelect}
                                        </p>
                                        {/* <p className={`text-l m-2`}>
                                        Members:
                                        <span className="font-bold">
                                            {memberCount}
                                        </span>
                                    </p> */}
                                    </div>
                                </aside>
                            </section>
                        </section>
                    </div>
                </section>
            )}
        </>
    );
}
