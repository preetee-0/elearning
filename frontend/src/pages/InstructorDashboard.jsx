import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InstructorDashboard = () => {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const handleDeleteCourse = async (courseId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/courses/${courseId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCourses(
                courses.filter(
                    (course) => course._id !== courseId
                )
            );

            alert("Course deleted successfully");
        } catch (error) {
            console.log(
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                    "Failed to delete course"
            );
        }
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/courses/my`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setCourses(response.data.courses || []);
            } catch (error) {
                console.log(
                    error.response?.data || error.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [token]);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero */}
            <section className="bg-[#181d38] py-16">
                <div className="mx-auto max-w-7xl px-4">

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                        <div>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#06a7d9]">
                                Instructor Panel
                            </p>

                            <h1 className="text-4xl font-bold text-white md:text-5xl">
                                Instructor Dashboard
                            </h1>

                            <p className="mt-4 max-w-2xl text-gray-300">
                                Create, manage and share your courses
                                with students around the world.
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                navigate(
                                    "/instructor/create-course"
                                )
                            }
                            className="w-fit rounded-md bg-[#06a7d9] px-6 py-3 font-semibold text-white transition hover:bg-[#058fb9]"
                        >
                            <i className="bi bi-plus-lg mr-2"></i>
                            Create Course
                        </button>

                    </div>

                </div>
            </section>

            {/* Dashboard Content */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4">

                    {/* Stats */}
                    <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">

                        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center justify-between">

                                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-cyan-50">
                                    <i className="bi bi-book text-2xl text-[#06a7d9]"></i>
                                </div>

                                <i className="bi bi-three-dots text-gray-300"></i>

                            </div>

                            <p className="text-sm text-gray-500">
                                Total Courses
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-[#181d38]">
                                {courses.length}
                            </h2>
                        </div>

                        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center justify-between">

                                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-green-50">
                                    <i className="bi bi-check-circle text-2xl text-green-500"></i>
                                </div>

                                <i className="bi bi-three-dots text-gray-300"></i>

                            </div>

                            <p className="text-sm text-gray-500">
                                Published Courses
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-[#181d38]">
                                {courses.length}
                            </h2>
                        </div>

                        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center justify-between">

                                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-50">
                                    <i className="bi bi-people text-2xl text-blue-500"></i>
                                </div>

                                <i className="bi bi-three-dots text-gray-300"></i>

                            </div>

                            <p className="text-sm text-gray-500">
                                Students
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-[#181d38]">
                                0
                            </h2>
                        </div>

                    </div>

                    {/* Course Section */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="mb-1 text-sm font-semibold text-[#06a7d9]">
                                Your Content
                            </p>

                            <h2 className="text-3xl font-bold text-[#181d38]">
                                My Courses
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Courses created and managed by you.
                            </p>
                        </div>

                        {courses.length > 0 && (
                            <button
                                onClick={() =>
                                    navigate(
                                        "/instructor/create-course"
                                    )
                                }
                                className="w-fit font-semibold text-[#06a7d9] hover:underline"
                            >
                                Add New Course
                                <i className="bi bi-arrow-right ml-2"></i>
                            </button>
                        )}

                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="rounded-lg bg-white p-12 text-center shadow-sm">

                            <i className="bi bi-arrow-repeat text-4xl text-[#06a7d9]"></i>

                            <p className="mt-4 text-gray-500">
                                Loading courses...
                            </p>

                        </div>
                    )}

                    {/* Empty */}
                    {!loading && courses.length === 0 && (
                        <div className="rounded-lg bg-white p-12 text-center shadow-sm">

                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-50">
                                <i className="bi bi-journal-plus text-3xl text-[#06a7d9]"></i>
                            </div>

                            <h3 className="mt-6 text-2xl font-bold text-[#181d38]">
                                No Courses Yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-gray-500">
                                You have not created any courses yet.
                                Start creating your first course and
                                share your knowledge with students.
                            </p>

                            <button
                                onClick={() =>
                                    navigate(
                                        "/instructor/create-course"
                                    )
                                }
                                className="mt-6 rounded-md bg-[#06a7d9] px-6 py-3 font-semibold text-white transition hover:bg-[#058fb9]"
                            >
                                <i className="bi bi-plus-lg mr-2"></i>
                                Create Your First Course
                            </button>

                        </div>
                    )}

                    {/* Courses */}
                    {!loading && courses.length > 0 && (
                        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

                            {courses.map((course) => (
                                <div
                                    key={course._id}
                                    className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >

                                    {/* Thumbnail */}
                                    <div className="relative h-48 overflow-hidden bg-gray-100">

                                        {course.thumbnail ? (
                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center">
                                                <i className="bi bi-image text-4xl text-gray-300"></i>
                                            </div>
                                        )}

                                        <span className="absolute left-4 top-4 rounded bg-[#06a7d9] px-3 py-1 text-xs font-semibold text-white">
                                            {course.category}
                                        </span>

                                    </div>

                                    {/* Course Content */}
                                    <div className="p-5">

                                        <div className="mb-3 flex items-center gap-4 text-sm text-gray-500">

                                            <span>
                                                <i className="bi bi-bar-chart mr-1"></i>
                                                {course.level}
                                            </span>

                                            <span>
                                                <i className="bi bi-clock mr-1"></i>
                                                {course.duration ||
                                                    "Self-paced"}
                                            </span>

                                        </div>

                                        <h3 className="line-clamp-2 text-xl font-bold text-[#181d38]">
                                            {course.title}
                                        </h3>

                                        <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-6 text-gray-500">
                                            {course.description}
                                        </p>

                                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

                                            <span className="font-bold text-[#06a7d9]">
                                                {course.price === 0
                                                    ? "Free"
                                                    : `Rs. ${course.price}`}
                                            </span>

                                            <span className="text-xs font-medium text-green-500">
                                                <i className="bi bi-check-circle mr-1"></i>
                                                Published
                                            </span>

                                        </div>

                                        {/* Buttons */}
                                        <div className="mt-5 flex gap-2">

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/courses/${course._id}`
                                                    )
                                                }
                                                className="flex h-10 flex-1 items-center justify-center rounded-md bg-[#181d38] text-sm font-semibold text-white transition hover:bg-[#252b4d]"
                                            >
                                                <i className="bi bi-eye mr-2"></i>
                                                View
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/instructor/edit-course/${course._id}`
                                                    )
                                                }
                                                className="flex h-10 w-10 items-center justify-center rounded-md border border-[#06a7d9] text-[#06a7d9] transition hover:bg-cyan-50"
                                                title="Edit Course"
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDeleteCourse(
                                                        course._id
                                                    )
                                                }
                                                className="flex h-10 w-10 items-center justify-center rounded-md border border-red-500 text-red-500 transition hover:bg-red-50"
                                                title="Delete Course"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-[#181d38] py-16">
                <div className="mx-auto max-w-4xl px-4 text-center">

                    <i className="bi bi-mortarboard text-5xl text-[#06a7d9]"></i>

                    <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">
                        Share Your Knowledge
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-300">
                        Create engaging courses and help students
                        learn valuable skills from anywhere.
                    </p>

                    <button
                        onClick={() =>
                            navigate(
                                "/instructor/create-course"
                            )
                        }
                        className="mt-7 rounded-md bg-[#06a7d9] px-7 py-3 font-semibold text-white transition hover:bg-[#058fb9]"
                    >
                        <i className="bi bi-plus-lg mr-2"></i>
                        Create New Course
                    </button>

                </div>
            </section>

        </div>
    );
};

export default InstructorDashboard;