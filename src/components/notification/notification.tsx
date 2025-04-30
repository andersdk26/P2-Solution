'use client';
import React, { useState, useEffect, JSX, useRef } from 'react';
import Image from 'next/image';
import '@/styles/animation.css';

const Notification = (): JSX.Element => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // changes state to the opposite when registers a click
    const toggleDropdown = (): void => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return (): void => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef}>
            {/* Show drop down when clicked on, disappear when click again */}
            <button
                onClick={toggleDropdown}
                className="centerMyDivPlease cursor-pointer shakeIcon"
            >
                {/* the bell image */}
                <Image
                    src={'/img/Bell icon.png'}
                    width={30}
                    height={30}
                    alt={'Notification tab'}
                    title="Notification"
                    draggable="false"
                />
            </button>
            {/* the notification dropdown */}
            {isDropdownOpen && (
                <div className="absolute select-none top-21 right-18 bg-[#9fa3d1] border-2 border-solid border-[#282f72] text-[#282f72] text-xs p-4 rounded-md w-1/8 my-3 z-100">
                    <p className="font-bold text-sm">Notifications</p>
                    <p>User1 Joined Group1</p>
                </div>
            )}
        </div>
    );
};

export default Notification;
