//taken from https://medium.com/edonec/build-a-react-collapsible-component-from-scratch-using-react-hooks-typescript-73dfd02c9208

import React, { ReactNode, useState } from 'react';

interface IProps {
    open?: boolean;
    title: string;
    children: ReactNode;
}

const HelpBtn: React.FC<IProps> = ({ open, children, title }) => {
    const [isOpen, setIsOpen] = useState(open);

    const handleFilterOpening = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            <div className="card">
                <div>
                    {/* css to question container */}
                    <div className="p-5 bg-[#9fa3d1] ml-100 mr-100 rounded-t-sm">
                        <h5 className="float-left">{title}</h5>
                        <button
                            type="button"
                            className="btn"
                            onClick={handleFilterOpening}
                        >
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
