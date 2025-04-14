'use client';

import { useRouter } from 'next/navigation';

export default function useRedirect() {
    const router = useRouter();

    return (path: string, addToHistory: boolean = true) => {
        const rootPath = process.env.URL_PATH || '/';
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        const finalPath = rootPath + cleanPath;

        if (addToHistory) {
            router.push(finalPath); // Tilføjer til historik
        } else {
            router.replace(finalPath); // Overskriver historik
        }
    };
}
