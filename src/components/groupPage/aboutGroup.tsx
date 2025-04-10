import { groupId } from 'app/(with-navbar)/Groups/page';
import '@/styles/group.css';

export default function AboutGroup({ groupId }: groupId): JSX.Element {
    const color = `bg-${groupId.Color}`;
    const textColor = `text-${groupId.TextColor}`;
    

    return (
        <div
            className={`absolute z-30 w-300 h-150 border-2 border-solid border-[#282F72] ${color} ${textColor} rounded-3xl m-4 text-center align-center items-center top-40`}
        >
            <p>Hello</p>
        </div>
    );
}
