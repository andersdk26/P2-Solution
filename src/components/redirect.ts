'use client';

import { useRouter } from 'next/navigation';
import { config } from 'dotenv';

config({ path: '.env' }); // or .env.local

export default function useRedirect() {
    const router = useRouter();

    return (path: string, addToHistory: boolean = true): void => {
        const rootPath = process.env.NEXT_PUBLIC_URL_PATH || '/';
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        const finalPath = rootPath + cleanPath;

        if (addToHistory) {
            router.push(finalPath);
        } else {
            router.replace(finalPath);
        }
    };
}
