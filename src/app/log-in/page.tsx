'use client';

import { JSX, useEffect, useState } from 'react';
import { handleLogin, handleSignup } from 'app/actions/log-in/userLogin';
import verifyUser from '@/actions/log-in/authenticateUser';
import userLogout from '@/actions/log-in/userLogout';

export default function Page(): JSX.Element {
    const [loginResponse, setLoginResponse] = useState('');
    const [signupResponse, setSignupResponse] = useState('');
    const [userId, setUserId] = useState(0);

    // Check if the user is logged in
    useEffect(() => {
        const checkAuthStatus = async (): Promise<void> => {
            const response = await verifyUser();
            setUserId(response);
        };
        checkAuthStatus();
    }, [loginResponse, signupResponse]); // trigger when login or signup response changes

    return (
        <div>
            <h1>Login</h1>
            <form
                action={async (formData) => {
                    const responseMessage = await handleLogin(formData);
                    setLoginResponse(responseMessage);
                }}
            >
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
                <button type="submit">Login</button>
            </form>
            <p>{loginResponse}</p>
            <br />
            <h1>Signup</h1>
            <form
                action={async (formData) => {
                    const responseMessage = await handleSignup(formData);
                    setSignupResponse(responseMessage);
                }}
            >
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
                <button type="submit">Login</button>
            </form>
            <p>{signupResponse}</p>
            {userId !== 0 && (
                <>
                    <br />
                    <h1 className="text-xl">Logged in as user {userId}</h1>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={async () => {
                            await userLogout();
                            setUserId(0);
                        }}
                    >
                        Log out
                    </button>
                </>
            )}
        </div>
    );
}
