// /Users/frederikskipper-andersen/Documents/GitHub/P2-Solution/src/components/Profile/ProfileSettings/page.tsx
'use client';
import React, { JSX } from 'react';
import AdminGroupIcon from '@/components/groupPage/adminGroupIcon';
import GroupIcon from '@/components/groupPage/groupIcon';
import GroupRequestIcon from '@/components/groupPage/groupRequestIcon';
import CreateGroupIcon from '@/components/groupPage/createGroupIcon';
import SearchGroupIcon from '@/components/groupPage/searchGroupIcon';

export type groupId = {
    Id: number;
    Name: string;
    Members: string[];
    Admin: string;
    Settings: {
        BackgroundColor: string;
        TextColor: string;
        Emoji: string;
    };
};

// test groups
const groupIdTemp: groupId = {
    Id: 123,
    Name: 'Group1',
    Members: ['me', 'you', 'tom'],
    Admin: 'me',
    Settings: {
        BackgroundColor: 'bg-white',
        TextColor: 'black',
        Emoji: '🍿',
    },
};

const groupIdTemp2: groupId = {
    Id: 124,
    Name: 'Group2',
    Members: ['mom', 'dad', 'child', 'you'],
    Admin: 'you',
    Settings: {
        BackgroundColor: 'bg-pink-700',
        TextColor: '[#282F72]',
        Emoji: '🎥',
    },
};

const groupIdTemp3: groupId = {
    Id: 125,
    Name: 'Group5',
    Members: ['sara', 'you', 'me', 'tom', 'mom', 'child', 'burger', 'bob'],
    Admin: 'sara',
    Settings: {
        BackgroundColor: 'bg-black',
        TextColor: 'white',
        Emoji: '🎞️',
    },
};

const GroupSettings = (): JSX.Element => (
    <div>
        <h1>Groups</h1>
        <section>
            <h2 className="ml-4">Your groups</h2>
            <p className="text-2xl ml-4">
                <i>You are admin</i>
            </p>
            <div className="flex">
                <AdminGroupIcon groupId={groupIdTemp} />
                <AdminGroupIcon groupId={groupIdTemp3} />
                <CreateGroupIcon />
            </div>
        </section>

        <section>
            <h2 className="ml-4">Groups you have joined</h2>
            <div className="flex">
                <GroupIcon groupId={groupIdTemp2} />
                <SearchGroupIcon />
            </div>
        </section>

        <section>
            <h2 className="ml-4">Requests...</h2>
            <p className="text-2xl ml-4">Groups that have asked you to join</p>
            <GroupRequestIcon groupId={groupIdTemp2} />
        </section>
    </div>
);
export default GroupSettings;
