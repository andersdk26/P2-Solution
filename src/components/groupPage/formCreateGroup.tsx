import { JSX, useState } from 'react';
import { searchUserById, user } from '../Profile/Friends/friends';
import { group } from './group';

import { FetchGroupId } from '@/actions/groups/fetchGroupId';
import verifyUser from '@/actions/logIn/authenticateUser';
import { GroupCreateDb } from '@/actions/groups/groupCreateDb';

export function FormCreateGroup(): JSX.Element {
    // state for search research
    const [searchResult, setSearchResult] = useState<user[]>([]);
    // array with the users in the group
    const [SelectedUsers, setSelectedUsers] = useState<user[]>([]);
    // visual variables: group name, background color, text color, emoji symbol, member count
    const [GroupName, setGroupName] = useState('');
    const [BackgroundColor, setBackgroundColor] = useState('#9fa3d1');
    const [TextColor, setTextColor] = useState('#282f72');
    const [EmojiSelect, setEmojiSelect] = useState('🎥');
    const [MemberCount, setMemberCount] = useState<number>(1);

    const [ErrorBool, setErrorBool] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState('');
    const [ErrorExplain, setErrorExplain] = useState('');

    // Function for handling selection of users.
    const handleSelectUser = async (user: user): Promise<void> => {
        if (user.userId === (await verifyUser())) {
            alert('You are already in the group');
            return;
        }
        setSelectedUsers((prevSelectedUsers) => {
            const isAlreadySelected = prevSelectedUsers.some(
                (id) => id.userId === user.userId
            );

            let newSelection;

            if (isAlreadySelected) {
                // Remove user if already selected.
                newSelection = prevSelectedUsers.filter(
                    (id) => id.userId !== user.userId
                );
            } else {
                // Add user if not selected.
                newSelection = [...prevSelectedUsers, user];
            }

            setMemberCount(newSelection.length + 1);

            return newSelection;
        });
    };

    // create group button
    const handleSubmit = async (): Promise<void> => {
        //---Validation---
        // validate group member length
        if (MemberCount < 2) {
            setErrorBool(true);
            setErrorMessage('Too few members!');
            setErrorExplain('Between 2 and 8 members');
            return;
        }

        if (MemberCount > 8) {
            setErrorBool(true);
            setErrorMessage('Too many members!');
            setErrorExplain('Between 2 and 8 members');
            return;
        }
        // validate groupname
        //Character validation
        //cannot include special characters: https://stackoverflow.com/questions/16667329/special-character-validation
        const isValidCharacter = (text: string): boolean => {
            const validCharacterRegex: RegExp = /^[a-zA-Z0-9]*$/;
            return validCharacterRegex.test(text);
        };
        if (isValidCharacter(GroupName) === false) {
            setErrorBool(true);
            setErrorMessage('Invalid Groupname!');
            setErrorExplain('Only numbers and characters allowed');
            return;
        }

        //length validation
        if (GroupName.length < 2) {
            setErrorBool(true);
            setErrorMessage('Too short Groupname!');
            setErrorExplain('Between 2 and 16');
            return;
        }

        //length validation
        if (GroupName.length > 16) {
            setErrorBool(true);
            setErrorMessage('Too long Groupname!');
            setErrorExplain('Between 2 and 16');
            return;
        }

        // make sure background color and text color is not the same
        if (BackgroundColor === TextColor) {
            setErrorBool(true);
            setErrorMessage('Invalid colors chosen!');
            setErrorExplain(
                'Background Color and Text Color cannot be the same color'
            );
        }

        //--- ADD variables to a group---
        // Admin ID
        const currentUser = await verifyUser();

        // Member user array into string
        let memberString = `${currentUser}`;
        for (const members of SelectedUsers) {
            if (members.userId === currentUser) {
                continue;
            }
            memberString += `|${members.userId}`;
        }

        // settings into string
        const settingsString = `${EmojiSelect}|${BackgroundColor}|${TextColor}`;

        // add variables to a group object
        const tempGroup: group = {
            groupId: await FetchGroupId(),
            groupName: GroupName,
            groupAdmin: currentUser,
            groupMembers: memberString,
            settings: settingsString,
        };
        //--- ADD to db ---
        await GroupCreateDb(tempGroup);
        //--------------------
        location.reload();
    };

    // reset group button
    const resetSettings = () => {
        setEmojiSelect('🎥');
        setBackgroundColor('#9fa3d1');
        setTextColor('#282f72');
        setGroupName('');
    };

    return (
        <>
            {/* Flex container for the content*/}
            <section className="grid grid-cols-2 mb-8">
                {/* submit form , left side */}
                <div className="text-left ml-4 text-xl">
                    {/* form for adding group members */}
                    <label className="mb-1 mt-1">
                        Search for friends username or user ID:
                    </label>
                    <br />
                    <p>
                        <i>2-8 members</i>
                    </p>
                    {/* search form input */}
                    <form
                        className="w-80 justify-stretch py-4 text-black "
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
                                    await searchUserById(
                                        e.target.value
                                        // await verifyUser()
                                    )
                                );
                            }}
                        />
                    </form>

                    {/* section for the search results */}
                    <section
                        id="searchResults"
                        className=" top-87 w-80 bg-gray-100 rounded-3xl max-h-50 overflow-scroll"
                    >
                        {searchResult.map((user) => (
                            // movieId is used as identifier as it ensures that each item has a unique key.
                            <div key={user.userId}>
                                <p
                                    onClick={() => {
                                        // set the current selected user to the user that is clicked
                                        handleSelectUser(user);
                                    }}
                                    className={`py-2 px-4 justify-between hover:bg-blue-500 hover:text-white rounded-3xl cursor-pointer`}
                                >
                                    <span className="text-left text-black prevent-select">
                                        {user.userName}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </section>

                    {/* Form for group visual */}
                    <form onSubmit={handleSubmit}>
                        <label className="mb-1 mt-1">Choose a groupname:</label>
                        <br />
                        <input
                            type="text"
                            className="bg-white text-black rounded-full p-2 px-4 w-80"
                            onChange={(e) => setGroupName(e.target.value)}
                            value={GroupName}
                            placeholder="Watchparty"
                            minLength={1}
                            maxLength={16}
                        />
                        <br />
                        <label className="mb-1 mt-1">
                            Pick background color:
                        </label>
                        <br />
                        <input
                            type="color"
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            value={BackgroundColor}
                            className="border-2 rounded-full border-[#282f72]"
                        />
                        <br />
                        <label className="mb-1 mt-1">Pick Text-color:</label>
                        <br />
                        <input
                            type="color"
                            onChange={(e) => setTextColor(e.target.value)}
                            value={TextColor}
                            className="border-2 rounded-full border-[#282f72]"
                        />
                        <br />
                        <label htmlFor="Emoji">Pick an Icon:</label>
                        <br />
                        <select
                            name="Emoji"
                            id="Emoji"
                            className="text-5xl mt-1 mb-1"
                            onChange={(e) => setEmojiSelect(e.target.value)}
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
                            className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdee7] font-bold py-2 px-4 rounded-sm"
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            Create Group
                        </button>

                        <button
                            className="text-[#ededed] hover:opacity-80 font-bold py-2 px-4 ml-2 rounded-sm cursor-pointer"
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                resetSettings();
                            }}
                        >
                            <u>Reset settings</u>
                        </button>
                    </form>
                </div>

                {/* Right div for display group */}
                <section className="flex text-center align-items">
                    {/* right for the group icon display */}
                    <aside className="flex ">
                        {/* Group box visual */}
                        <div
                            // styling inline because tailwind doesnt like dynamic color changes
                            style={{
                                backgroundColor: BackgroundColor,
                                color: TextColor,
                            }}
                            className={`size-60 border-2 border-solid border-[#282F72] rounded-3xl m-4 text-center align-center content-center justify-center`}
                        >
                            <p className={`text-xl m-2 font-bold`}>
                                {GroupName}
                            </p>
                            <p className={`text-9xl m-0 select-none`}>
                                {EmojiSelect}
                            </p>
                            <p className={`text-l m-2`}>
                                Members:
                                <span className="font-bold">{MemberCount}</span>
                            </p>
                        </div>
                    </aside>
                    {/* Left for the members list */}
                    <aside className="text-left justify-left content-left align-left left-0 text-2xl">
                        {/* Display members */}
                        <p className="mt-3">Group members:</p>
                        <p>You</p>
                        {SelectedUsers.map((user) => (
                            <div key={user.userId}>
                                <p>
                                    {user.userName}
                                    <span
                                        className="cursor-pointer"
                                        onClick={() => {
                                            handleSelectUser(user);
                                        }}
                                    >
                                        ❌
                                    </span>
                                </p>
                            </div>
                        ))}
                    </aside>
                </section>
                {ErrorBool && (
                    <div className="fixed ml-100 content-center justify-center align-center text-center w-100 h-80 bg-white border-black border-2 rounded-3xl">
                        <p className="text-red-500 text-3xl mt-1">
                            {ErrorMessage}
                        </p>
                        <p className="text-red-500 text-sm">{ErrorExplain}</p>
                        <p
                            className="cursor-pointer m-4 mt-10 text-4xl"
                            onClick={() => {
                                setErrorBool(false);
                            }}
                        >
                            ❌
                        </p>
                    </div>
                )}
            </section>
        </>
    );
}
