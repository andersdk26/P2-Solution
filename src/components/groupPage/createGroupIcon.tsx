'use client';
import { JSX } from 'react';
import { useState } from 'react';

export default function CreateGroupIcon(): JSX.Element {
    const [isAboutGroupOpen, setAboutGroupOpen] = useState(false);
    const [GroupName, setGroupName] = useState('');
    const [BackgroundColor, setBackgroundColor] = useState('');
    const [TextColor, setTextColor] = useState('');
    const [EmojiSelect, setEmojiSelect] = useState('');
    const [GroupMembers, setGroupMembers] = useState<string[]>([]);

    const handleSubmit = (e: { preventDefault: () => void }): void => {
        e.preventDefault();

        // validate the group name
        //cannot include special characters: https://stackoverflow.com/questions/16667329/special-character-validation
        const isValidCharacter = (text: string): boolean => {
            const validCharacterRegex: RegExp = /^[a-zA-Z0-9]*$/;
            return validCharacterRegex.test(text);
        };
        if (isValidCharacter(GroupName) === false) {
            alert('invalid input');
            setGroupName('');
        }
        // ------------------Need to only upload group to db if valid username

        console.log(
            `Form submitted, ${GroupName}`,
            BackgroundColor,
            TextColor,
            EmojiSelect
        );
    };

    //---------------------------------This should work similar to select movies in cold start survey
    const handleMemberSubmit = (e: { preventDefault: () => void }): void => {
        e.preventDefault();
        console.log('add group member');
    };

    return (
        <>
            {/* The div for the entire box, onclick: open the create group pop-up */}
            <div
                className={`size-60 border-2 border-solid border-[#282F72] bg-[#9fa3d1] hover:brightness-80 text-[#282f72] inline-block rounded-3xl m-4 text-center align-top items-center content-center justify-center cursor-pointer `}
                onClick={() => setAboutGroupOpen(!isAboutGroupOpen)}
            >
                <p className="text-9xl m-0">+</p>
                <p className="text-2xl m-0">Create Group</p>
            </div>

            {/* the information about groups in the box */}
            {isAboutGroupOpen && (
                // Container for the about group
                <section
                    className={`fixed top-4 left-0 z-40 w-screen h-screen flex items-center justify-center`}
                >
                    {/* the box container */}
                    <div
                        className={`z-50 w-5/6 h-2/3 border-2 border-solid border-[#282F72] bg-[#9fa3d1] rounded-3xl m-4 align-center items-center overflow-scroll`}
                    >
                        {/* close button */}
                        <button
                            className={`float-right right-4 top-3 mr-4 mt-2 mb-0 z-50 cursor-pointer text-2xl hover:opacity-85`}
                            onClick={() => setAboutGroupOpen(!isAboutGroupOpen)}
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
                            <div className="text-left ml-4 text-xl">
                                {/* form for adding group members */}
                                <form onSubmit={handleMemberSubmit}>
                                    <label className="mb-1 mt-1">
                                        Search for friends username or user ID:
                                    </label>
                                    <br />
                                    <p>
                                        <i>2-8 members</i>
                                    </p>
                                    <input
                                        type="text"
                                        className="bg-white text-black"
                                        placeholder="mrBeans123 or #xyz987"
                                    />
                                    <button
                                        className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdeef] font-bold py-1 px-2 m-2 rounded-sm text-m"
                                        type="submit"
                                    >
                                        Add member
                                    </button>
                                </form>

                                {/* Form for group visual */}
                                <form onSubmit={handleSubmit}>
                                    <label className="mb-1 mt-1">
                                        Choose a groupname:
                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        className="bg-white text-black"
                                        onChange={(e) =>
                                            setGroupName(e.target.value)
                                        }
                                        value={GroupName}
                                        placeholder="Watchparty"
                                        minLength={1}
                                        maxLength={16}
                                    />{' '}
                                    <br />
                                    <label className="mb-1 mt-1">
                                        Pick background color:
                                    </label>
                                    <br />
                                    <input
                                        type="color"
                                        onChange={(e) =>
                                            setBackgroundColor(e.target.value)
                                        }
                                        value={BackgroundColor}
                                    />
                                    <br />
                                    <label className="mb-1 mt-1">
                                        Pick Text-color:
                                    </label>
                                    <br />
                                    <input
                                        type="color"
                                        onChange={(e) =>
                                            setTextColor(e.target.value)
                                        }
                                        value={TextColor}
                                    />
                                    <br />
                                    <label htmlFor="Emoji">Pick an Icon:</label>
                                    <br />
                                    <select
                                        name="Emoji"
                                        id="Emoji"
                                        className="text-5xl mt-1 mb-1"
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
                            <section className="flex grid-cols-4 ">
                                {/* right for the group icon display */}
                                <aside className="col-span-3">
                                    {/* Group box visual */}
                                    <div
                                        // styling inline because tailwind doesnt like dynamic color changes
                                        style={{
                                            backgroundColor: BackgroundColor,
                                            color: TextColor,
                                        }}
                                        className={` size-60 border-2 border-solid border-[#282F72] rounded-3xl m-4 text-center align-center content-center justify-center`}
                                    >
                                        <p className={`text-xl m-2 font-bold`}>
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
                                {/* Left for the members list */}
                                <aside className="text-left text-col-span-1 justify-left content-left align-left left-0 text-2xl">
                                    {/* Display members */}
                                    <p className="mt-1 ">Group members:</p>
                                    <p>1</p>
                                    <p>2</p>
                                </aside>
                            </section>
                        </section>
                    </div>
                </section>
            )}
        </>
    );
}
