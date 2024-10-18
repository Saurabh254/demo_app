import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login_driver, login_user } from "../../utils/api";
import { ACCESS_TOKEN_STORAGE_KEY } from "../../config";

const LoginPage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('user'); // State to track selected role

    const handleForm = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const phone = e.target.phone.value; // Get the phone number from the input
        const otp = e.target.otp.value; // Get the OTP from the input

        try {

            // Navigate based on the selected role
            if (role === 'user') {
                const response_data = await login_user(phone, otp);
                navigate('/user/homepage');
                localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, response_data.accessToken);
            } else if (role === 'driver') {
                navigate('/driver/homepage');
                const response_data = await login_driver(phone, otp);
                localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, response_data.accessToken);
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleForm} className="space-y-6">
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone Number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    autoComplete="tel"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900">
                                OTP
                            </label>
                            <div className="mt-2">
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    required
                                    autoComplete="one-time-code"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                                Select Role
                            </label>
                            <div className="mt-2">
                                <select
                                    id="role"
                                    name="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option value="user">User</option>
                                    <option value="driver">Driver</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            SignUp
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
