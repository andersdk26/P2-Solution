import { JSX, useRef } from 'react';
import { useState } from 'react';
import AboutGroup from './aboutGroup';
import { groupId } from 'app/(with-navbar)/Groups/page';

export default function GroupIcon({ groupId }: groupId): JSX.Element {
    const [isAboutGroupOpen, setAboutGroupOpen] = useState(false);
    const backgroundDivRef = useRef<HTMLDivElement | null>(null);

    const color = `bg-${groupId.Color}`;
    const textColor = `text-${groupId.TextColor}`;

    const toggleGroup = (): void => {
        setAboutGroupOpen(!isAboutGroupOpen);
    };

    return (
        <>
            {/* <div
                className="none w-full h-full z-3 bg-black"
                id="backgroundDiv"
                onClick={() => {
                    setAboutGroupOpen(false);
                    if (backgroundDivRef.current) {
                        backgroundDivRef.current.style.display = 'none';
                    }
                }}
            ></div> */}
            {/* The div for the entire box, onclick: open the about group */}
            <div
                className={`size-60 border-2 border-solid border-[#282F72] ${color} ${textColor} inline-block rounded-3xl m-4 text-center align-center cursor-pointer`}
                onClick={toggleGroup}
            >
                <p className={`text-xl ${textColor} m-2 font-bold`}>
                    {groupId.Name}
                </p>
                <p className="text-9xl m-0 select-none">{groupId.Emoji}</p>
                <p className={`text-l m-2`}>
                    Members:
                    <span className="font-bold">{groupId.Members}</span>
                </p>
            </div>
            {/* the information about groups in the box */}
            {isAboutGroupOpen && (
                <section className="flex h-screen w-screen centering">
                    {/* <AboutGroup groupId={groupId} /> */}
                    <div
                        className={`absolute z-30 w-300 h-150 border-2 border-solid border-[#282F72] ${color} ${textColor} rounded-3xl m-4 text-center align-center items-center top-40`}
                    >
                        {/* close button */}
                        <button
                            className={`absolute z-50 ${textColor} mr-10 mt-4 text-right right-0`}
                            onClick={toggleGroup}
                        >
                            Close
                        </button>

                        <p>hello</p>
                    </div>
                </section>
            )}
        </>
    );
}
