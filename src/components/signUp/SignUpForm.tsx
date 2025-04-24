import { JSX, useState } from 'react';
import badWord from '@/actions/logIn/badWord.json'; // Importing the bad word list

interface SignUpFormProps {
    onSignUp: (formData: {
        username: string;
        email: string;
        password: string;
        profileIcon: string; // Add profileIcon to the form data
    }) => void;
}

export default function SignUpForm({ onSignUp }: SignUpFormProps): JSX.Element {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
    });

    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState<string | null>(null); // State for username error

    // Function to check if the username contains any bad words
    const containsBadWord = (username: string): boolean => {
        const lowerCaseUsername = username.toLowerCase();
        return badWord.some((word) =>
            lowerCaseUsername.includes(word.toLowerCase())
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

        if (name === 'confirmPassword') {
            setPasswordError(value !== formData.password);
        }

        if (name === 'username') {
            // Check for bad words in the username
            if (containsBadWord(value)) {
                setUsernameError('Username contains inappropriate language.');
            } else {
                setUsernameError(null); // Clear the error if the username is valid
            }
        }
    };

    // List of predefined profile icons
    const icons = [
        '/img/profileSettingIcons/cornpop.png',
        '/img/profileSettingIcons/cuteButterPopcorn.png',
        '/img/profileSettingIcons/bucketCornPop.png',
        '/img/profileSettingIcons/cutePopcorn.png',
        '/img/profileSettingIcons/surpricedButterPopcorn.png',
        '/img/profileSettingIcons/derpPopcornBucket.png',
        '/img/profileSettingIcons/surpricedPopcorn.png',
        '/img/profileSettingIcons/happyButterPopcorn.png',
        '/img/profileSettingIcons/happyPopcornBucket.png',
        '/img/profileSettingIcons/happyPopcorn.png',
        '/img/profileSettingIcons/cutePopcornBucket.png',
        '/img/profileSettingIcons/swagMoviePopcornBucket.png',
    ];

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setPasswordError(true);
            return;
        }

        if (usernameError) {
            // Prevent submission if the username contains a bad word
            alert('Please choose a different username.');
            return;
        }

        // Randomly select a profile icon
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];

        // Include the selected profile icon in the form data
        onSignUp({ ...formData, profileIcon: randomIcon });
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-80"
        >
            {/* Name Input */}
            <div className="mb-4">
                <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                >
                    Username
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`mt-1 p-2 w-full border rounded-md ${
                        usernameError ? 'border-red-500' : ''
                    }`}
                    maxLength={15}
                    required
                />
                {usernameError && (
                    <p className="text-red-500 text-sm mt-1">{usernameError}</p>
                )}
            </div>

            {/* Email Input */}
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    title="Please enter a valid email address"
                    required
                />
            </div>

            {/* Date of Birth Input */}
            <div className="mb-4">
                <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700"
                >
                    Date of Birth
                </label>
                <input
                    type="date"
                    name="dob"
                    id="dob"
                    value={formData.dob || ''}
                    onChange={(e) =>
                        setFormData({ ...formData, dob: e.target.value })
                    }
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                    min="1900-01-01"
                    max={today}
                />
            </div>

            {/* Password Input */}
            <div className="mb-4">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                />
            </div>

            {/* Confirm Password Input */}
            <div className="mb-4">
                <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                >
                    Confirm Password
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`mt-1 p-2 w-full border rounded-md ${
                        passwordError ? 'border-red-500' : ''
                    }`}
                    required
                />
                {passwordError && (
                    <p className="text-red-500 text-sm mt-1">
                        Passwords do not match!
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
                Sign Up
            </button>
            <p className="mt-4 text-sm text-center text-gray-600">
                Do you already have an account?{' '}
                <a href="/logIn" className="text-blue-600 hover:underline">
                    Log In
                </a>
            </p>
        </form>
    );
}
