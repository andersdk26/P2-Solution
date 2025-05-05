'use client';

import {
    ChangeDbGroupName,
    ChangeDbGroupSettings,
} from '@/actions/groups/adminGroupActions';
import { JSX, use, useState } from 'react';

type changeSettingsProps = {
    groupId: number;
    settings: string[];
    groupName: string;
};

export function ChangeGroupSettings({
    groupId,
    settings,
    groupName,
}: changeSettingsProps): JSX.Element {
    // variables to keep track of settings
    const [NewGroupName, setNewGroupName] = useState(groupName);
    const [NewEmoji, setNewEmoji] = useState(settings[0]);
    const [NewBackground, setNewBackground] = useState(settings[1]);
    const [NewText, setNewText] = useState(settings[2]);

    //New settings string
    const [NewSettings, setNewSettings] = useState(
        `${NewEmoji}|${NewBackground}|${NewText}`
    );

    const handleChangeSettingsSubmit = async () => {
        const newSettingsArray = [NewEmoji, NewBackground, NewText];

        // make into strings to compare if they are equal. if so, no changes has been made and return
        if (JSON.stringify(newSettingsArray) === JSON.stringify(settings)) {
            alert('No changes has been made');
            return;
        }

        // validate input
        if (NewBackground === NewText) {
            alert('Background color and Text color cannot be the same');
            return;
        }

        console.log(NewSettings);
        await ChangeDbGroupSettings(groupId, NewSettings);
        alert(
            `Settings have been changes to: ${NewEmoji}, ${NewBackground}, and ${NewText}`
        );
        location.reload();
    };

    const handleChangeGroupNameSubmit = async () => {
        // compare if they are equal. if so, no changes has been made and return
        if (NewGroupName === groupName) {
            alert('No changes has been made');
            return;
        }

        // validate input
        const isValidCharacter = (text: string): boolean => {
            const validCharacterRegex: RegExp = /^[a-zA-Z0-9]*$/;
            return validCharacterRegex.test(text);
        };
        if (isValidCharacter(NewGroupName) === false) {
            alert('Only numbers and characters allowed');
            return;
        }

        //length validation
        if (NewGroupName.length < 2) {
            alert('Too short groupname. 2-16 characters');
            return;
        }

        //length validation
        if (NewGroupName.length > 16) {
            alert('Too long groupname. 2-16 characters');
            return;
        }

        console.log(NewGroupName);
        await ChangeDbGroupName(groupId, NewGroupName);
        alert(`Groupname has been changed to ${NewGroupName}`);
        location.reload();
    };

    return (
        <>
            <p>Change Group name</p>
            <input
                className="bg-white text-black rounded-full p-1 px-4 w-60"
                type="text"
                defaultValue={groupName}
                placeholder={groupName}
                minLength={2}
                maxLength={16}
                onChange={(e) => setNewGroupName(e.target.value)}
            />
            <br />
            <button
                className="bg-[#282F72] hover:bg-[#424ebd] text-[#dcdee7] text-xl font-bold py-2 px-4 mt-2 rounded-sm"
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    handleChangeGroupNameSubmit();
                }}
            >
                Change groupname
            </button>
            <br />
            <label htmlFor="Emoji">Change Emoji</label>
            <br />
            <select
                name="Emoji"
                id="Emoji"
                className="text-5xl"
                defaultValue={settings[0]}
                onChange={(e) => {
                    setNewEmoji(e.target.value);
                    setNewSettings(
                        `${e.target.value}|${NewBackground}|${NewText}`
                    );
                }}
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
            <p>Change Background color</p>
            <input
                type="color"
                name="backgroundColor"
                id="backgroundColorSelect"
                className="rounded-sm border-black border-2"
                defaultValue={settings[1]}
                onChange={(e) => {
                    setNewBackground(e.target.value);
                    setNewSettings(`${NewEmoji}|${e.target.value}|${NewText}`);
                }}
            />
            <p>Change Text color</p>
            <input
                type="color"
                className="rounded-sm border-black border-2"
                defaultValue={settings[2]}
                onChange={(e) => {
                    setNewText(e.target.value);
                    setNewSettings(
                        `${NewEmoji}|${NewBackground}|${e.target.value}`
                    );
                }}
            />
            <br />
            <button
                className=" mb-4 bg-[#282F72] hover:bg-[#424ebd] text-[#dcdee7] text-xl font-bold py-2 px-4 rounded-sm"
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    handleChangeSettingsSubmit();
                }}
            >
                Change Settings
            </button>
        </>
    );
}
