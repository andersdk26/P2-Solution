'use server';

import { login_check, register_user } from '@/components/db/userAuth';

export async function handleLogin(formData: FormData): Promise<string> {
    'use server';

    let loginResponse = '';

    const response = login_check({
        username: (formData.get('username') as string) || '',
        password: (formData.get('password') as string) || '',
    });

    if ((await response).status === 200) {
        loginResponse = 'Login successful';
    } else {
        loginResponse = (await response).message || 'An error occurred';
    }

    return loginResponse;
}

export async function handleSignup(formData: FormData): Promise<string> {
    'use server';

    let signupResponse = '';

    const response = register_user({
        username: (formData.get('username') as string) || '',
        email: (formData.get('email') as string) || '',
        password: (formData.get('password') as string) || '',
    });

    if ((await response).status === 200) {
        signupResponse = 'Signup successful';
    } else {
        signupResponse = (await response).message || 'An error occurred';
    }

    return signupResponse;
}
