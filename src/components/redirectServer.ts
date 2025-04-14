import { config } from 'dotenv';
import { redirect } from 'next/navigation';

config({ path: '.env' }); // or .env.local

export default function redirectServer(path: string): void {
    const rootPath = process.env.URL_PATH || '/';

    // Remove leading slashes
    if (path) {
        path = path.replace(/^\/+/, '');
    } else {
    }

    // Redirect including PATH variable
    // Does not add redirection to history
    redirect(rootPath + path);
}
