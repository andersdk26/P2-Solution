'use client';
import { JSX } from 'react';
import { useState } from 'react';
import { FormCreateGroup } from './formCreateGroup';
import GroupToast from '@/components/toast/toast';

interface CreateGroupIconProps {
    adminGroupNumber: number;
}

export default function CreateGroupIcon({
    adminGroupNumber,
}: CreateGroupIconProps): JSX.Element {
    const [isAboutGroupOpen, setAboutGroupOpen] = useState(false);

    // Toast message for success/error and is used to show a toast message when an action is performed
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error';
    } | null>(null);

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
            {/* The div for the entire box, onclick: open the create group pop-up */}
            <div
                className={`size-60 border-2 border-solid border-[#282F72] bg-[#9fa3d1] hover:brightness-80 text-[#282f72] inline-block rounded-3xl m-4 text-center align-top items-center content-center justify-center cursor-pointer `}
                onClick={() => {
                    if (adminGroupNumber > 4) {
                        setToast({
                            message: 'You cannot create more groups',
                            type: 'error',
                        });
                        return;
                    }
                    setAboutGroupOpen(true);
                }}
            >
                <p className="text-9xl m-0">+</p>
                <p className="text-2xl m-0">Create Group</p>
            </div>

            {/* the information about groups in the box */}
            {isAboutGroupOpen && (
                // Container for the about group
                <section
                    className={`fixed top-4 left-0 z-40 w-screen h-screen flex items-center justify-center`}
                >
                    {/* the box container */}
                    <div
                        className={`z-50 w-5/6 h-2/3 border-2 border-solid border-[#282F72] bg-[#9fa3d1] rounded-3xl m-4 align-center items-center overflow-scroll`}
                    >
                        {/* close button */}
                        <button
                            className={`float-right right-4 top-3 mr-4 mt-2 mb-0 z-50 cursor-pointer text-2xl hover:opacity-85`}
                            onClick={() => setAboutGroupOpen(!isAboutGroupOpen)}
                        >
                            <u>Close</u>
                        </button>

                        {/* heading */}
                        <h5
                            className={` text-5xl m-2 font-bold text-center mt-10 `}
                        >
                            Create a group
                        </h5>
                        <FormCreateGroup />
                    </div>
                </section>
            )}
        </>
    );
}
