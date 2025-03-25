'use client';
import { JSX, useState } from 'react';
import { handleLogin, handleSignup } from '@/actions/log-in/userLogin';

//href is link, _blank opens the tab in a new window
//two buttons: login (should redirect to mainpage), signup (should redirect to signuppage)
export default function log_inPage() {
    const [loginResponse, setLoginResponse] = useState('');

    const validateInput = (formData: FormData) => {
        console.log(formData.get('username'));
        setLoginResponse('Nej');
        return true;
    };

    return (
        <form
            action={async (formData) => {
                // Validate input
                if (!validateInput(formData)) {
                    return;
                }

                const responseMessage = await handleLogin(formData);
                setLoginResponse(responseMessage);
            }}
        >
            <h1 className="text-center text-2xl mt-10">Login Page</h1>
            <p>{loginResponse}</p>
            <div
                //boks
                className="bg-blue-100 w-2/5 h-200px m-auto text-center mt-10"
            >
                <div
                    //loginboks
                    className="m-auto text-center content-center"
                >
                    <label id="usernameBoks" className="mt-10">
                        <a id="textClassName">username</a>
                        <br />
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                        />
                    </label>
                    <br />
                    <label id="passwordBoks">
                        <a id="textClassName">
                            password <br />
                        </a>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                        />
                    </label>
                </div>
                {/* with input nd type "submit" you submit what you have written in the boxes */}
                <input
                    id="loginBtn"
                    value="Login"
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                />
                <button
                    id="signupBtn"
                    value="signupValue"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    <a
                        href="https://github.com/andersdk26/P2-Solution/tree/feature/signUpPage"
                        target="_blank"
                    >
                        Sign-up
                    </a>
                </button>
            </div>
        </form>
    );
}
