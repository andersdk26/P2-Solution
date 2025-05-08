import { config } from 'dotenv';
import { redirect } from 'next/navigation';

config({ path: '.env' }); // or .env.local

export default function redirectServer(path: string): void {
    const rootPath = process.env.NEXT_PUBLIC_URL_PATH || '/';

    // Remove leading slashes
    if (path) {
        path = path.replace(/^\/+/, '');
    }

    // Redirect including PATH variable
    // Does not add redirection to history
    console.log(rootPath + path);

    redirect(`${rootPath + path}/`);
}
