import { config } from 'dotenv';
import { redirect } from 'next/navigation';

config({ path: '.env' }); // or .env.local

export default function redirectPath(path: string): void {
    if (path[0] === '/') {
        path = path.substring(1);
    }

    redirect(process.env.PATH + path);
}
