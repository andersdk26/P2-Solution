'use client';

import { config } from 'dotenv';
import { redirect } from 'next/navigation';

config({ path: '.env' }); // or .env.local

export default function redirectClient(
    path: string,
    addToHistory: boolean = true
): void {
    const rootPath = process.env.URL_PATH || '/';

    // Remove leading slash
    if (path && path[0] === '/') {
        path = path.substring(1);
    } else if (!path) {
        path = '';
    }

    // Push last page to browser window history
    if (addToHistory) {
        // TODO something
        // window.history.pushState({ pathname: rootPath }, '');
    }

    // Redirect including PATH variable
    redirect(rootPath + path);
}
