import { config } from 'dotenv';
import { redirect, router } from 'next/navigation';

config({ path: '.env' }); // or .env.local

interface redirectPathProps {
    path: string;
    addToHistory?: boolean;
}

export default function redirectPath({
    path,
    addToHistory = true,
}: redirectPathProps): void {
    const homePath = process.env.URL_PATH || '/';

    // Remove leading slash
    if (path[0] === '/') {
        path = path.substring(1);
    }

    // Push last page to brower window history
    if (addToHistory) {
        // TODO something
        window.history.pushState(null, '', homePath + path);
    }

    // Redirect including PATH variable
    redirect(homePath + path);
}
