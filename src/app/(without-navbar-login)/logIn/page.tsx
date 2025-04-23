'use client';

import { JSX, useEffect, useState } from 'react';
import { handleLogin, handleSignup } from '@/actions/logIn/userLogin';
import verifyUser from '@/actions/logIn/authenticateUser';
import { useRouter } from 'next/navigation';
import useRedirect from '@/components/redirect';

export default function Page(): JSX.Element {
    const redirect = useRedirect(); // Custom hook for redirection
    const [loginResponse, setLoginResponse] = useState('');
    const [signupResponse, setSignupResponse] = useState('');
    const [userId, setUserId] = useState(0);
    const router = useRouter(); // Use the useRouter hook

    useEffect(() => {
        // Check if the user is logged in. If they are already logged in, redirect them to the main page
        const checkLoginStatus = async (): Promise<void> => {
            if ((await verifyUser()) > 1) {
                redirect('');
            }
        };
        checkLoginStatus();
    }, []);

    // Check if the user is logged in
    useEffect(() => {
        const checkAuthStatus = async (): Promise<void> => {
            const response = await verifyUser();
            setUserId(response);
        };
        checkAuthStatus();
    }, [loginResponse, signupResponse]); // trigger when login or signup response changes

    //reloads page efter login for at få brugermnavnet til at vise den rigtige bruger
    if (loginResponse === 'Login successful') {
        //window.location.reload(); // Reload the page after successful login
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-2xl font-semibold mb-6 text-center">
                    Login
                </h1>
                <form
                    action={async (formData) => {
                        const responseMessage = await handleLogin(formData);
                        setLoginResponse(responseMessage);

                        if (responseMessage === 'Login successful') {
                            redirect(''); // Redirect to the main page only if login is successful
                        }
                    }}
                    className="flex flex-col gap-4"
                >
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Login
                    </button>
                </form>

                {loginResponse && (
                    <p className="mt-4 text-sm text-center text-red-600">
                        {loginResponse}
                    </p>
                )}
                <p className="mt-4 text-sm text-center text-gray-600">
                    Do you not have an account?{' '}
                    <a href="/signUp" className="text-blue-600 hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
}
