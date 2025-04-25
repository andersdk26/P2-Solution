import { JSX, useState } from 'react';
import { searchUserById, user } from '../Profile/Friends/friends';

export function FormCreateGroup(): JSX.Element {
    // state for search research
    const [searchResult, setSearchResult] = useState<user[]>([]);
    // array with the users in the group
    const [SelectedUsers, setSelectedUsers] = useState<user[]>([]);

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

    // Function for handling selection of users.
    const handleSelectUser = (user: user): void => {
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

            return newSelection;
        });
        alert(JSON.stringify(SelectedUsers));
    };

    return (
        <>
            {/* Flex container for the content*/}
            <section className="grid grid-cols-2">
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
                        className="w-80 justify-stretch mx-auto py-4 text-black "
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="search"
                            id="UserSearch"
                            className="block w-full p-4 rounded-full bg-gray-100"
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
                    <section
                        id="searchResults"
                        className="absolute w-120 bg-gray-100 rounded-3xl max-h-50 overflow-scroll"
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
                            className="bg-white text-black"
                            onChange={(e) => setGroupName(e.target.value)}
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
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            value={BackgroundColor}
                        />
                        <br />
                        <label className="mb-1 mt-1">Pick Text-color:</label>
                        <br />
                        <input
                            type="color"
                            onChange={(e) => setTextColor(e.target.value)}
                            value={TextColor}
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
                            <p className={`text-9xl m-0 select-none`}>
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
                        <p className="mt-1">Group members:</p>
                        {SelectedUsers.map((user) => (
                            <div key={user.userId}>
                                <p>{user.userName}</p>
                            </div>
                        ))}
                    </aside>
                </section>
            </section>
        </>
    );
}
