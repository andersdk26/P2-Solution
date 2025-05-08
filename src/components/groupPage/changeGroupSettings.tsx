'use client';

import {
    ChangeDbGroupName,
    ChangeDbGroupSettings,
} from '@/actions/groups/adminGroupActions';
import { JSX, use, useState } from 'react';
import GroupToast from '@/components/toast/toast';

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

    // Toast message for success/error and is used to show a toast message when an action is performed
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error';
    } | null>(null);

    const handleChangeSettingsSubmit = async () => {
        const newSettingsArray = [NewEmoji, NewBackground, NewText];

        // make into strings to compare if they are equal. if so, no changes has been made and return
        if (JSON.stringify(newSettingsArray) === JSON.stringify(settings)) {
            setToast({
                message: 'No changes has been made',
                type: 'error',
            });
            return;
        }

        // validate input
        if (NewBackground === NewText) {
            setToast({
                message: 'Background color and Text color cannot be the same',
                type: 'error',
            });
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
            setToast({
                message: 'No changes has been made',
                type: 'error',
            });
            return;
        }

        // validate input
        const isValidCharacter = (text: string): boolean => {
            const validCharacterRegex: RegExp = /^[a-zA-Z0-9]*$/;
            return validCharacterRegex.test(text);
        };
        if (isValidCharacter(NewGroupName) === false) {
            setToast({
                message: 'Only numbers and characters allowed',
                type: 'error',
            });
            return;
        }

        //length validation
        if (NewGroupName.length < 2) {
            setToast({
                message: 'Too short groupname. 2-16 characters',
                type: 'error',
            });
            return;
        }

        //length validation
        if (NewGroupName.length > 16) {
            setToast({
                message: 'Too long groupname. 2-16 characters',
                type: 'error',
            });
            return;
        }

        console.log(NewGroupName);
        await ChangeDbGroupName(groupId, NewGroupName);
        alert(`Groupname has been changed to ${NewGroupName}`);
        location.reload();
    };

    return (
        <>
            {/* Toast message */}
            {toast && (
                <GroupToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
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
