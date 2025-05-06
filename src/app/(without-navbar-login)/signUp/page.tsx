'use client'; // enables client-side rendering in Next.js

import verifyUser from '@/actions/logIn/authenticateUser';
import { handleSignup as serverHandleSignup } from '@/actions/logIn/userLogin';
import SignUpForm from 'components/signUp/SignUpForm'; // Importing the signup form component
import useRedirect from '@/components/redirect';
import { JSX, useEffect, useState } from 'react'; // Importing React state hook

export default function SignUpPage(): JSX.Element {
    const redirect = useRedirect(); // Custom hook for redirection
    const [message, setMessage] = useState(''); // State to store feedback messages which are the error messages to users

    const [isError, setIsError] = useState(false); // State to track if the message has an error

    useEffect(() => {
        const checkLoginStatus = async (): Promise<void> => {
            if ((await verifyUser()) > 1) {
                // if the user has an id number higher than one
                redirect('coldStartSurvey'); // then redirect to cold start survey
            }
        };
        checkLoginStatus();
    }, []);

    // Function to handle form submission
    const handleSignUp = async (formData: {
        username: string;
        email: string;
        password: string;
        profileIcon: string;
    }): Promise<void> => {
        // validation: makes sure email contains "@" and password is 6 characters long
        if (!formData.email.includes('@')) {
            setMessage('Invalid email format!'); // Display error message
            setIsError(true);
            return;
        }
        if (formData.password.length < 6) {
            setMessage('Password must be at least 6 characters long!'); // Display error message
            setIsError(true);
            return;
        }

        const responseMessage = await serverHandleSignup(formData);

        // if validation passes
        setMessage(responseMessage); // Display success message

        if (responseMessage !== 'Signup successful') {
            setIsError(true);
            return;
        }
        // if everything is successful, then redirect
        redirect('coldStartSurvey');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Page to titles name */}
            <h1 className="text-3xl font-bold mb-4">Sign Up to JamFest</h1>

            <SignUpForm onSignUp={handleSignUp} />

            {/* prints feedback message if there is one */}
            {message && (
                <p
                    className={`mt-2 ${isError ? 'text-red-500' : 'text-green-500'}`}
                >
                    {message}
                </p>
            )}
        </div>
    );
}
