import { login_check, register_user } from '@/components/login';
import { JSX } from 'react';

export default function Page(): JSX.Element {
    let loginResponse = '';
    let signupResponse = '';

    const handleLogin = async (formData: FormData): Promise<void> => {
        'use server';

        const response = login_check({
            username: (formData.get('username') as string) || '',
            password: (formData.get('password') as string) || '',
        });

        // if ((await response).status === 200) {
        //     loginResponse = 'Login successful';
        // } else {
        //     loginResponse = (await response).message || 'An error occurred';
        // }
    };

    const handleSignup = async (formData: FormData): Promise<void> => {
        'use server';

        const response = register_user({
            username: (formData.get('username') as string) || '',
            email: (formData.get('email') as string) || '',
            password: (formData.get('password') as string) || '',
        });

        // if ((await response).status === 200) {
        //     signupResponse = 'Signup successful';
        // } else {
        //     signupResponse = (await response).message || 'An error occurred';
        // }
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
            <p>{loginResponse}</p>
            <br />
            <h1>Signup</h1>
            <form action={handleSignup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
                <button type="submit">Login</button>
            </form>
            <p>{signupResponse}</p>
        </div>
    );
}
