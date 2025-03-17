import { login_check } from '@/components/login';
import { JSX } from 'react';

export default function Page(): JSX.Element {
    const handleLogin = async (formData: FormData): Promise<void> => {
        'use server';

        login_check({
            username: (formData.get('username') as string) || '',
            password: (formData.get('password') as string) || '',
        });

        // const response = await fetch('/api/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ username, password }),
        // });

        // if (response.ok) {
        //     console.log('Login successful');
        //     return;
        // }

        // console.log('Login failed');
    };

    return (
        <div>
            <h1>Login</h1>
            <form action={handleLogin}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
