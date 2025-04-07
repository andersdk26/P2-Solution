import { JSX } from 'react';

export type groupId = {
    Id: number;
    Name: string;
    Emoji: string;
    Members: number;
};

export default function GroupIcon({ groupId }: groupId): JSX.Element {
    return (
        <div className="size-60 border-2 border-solid border-[#282F72] bg-[#424ebd] inline-block rounded-3xl m-4 text-center align-center">
            <p className="text-xl text-[#282F72] m-2 font-bold">
                {groupId.Name}
            </p>
            <p className="text-9xl m-0">{groupId.Emoji}</p>
            <p className="text-l text-[#282F72] m-2">
                Members:
                <span className="font-bold">{groupId.Members}</span>
            </p>
        </div>
    );
}
