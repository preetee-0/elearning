import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/login`,
                {
                    email,
                    password
                }
            );

            localStorage.setItem("token", response.data.token);

            console.log(
                "TOKEN FROM LOGIN:",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            if (response.data.user.role === "instructor") {
                navigate("/instructor/dashboard");
            } else {
                navigate("/student/dashboard");
            }
        } catch (error) {
            console.log(
                "LOGIN ERROR:",
                error.response?.data
            );

            alert(
                error.response?.data?.message ||
                "Login failed"
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
                            Welcome Back!
                        </h1>

                        <p className="text-gray-300 text-lg leading-8">
                            Continue your learning journey and
                            explore new skills with our online
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
                                    Quality Courses
                                </h3>

                                <p className="text-sm text-gray-400">
                                    Learn from expert instructors
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center">
                                <i className="bi bi-clock text-[#06a7d9] text-xl"></i>
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    Learn Anytime
                                </h3>

                                <p className="text-sm text-gray-400">
                                    Study at your own pace
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center">
                                <i className="bi bi-award text-[#06a7d9] text-xl"></i>
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    Build Your Skills
                                </h3>

                                <p className="text-sm text-gray-400">
                                    Improve your professional skills
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Login Form */}
                <div className="p-8 sm:p-12 md:p-14">

                    <div className="text-center mb-8">

                        <div className="md:hidden w-14 h-14 mx-auto bg-[#06a7d9] rounded-xl flex items-center justify-center mb-5">
                            <i className="bi bi-mortarboard-fill text-white text-2xl"></i>
                        </div>

                        <h2 className="text-3xl font-bold text-[#181d38] mb-3">
                            Login
                        </h2>

                        <p className="text-gray-500">
                            Sign in to continue learning
                        </p>

                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="space-y-6"
                    >

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
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className="w-full border border-gray-200 rounded-lg py-3.5 pl-11 pr-4 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-[#06a7d9]/20"
                                />

                            </div>
                        </div>

                        {/* Login Button */}
                        <button
    type="button"
    onClick={() => {
        window.location.href =
            `${import.meta.env.VITE_API_URL}/users/google`;
    }}
    className="w-full border border-gray-200 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition"
>
    <i className="bi bi-google"></i>
    Continue with Google
</button>
<button
    type="button"
    onClick={() => {
        window.location.href =
            `${import.meta.env.VITE_API_URL}/users/github`;
    }}
    className="w-full bg-[#181d38] text-white py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-[#252b4b] transition"
>
    <i className="bi bi-github"></i>
    Continue with GitHub
</button>
<div className="flex items-center gap-4 my-6">
    <div className="flex-1 h-px bg-gray-200"></div>

    <span className="text-sm text-gray-400">
        OR
    </span>

    <div className="flex-1 h-px bg-gray-200"></div>
</div>
                        <button
                            type="submit"
                            className="w-full bg-[#06a7d9] hover:bg-[#058fba] text-white font-semibold py-3.5 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                        >
                            <i className="bi bi-box-arrow-in-right"></i>
                            Login
                        </button>

                    </form>

                    {/* Register */}
                    <div className="text-center mt-8 pt-6 border-t border-gray-100">

                        <p className="text-gray-500">
                            Don't have an account?
                            <button
                                onClick={() => navigate("/register")}
                                className="ml-2 text-[#06a7d9] font-semibold hover:underline"
                            >
                                Join Now
                            </button>
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;