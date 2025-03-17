import { login_check } from '@/components/login';

const handleLogin = async (formData: FormData): Promise<void> => {
    'use server';

    const response = login_check({
        username: (formData.get('username') as string) || '',
        password: (formData.get('password') as string) || '',
    });

    if ((await response).status === 200) {
        setLoginResponse('Login successful');
    } else {
        setLoginResponse((await response).message || 'An error occurred');
    }
};

const handleSignup = async (formData: FormData): Promise<void> => {
    'use server';

    const response = register_user({
        username: (formData.get('username') as string) || '',
        email: (formData.get('email') as string) || '',
        password: (formData.get('password') as string) || '',
    });

    if ((await response).status === 200) {
        setSignupResponse('Signup successful');
    } else {
        setSignupResponse((await response).message || 'An error occurred');
    }
};
