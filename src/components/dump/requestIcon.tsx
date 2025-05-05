// 'use client';
// import { JSX, useEffect } from 'react';
// import { useState } from 'react';
// import getUserById from '@/actions/friends/getUserById';
// import { getGroupNameById } from '../groupPage/group';

// export default function RequestGroupIcon(
//     userId: number,
//     groupId: number
// ): JSX.Element {
//     //keeps track of the pop up
//     const [isAboutRequestOpen, setAboutRequestOpen] = useState(false);

//     const groupName = getGroupNameById(groupId);

//     return (
//         <>
//             {/* The div for the entire box, onclick: open the about group */}
//             <div
//                 className={`size-60 border-2 border-solid border-[#282F72] hover:brightness-80 inline-block rounded-3xl m-4 text-center align-center content-center justify-center cursor-pointer`}
//                 onClick={() => setAboutRequestOpen(true)}
//             >
//                 <p>
//                     {getUserById(userId)} wants to join {groupName}
//                 </p>
//             </div>

//             {/* the information about request in the box */}
//             {isAboutRequestOpen && (
//                 // Container for the about request
//                 <section
//                     className={`fixed top-4 left-0 z-40 w-screen h-screen flex items-center justify-center `}
//                 >
//                     {/* left div, About request information */}
//                     <div
//                         className={`block z-30 w-5/6 h-2/3 border-2 border-solid border-[#282F72]  rounded-3xl m-4 align-center items-center overflow-scroll`}
//                     >
//                         {/* close button */}
//                         <button
//                             className={`float-right right-4 top-3 mr-4 mt-2 mb-0 z-50 cursor-pointer text-2xl hover:opacity-85 select-none`}
//                             onClick={() => setAboutRequestOpen(false)}
//                         >
//                             <u>Close</u>
//                         </button>
//                         <br />
//                     </div>
//                 </section>
//             )}
//         </>
//     );
// }
