import { JSX } from 'react';
import { useState } from 'react';
import AboutGroup from './aboutGroup';

export type groupId = {
    Id: number;
    Name: string;
    Emoji: string;
    Members: number;
    Admin: string;
    Color: string;
    TextColor: string;
};

export default function GroupIcon({ groupId }: groupId): JSX.Element {
    const [isAboutGroupOpen, setAboutGroupOpen] = useState(false);
    const color = `bg-${groupId.Color}`;
    const textColor = `text-${groupId.TextColor}`;

    const toggleGroup = () => {
        setAboutGroupOpen(!isAboutGroupOpen);
    };

    return (
        <>
            <div
                className={`size-60 border-2 border-solid border-[#282F72] ${color} inline-block rounded-3xl m-4 text-center align-center cursor-pointer`}
                onClick={toggleGroup}
            >
                <p className={`text-xl ${textColor} m-2 font-bold`}>
                    {groupId.Name}
                </p>
                <p className="text-9xl m-0">{groupId.Emoji}</p>
                <p className={`text-l ${textColor} m-2`}>
                    Members:
                    <span className="font-bold">{groupId.Members}</span>
                </p>
            </div>
            {isAboutGroupOpen && <AboutGroup />}
        </>
    );
}
