// /Users/frederikskipper-andersen/Documents/GitHub/P2-Solution/src/components/Profile/ProfileSettings/page.tsx
'use client';
import React, { JSX } from 'react';
import GroupIcon from '@/components/groupPage/groupIcon';
import { groupId } from '@/components/groupPage/groupIcon';

const groupIdTemp: groupId = {
    Id: 123,
    Name: 'Group1',
    Emoji: '🍿',
    Members: 7,
};

const groupIdTemp2: groupId = {
    Id: 124,
    Name: 'Group2',
    Emoji: '🎥',
    Members: 2,
};

const groupIdTemp3: groupId = {
    Id: 125,
    Name: 'Group5',
    Emoji: '🎞️',
    Members: 4,
};

const GroupSettings = (): JSX.Element => (
    <div>
        <h1>Groups</h1>
        <section>
            <h2>Your groups</h2>
            <p>
                <i>You are admin</i>
            </p>
            <section >
                <GroupIcon groupId={groupIdTemp} />
                <GroupIcon groupId={groupIdTemp3} />
            </section>
        </section>

        <section>
            <h2>Groups you have joined</h2>
            <GroupIcon groupId={groupIdTemp2} />
        </section>

        <section>
            <h2>Requests...</h2>
            <p>Groups that have asked you to join</p>
        </section>
    </div>
);
export default GroupSettings;
