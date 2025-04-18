'use server';

import { generateToken } from '@/components/authentication/cookieAuthentication';
import { login_check, register_user } from '@/components/db/userAuth';
import { cookies } from 'next/headers';
import { config } from 'dotenv';

config({ path: '.env' }); // or .env.local

interface LoginResponse {
    status: number;
    message?: string;
    object?: { id?: number };
}

export async function handleLogin(formData: FormData): Promise<string> {
    // Verify the user's login credentials
    const response: Promise<LoginResponse> = login_check({
        username: (formData.get('username') as string) || '',
        password: (formData.get('password') as string) || '',
    });

    // Check if the user can be logged in
    if ((await response).status !== 200) {
        return (await response).message || 'An error occurred';
    }

    // Check if the user ID is returned
    if (
        (await response).object === undefined ||
        (await response).object?.id === undefined
    ) {
        return 'An error occurred';
    }

    // Extract the user ID and generate a token
    const userId = (await response).object?.id || 0;
    const token = await generateToken(userId.toString());

    // Set the token as a cookie
    if ((await setCookie(token)) === false) {
        return 'An error occurred';
    }

    return 'Login successful';
}

export async function handleSignup(formData: {
    username: string;
    email: string;
    password: string;
}): Promise<string> {
    // Set username and email to lower case
    //formData.username = formData.username.toLowerCase();
    formData.email = formData.email.toLowerCase();

    // Register the user
    const response: Promise<LoginResponse> = register_user(formData);

    // Check if the user was registered
    if ((await response).status !== 201) {
        return (await response).message || 'An error occurred';
    }

    // Check if the user ID is returned
    if (
        (await response).object === undefined ||
        (await response).object?.id === undefined
    ) {
        return 'An error occurred';
    }

    // Extract the user ID and generate
    const userId = (await response).object?.id || 0;
    const token = await generateToken(userId.toString());

    // Set the token as a cookie
    if ((await setCookie(token)) === false) {
        return 'An error occurred';
    }

    return 'Signup successful';
}

export async function setCookie(data: string): Promise<boolean> {
    const cookieStore = await cookies();

    // Set the token cookie
    cookieStore.set('token', data, {
        secure: true,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1, // 1 days
        path: process.env.NEXT_PUBLIC_URL_PATH || '/',
    });

    // Check if the token cookie is set
    return cookieStore.has('token');
}
