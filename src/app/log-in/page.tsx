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
//log-in page

/* consists of:
 *  log-in title
 *  email or username
 *      should be transparent text --> will dissapear once someone writes in it
 *  password
 *      =||=
 *  log-in button
 *      will redirect to main-page
 *  sign up-button
 *      will redirect to sign-up page
 *
 *  everything should be in the middle
 * */

import { JSX } from 'react';

//login title
export function Title(): JSX.Element {
    return (
        <>
            <Title textColor="blue">Log-in</Title>
        </>
    );
}

//username block
function usernameBlock() {}

//password block
function passwordBlock() {}

//login button
function loginButton() {}

//button that will redirect to sign-in page
function sign_upBlock() {}

//href is link, _blank opens the tab in a new window
//two buttons: login (should redirect to mainpage), signup (should redirect to signuppage)
export default function log_inPage() {
    return (
        <main>
            <div className="login">
                <title>Login Page</title>

                <a href="mainPage" className="login-btn" target="_blank">
                    i'm a login button tøhø
                </a>

                <a href="signUpPage" className="signup-btn" target="_blank">
                    sign-up?
                </a>
            </div>
        </main>
    );
}
