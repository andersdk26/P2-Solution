'use client'; // enables client-side rendering in Next.js

import SignUpForm from 'components/signUp/SignUpForm'; // Importing the signup form component
import { useState } from 'react'; // Importing React state hook

export default function SignUpPage() {
    const [message, setMessage] = useState(''); // State to store feedback messages hvilket er error beskeder til users
    const [isError, setIsError] = useState(false); // State to track hvis message har en error

    // Function to handle form submission
    const handleSignUp = (formData: {
        username: string;
        email: string;
        password: string;
    }) => {
        // validation: sikkere at email contains "@" and password er 6 characters long
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

        // if validation passes
        setMessage('Signup successful!'); // Display success message
        setIsError(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Page titlens navn */}
            <h1 className="text-3xl font-bold mb-4">Sign Up to JamFest</h1>

            <SignUpForm onSignUp={handleSignUp} />

            {/* udskriver feedback message hvis der er en */}
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
