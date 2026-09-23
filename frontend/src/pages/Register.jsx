import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/register`,
                {
                    name,
                    email,
                    password,
                    role: "student"
                }
            );

            console.log(response.data);

            alert("Registration successful");

            navigate("/login");
        } catch (error) {
            console.log(
                error.response?.data || error.message
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 py-16">

            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

                {/* Left Side */}
                <div className="hidden md:flex bg-[#181d38] text-white p-12 flex-col justify-center">

                    <div className="mb-8">

                        <div className="w-16 h-16 bg-[#06a7d9] rounded-xl flex items-center justify-center mb-6">
                            <i className="bi bi-mortarboard-fill text-3xl"></i>
                        </div>

                        <h1 className="text-4xl font-bold leading-tight mb-5">
                            Start Learning Today!
                        </h1>

                        <p className="text-gray-300 text-lg leading-8">
                            Create your account and start
                            learning new skills with our online
                            courses.
                        </p>

                    </div>

                    <div className="space-y-5 mt-4">

                        <div className="flex items-center gap-4">

                            <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center">
                                <i className="bi bi-book text-[#06a7d9] text-xl"></i>
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    Learn New Skills
                                </h3>

                                <p className="text-sm text-gray-400">
                                    Explore courses from different fields
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-4">

                            <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center">
                                <i className="bi bi-person-video3 text-[#06a7d9] text-xl"></i>
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    Expert Instructors
                                </h3>

                                <p className="text-sm text-gray-400">
                                    Learn from experienced instructors
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-4">

                            <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center">
                                <i className="bi bi-award text-[#06a7d9] text-xl"></i>
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    Grow Your Career
                                </h3>

                                <p className="text-sm text-gray-400">
                                    Build skills for your future
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Register Form */}
                <div className="p-8 sm:p-12 md:p-14">

                    <div className="text-center mb-8">

                        <div className="md:hidden w-14 h-14 mx-auto bg-[#06a7d9] rounded-xl flex items-center justify-center mb-5">
                            <i className="bi bi-mortarboard-fill text-white text-2xl"></i>
                        </div>

                        <h2 className="text-3xl font-bold text-[#181d38] mb-3">
                            Create Account
                        </h2>

                        <p className="text-gray-500">
                            Join our learning community today
                        </p>

                    </div>

                    <form
                        onSubmit={handleRegister}
                        className="space-y-6"
                    >

                        {/* Name */}
                        <div>

                            <label className="block text-sm font-semibold text-[#181d38] mb-2">
                                Full Name
                            </label>

                            <div className="relative">

                                <i className="bi bi-person absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    required
                                    className="w-full border border-gray-200 rounded-lg py-3.5 pl-11 pr-4 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-[#06a7d9]/20"
                                />

                            </div>

                        </div>

                        {/* Email */}
                        <div>

                            <label className="block text-sm font-semibold text-[#181d38] mb-2">
                                Email Address
                            </label>

                            <div className="relative">

                                <i className="bi bi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                    className="w-full border border-gray-200 rounded-lg py-3.5 pl-11 pr-4 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-[#06a7d9]/20"
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div>

                            <label className="block text-sm font-semibold text-[#181d38] mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <i className="bi bi-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                                <input
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className="w-full border border-gray-200 rounded-lg py-3.5 pl-11 pr-4 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-[#06a7d9]/20"
                                />

                            </div>

                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#06a7d9] hover:bg-[#058fba] text-white font-semibold py-3.5 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                        >
                            <i className="bi bi-person-plus"></i>
                            Create Account
                        </button>

                    </form>

                    {/* Login */}
                    <div className="text-center mt-8 pt-6 border-t border-gray-100">

                        <p className="text-gray-500">
                            Already have an account?

                            <button
                                onClick={() => navigate("/login")}
                                className="ml-2 text-[#06a7d9] font-semibold hover:underline"
                            >
                                Login
                            </button>
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Register;