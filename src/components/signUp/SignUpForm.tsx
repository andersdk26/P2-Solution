import { useState } from 'react'; // Import Reacts useState for handling form data

//define si props for sii componentsss
interface SignUpFormProps {
    onSignUp: (formData: {
        name: string;
        email: string;
        password: string;
    }) => void;
}

// this is the SignUpForm componentssss
export default function SignUpForm({ onSignUp }: SignUpFormProps) {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        name: '', // Stores the name input
        email: '', // the email
        password: '', // passworrrrrrrs
        confirmPassword: '', // ect
        dob: '', // age
    });

    const [passwordError, setPasswordError] = useState(false); // Tracks if the passwords matche

    // this handles text input changes (like name, email, password, confirmPassword)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        // this checks for tje password field
        // so like if the user is typing in then confirm password field
        // check for a match
        if (e.target.name === 'confirmPassword') {
            setPasswordError(e.target.value !== formData.password); // hvis passwords ikke matcher, show error
        }
    };

    // handles form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevents page refresh on form submission

        // check if passwords matches before being able to signup/register/submit/mmmmmmm yea
        if (formData.password !== formData.confirmPassword) {
            setPasswordError(true); // show error if passwords do not match
            return;
        }

        onSignUp(formData); // Call the parent function to process the form data
    };

    const today = new Date().toISOString().split('T')[0]; // tager datoen som vi har ida altså dd-mm-åååå således at man ikke kan overskride den

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md w-80"
        >
            {/* Name Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange} // Updates the name state when the user types
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                />
            </div>

            {/* Email Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange} // opdater email state when the user types
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                />
            </div>

            {/* selecter age */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                </label>
                <input
                    type="date"
                    name="dob"
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
                <label className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange} // det her opdatere password state nor user inputs nye ting
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                />
            </div>

            {/* onfirm password input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange} // opdatere confirmPassword når user types
                    className={`mt-1 p-2 w-full border rounded-md ${
                        passwordError ? 'border-red-500' : '' // Lyserød border hvis passwords ikke matcher
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
        </form>
    );
}
