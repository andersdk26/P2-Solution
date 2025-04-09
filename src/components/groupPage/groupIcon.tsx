import { JSX } from 'react';
import { useState } from 'react';
import AboutGroup from './aboutGroup';
import { groupId } from 'app/(with-navbar)/Groups/page';

export default function GroupIcon({ groupId }: groupId): JSX.Element {
    const [isAboutGroupOpen, setAboutGroupOpen] = useState(false);
    const color = `bg-${groupId.Color}`;
    const textColor = `text-${groupId.TextColor}`;

    const toggleGroup = (): void => {
        setAboutGroupOpen(!isAboutGroupOpen);
    };

    return (
        <>
            {/* The div for the entire box, onclick: open the about group */}
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
            {/* the information about the box */}
            {isAboutGroupOpen && <AboutGroup groupId={groupId} />}
        </>
    );
}
