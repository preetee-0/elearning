import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaBook,
    FaBars,
    FaTimes,
    FaChevronDown,
    FaUser
} from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [pagesOpen, setPagesOpen] = useState(false);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        setMenuOpen(false);
    };

    const closeMenu = () => {
        setMenuOpen(false);
        setPagesOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex items-center gap-2"
                >
                    <div className="flex h-10 w-10 items-center justify-center text-xl text-[#06a7d9]">
                        <FaBook />
                    </div>

                    <span className="text-xl font-extrabold tracking-tight text-[#06a7d9] sm:text-2xl">
                        E-Learning
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-7 lg:flex">

                    <Link
                        to="/"
                        className="font-medium text-gray-700 transition hover:text-[#06a7d9]"
                    >
                        Home
                    </Link>

                    <Link
                        to="/about"
                        className="font-medium text-gray-700 transition hover:text-[#06a7d9]"
                    >
                        About
                    </Link>

                    <Link
                        to="/courses"
                        className="font-medium text-gray-700 transition hover:text-[#06a7d9]"
                    >
                        Courses
                    </Link>

                    {/* Pages Dropdown */}
                    <div className="group relative">
                        <button className="flex items-center gap-1 font-medium text-gray-700 transition hover:text-[#06a7d9]">
                            Pages
                            <FaChevronDown className="text-xs" />
                        </button>

                        <div className="invisible absolute right-0 top-full mt-4 w-48 translate-y-2 bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

                            <Link
                                to="/teams"
                                className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#06a7d9]"
                            >
                                Our Team
                            </Link>

                            <Link
                                to="/testimonials"
                                className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#06a7d9]"
                            >
                                Testimonials
                            </Link>

                            <Link
                                to="/feedback"
                                className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#06a7d9]"
                            >
                                Feedback
                            </Link>

                            {token && user?.role === "student" && (
                                <Link
                                    to="/student/dashboard"
                                    className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#06a7d9]"
                                >
                                    Student Dashboard
                                </Link>
                            )}

                            {token && user?.role === "instructor" && (
                                <>
                                    <Link
                                        to="/instructor/dashboard"
                                        className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#06a7d9]"
                                    >
                                        Instructor Dashboard
                                    </Link>

                                    <Link
                                        to="/instructor/create-course"
                                        className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#06a7d9]"
                                    >
                                        Create Course
                                    </Link>
                                </>
                            )}

                        </div>
                    </div>

                    <Link
                        to="/contact"
                        className="font-medium text-gray-700 transition hover:text-[#06a7d9]"
                    >
                        Contact
                    </Link>

                </div>

                {/* Desktop Right Side */}
                <div className="hidden items-center gap-3 lg:flex">

                    {!token ? (
                        <>
                            <Link
                                to="/login"
                                className="font-medium text-gray-700 transition hover:text-[#06a7d9]"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-[#06a7d9] px-5 py-2.5 font-semibold text-white transition hover:bg-[#078eb7]"
                            >
                                Join Now
                            </Link>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f8fc] text-[#06a7d9]">
                                    <FaUser />
                                </div>

                                <span className="max-w-24 truncate text-sm font-medium text-gray-700">
                                    {user?.name}
                                </span>
                            </div>

                            {user?.role === "student" && (
                                <Link
                                    to="/student/dashboard"
                                    className="font-medium text-gray-700 transition hover:text-[#06a7d9]"
                                >
                                    Dashboard
                                </Link>
                            )}

                            {user?.role === "instructor" && (
                                <Link
                                    to="/instructor/dashboard"
                                    className="font-medium text-gray-700 transition hover:text-[#06a7d9]"
                                >
                                    Dashboard
                                </Link>
                            )}

                            <button
                                onClick={handleLogout}
                                className="bg-[#06a7d9] px-5 py-2.5 font-semibold text-white transition hover:bg-[#078eb7]"
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex h-10 w-10 items-center justify-center text-xl text-gray-700 lg:hidden"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="border-t bg-white shadow-md lg:hidden">
                    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">

                        <Link
                            to="/"
                            onClick={closeMenu}
                            className="block border-b py-3 font-medium text-gray-700 hover:text-[#06a7d9]"
                        >
                            Home
                        </Link>

                        <Link
                            to="/about"
                            onClick={closeMenu}
                            className="block border-b py-3 font-medium text-gray-700 hover:text-[#06a7d9]"
                        >
                            About
                        </Link>

                        <Link
                            to="/courses"
                            onClick={closeMenu}
                            className="block border-b py-3 font-medium text-gray-700 hover:text-[#06a7d9]"
                        >
                            Courses
                        </Link>

                        {/* Mobile Pages */}
                        <button
                            onClick={() => setPagesOpen(!pagesOpen)}
                            className="flex w-full items-center justify-between border-b py-3 font-medium text-gray-700 hover:text-[#06a7d9]"
                        >
                            Pages

                            <FaChevronDown
                                className={`text-xs transition-transform ${
                                    pagesOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {pagesOpen && (
                            <div className="bg-gray-50">

                                <Link
                                    to="/teams"
                                    onClick={closeMenu}
                                    className="block border-b px-4 py-3 text-sm text-gray-700 hover:text-[#06a7d9]"
                                >
                                    Our Team
                                </Link>

                                <Link
                                    to="/testimonials"
                                    onClick={closeMenu}
                                    className="block border-b px-4 py-3 text-sm text-gray-700 hover:text-[#06a7d9]"
                                >
                                    Testimonials
                                </Link>

                                <Link
                                    to="/feedback"
                                    onClick={closeMenu}
                                    className="block border-b px-4 py-3 text-sm text-gray-700 hover:text-[#06a7d9]"
                                >
                                    Feedback
                                </Link>

                                {token && user?.role === "student" && (
                                    <Link
                                        to="/student/dashboard"
                                        onClick={closeMenu}
                                        className="block border-b px-4 py-3 text-sm text-gray-700 hover:text-[#06a7d9]"
                                    >
                                        Student Dashboard
                                    </Link>
                                )}

                                {token && user?.role === "instructor" && (
                                    <>
                                        <Link
                                            to="/instructor/dashboard"
                                            onClick={closeMenu}
                                            className="block border-b px-4 py-3 text-sm text-gray-700 hover:text-[#06a7d9]"
                                        >
                                            Instructor Dashboard
                                        </Link>

                                        <Link
                                            to="/instructor/create-course"
                                            onClick={closeMenu}
                                            className="block px-4 py-3 text-sm text-gray-700 hover:text-[#06a7d9]"
                                        >
                                            Create Course
                                        </Link>
                                    </>
                                )}

                            </div>
                        )}

                        <Link
                            to="/contact"
                            onClick={closeMenu}
                            className="block border-b py-3 font-medium text-gray-700 hover:text-[#06a7d9]"
                        >
                            Contact
                        </Link>

                        {/* Mobile Login / Register */}
                        {!token ? (
                            <div className="flex gap-3 pt-4">

                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="flex-1 border border-[#06a7d9] px-4 py-2.5 text-center font-medium text-[#06a7d9]"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="flex-1 bg-[#06a7d9] px-4 py-2.5 text-center font-semibold text-white"
                                >
                                    Join Now
                                </Link>

                            </div>
                        ) : (
                            <div className="pt-4">

                                <div className="mb-3 flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f8fc] text-[#06a7d9]">
                                        <FaUser />
                                    </div>

                                    <span className="font-medium text-gray-700">
                                        {user?.name}
                                    </span>
                                </div>

                                {user?.role === "student" && (
                                    <Link
                                        to="/student/dashboard"
                                        onClick={closeMenu}
                                        className="mb-2 block border border-[#06a7d9] px-4 py-2.5 text-center font-medium text-[#06a7d9]"
                                    >
                                        Dashboard
                                    </Link>
                                )}

                                {user?.role === "instructor" && (
                                    <Link
                                        to="/instructor/dashboard"
                                        onClick={closeMenu}
                                        className="mb-2 block border border-[#06a7d9] px-4 py-2.5 text-center font-medium text-[#06a7d9]"
                                    >
                                        Dashboard
                                    </Link>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-[#06a7d9] px-4 py-2.5 font-semibold text-white hover:bg-[#078eb7]"
                                >
                                    Logout
                                </button>

                            </div>
                        )}

                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;