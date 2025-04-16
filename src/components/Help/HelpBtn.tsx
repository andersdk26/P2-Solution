//taken from https://medium.com/edonec/build-a-react-collapsible-component-from-scratch-using-react-hooks-typescript-73dfd02c9208

import React, { ReactNode, useState } from 'react';
interface IProps {
    open?: boolean;
    title: string;
    children: ReactNode;
}

// at default, the button is set to close (open = false)
const HelpBtn: React.FC<IProps> = ({ open = false, children, title }) => {
    const [isOpen, setIsOpen] = useState(open);

    const handleFilterOpening = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            <div>
                <div>
                    {/* css to question container */}
                    <div className="p-5 pb-15 bg-[#9fa3d1] ml-100 mr-100 rounded-t-sm">
                        {/* title is to the left side */}
                        <h5 className="float-left">{title}</h5>
                        {/* button is to the right side */}
                        <button
                            type="button"
                            className="float-right"
                            onClick={handleFilterOpening}
                        >
                            {/* open and close button - css*/}
                            {!isOpen ? (
                                <p className="bg-[#282F72] hover:bg-[#424ebd] text-white px-4 py-2 rounded-full shadow">
                                    ⇩
                                </p>
                            ) : (
                                <p className="bg-[#282F72] hover:bg-[#424ebd] text-white px-4 py-2 rounded-full shadow">
                                    ⇧
                                </p>
                            )}
                        </button>
                    </div>
                </div>

                {/* css to answer container */}
                <div className="bg-[#282f72] ml-100 mr-100 mb-8 rounded-b-sm">
                    <div>{isOpen && <div className="p-3">{children}</div>}</div>
                </div>
            </div>
        </>
    );
};

export default HelpBtn;
