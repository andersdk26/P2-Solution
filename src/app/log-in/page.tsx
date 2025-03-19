'use client';

import { JSX, useState } from 'react';
import { handleLogin, handleSignup } from 'app/actions/log-in/userLogin';

export default function Page(): JSX.Element {
    const [loginResponse, setLoginResponse] = useState('');
    const [signupResponse, setSignupResponse] = useState('');

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
        </div>
    );
}
