import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentDashboard } from "../services/StudentService";

const StudentDashboard = () => {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data =
                    await getStudentDashboard(token);

                setDashboard(data.dashboard);
            } catch (error) {
                console.log(
                    error.response?.data ||
                        error.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [token]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#06a7d9]"></div>

                    <p className="text-gray-500">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }

    if (!dashboard) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">

                    <i className="bi bi-exclamation-circle text-5xl text-red-400"></i>

                    <h2 className="mt-4 text-xl font-bold text-gray-700">
                        Failed to load dashboard
                    </h2>

                    <button
                        onClick={() =>
                            window.location.reload()
                        }
                        className="mt-5 bg-[#06a7d9] px-6 py-3 font-medium text-white hover:bg-[#058db8]"
                    >
                        Try Again
                    </button>

                </div>
            </div>
        );
    }

    const validCourses =
        (dashboard.courses || []).filter(
            (item) => item.course
        );

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <section className="bg-[#181d38] px-4 py-14 sm:px-6 lg:px-10">
                <div className="mx-auto max-w-7xl">

                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                        <div>

                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#06a7d9]">
                                Learning Dashboard
                            </p>

                            <h1 className="text-3xl font-bold text-white sm:text-4xl">
                                Student Dashboard
                            </h1>

                            <p className="mt-3 max-w-xl text-gray-400">
                                Track your courses, monitor your
                                progress, and continue your
                                learning journey.
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                navigate("/courses")
                            }
                            className="w-fit bg-[#06a7d9] px-6 py-3 font-semibold text-white transition hover:bg-[#058db8]"
                        >
                            <i className="bi bi-search mr-2"></i>
                            Explore Courses
                        </button>

                    </div>

                </div>
            </section>

            {/* Statistics */}
            <section className="px-4 py-10 sm:px-6 lg:px-10">
                <div className="mx-auto max-w-7xl">

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        {/* Total */}
                        <div className="group bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Total Courses
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-[#181d38]">
                                        {
                                            dashboard.totalCourses
                                        }
                                    </h2>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#06a7d9]/10">
                                    <i className="bi bi-book text-xl text-[#06a7d9]"></i>
                                </div>

                            </div>

                        </div>

                        {/* Learning */}
                        <div className="group bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Learning
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-[#181d38]">
                                        {
                                            dashboard.learningCourses
                                        }
                                    </h2>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                                    <i className="bi bi-play-circle text-xl text-blue-500"></i>
                                </div>

                            </div>

                        </div>

                        {/* Completed */}
                        <div className="group bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Completed
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-[#181d38]">
                                        {
                                            dashboard.completedCourses
                                        }
                                    </h2>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
                                    <i className="bi bi-check-circle text-xl text-green-600"></i>
                                </div>

                            </div>

                        </div>

                        {/* Overall Progress */}
                        <div className="group bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Overall Progress
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold text-[#181d38]">
                                        {
                                            dashboard.overallProgress
                                        }
                                        %
                                    </h2>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50">
                                    <i className="bi bi-graph-up-arrow text-xl text-purple-500"></i>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* My Courses */}
            <section className="px-4 pb-16 sm:px-6 lg:px-10">
                <div className="mx-auto max-w-7xl">

                    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#06a7d9]">
                                My Learning
                            </p>

                            <h2 className="text-3xl font-bold text-[#181d38]">
                                My Courses
                            </h2>

                        </div>

                        <button
                            onClick={() =>
                                navigate("/courses")
                            }
                            className="w-fit text-sm font-semibold text-[#06a7d9] hover:text-[#058db8]"
                        >
                            Browse All Courses
                            <i className="bi bi-arrow-right ml-2"></i>
                        </button>

                    </div>

                    {validCourses.length === 0 ? (
                        <div className="bg-white px-6 py-16 text-center shadow-sm">

                            <i className="bi bi-journal-bookmark text-6xl text-gray-300"></i>

                            <h3 className="mt-5 text-2xl font-bold text-[#181d38]">
                                No Courses Yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-gray-500">
                                You haven't enrolled in any
                                courses yet. Explore our courses
                                and start learning today.
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/courses")
                                }
                                className="mt-6 bg-[#06a7d9] px-7 py-3 font-semibold text-white hover:bg-[#058db8]"
                            >
                                Explore Courses
                            </button>

                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

                            {validCourses.map(
                                (item) => {

                                    const progress =
                                        item.progress ||
                                        0;

                                    const completedLessons =
                                        item.completedLessons ||
                                        0;

                                    return (
                                        <div
                                            key={
                                                item.enrollmentId
                                            }
                                            className="group overflow-hidden bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                        >

                                            {/* Thumbnail */}
                                            <div className="relative h-52 overflow-hidden bg-gray-100">

                                                {item.course
                                                    .thumbnail ? (
                                                    <img
                                                        src={
                                                            item
                                                                .course
                                                                .thumbnail
                                                        }
                                                        alt={
                                                            item
                                                                .course
                                                                .title
                                                        }
                                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center">
                                                        <i className="bi bi-book text-6xl text-gray-300"></i>
                                                    </div>
                                                )}

                                                {/* Category */}
                                                <span className="absolute left-4 top-4 bg-[#06a7d9] px-4 py-2 text-xs font-semibold uppercase text-white">
                                                    {
                                                        item
                                                            .course
                                                            .category
                                                    }
                                                </span>

                                                {/* Completed */}
                                                {item.completed && (
                                                    <span className="absolute right-4 top-4 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                                                        <i className="bi bi-check-circle mr-1"></i>
                                                        Completed
                                                    </span>
                                                )}

                                            </div>

                                            {/* Content */}
                                            <div className="p-6">

                                                <div className="mb-3 flex items-center justify-between">

                                                    <span className="text-xs font-medium uppercase text-gray-400">
                                                        {
                                                            item
                                                                .course
                                                                .level
                                                        }
                                                    </span>

                                                    <span className="text-xs text-gray-400">
                                                        {
                                                            item
                                                                .course
                                                                .duration ||
                                                            "Self-paced"
                                                        }
                                                    </span>

                                                </div>

                                                <h3
                                                    onClick={() =>
                                                        navigate(
                                                            `/courses/${item.course._id}`
                                                        )
                                                    }
                                                    className="cursor-pointer text-xl font-bold leading-snug text-[#181d38] transition hover:text-[#06a7d9]"
                                                >
                                                    {
                                                        item
                                                            .course
                                                            .title
                                                    }
                                                </h3>

                                                {/* Progress */}
                                                <div className="mt-6">

                                                    <div className="mb-2 flex items-center justify-between">

                                                        <span className="text-sm font-medium text-gray-500">
                                                            Course Progress
                                                        </span>

                                                        <span className="text-sm font-bold text-[#06a7d9]">
                                                            {
                                                                progress
                                                            }
                                                            %
                                                        </span>

                                                    </div>

                                                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">

                                                        <div
                                                            className={`h-full rounded-full transition-all duration-500 ${
                                                                progress ===
                                                                100
                                                                    ? "bg-green-600"
                                                                    : "bg-[#06a7d9]"
                                                            }`}
                                                            style={{
                                                                width: `${progress}%`
                                                            }}
                                                        ></div>

                                                    </div>

                                                </div>

                                                {/* Lessons */}
                                                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">

                                                    <i className="bi bi-check2-circle text-[#06a7d9]"></i>

                                                    <span>
                                                        {
                                                            completedLessons
                                                        }{" "}
                                                        lessons
                                                        completed
                                                    </span>

                                                </div>

                                                {/* Button */}
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/courses/${item.course._id}/learn`
                                                        )
                                                    }
                                                    className={`mt-6 w-full px-5 py-3 font-semibold text-white transition ${
                                                        item.completed
                                                            ? "bg-green-600 hover:bg-green-700"
                                                            : "bg-[#06a7d9] hover:bg-[#058db8]"
                                                    }`}
                                                >
                                                    <i
                                                        className={`mr-2 bi ${
                                                            item.completed
                                                                ? "bi-check-circle"
                                                                : "bi-play-circle"
                                                        }`}
                                                    ></i>

                                                    {item.completed
                                                        ? "Review Course"
                                                        : "Continue Learning"}
                                                </button>

                                            </div>

                                        </div>
                                    );
                                }
                            )}

                        </div>
                    )}

                </div>
            </section>

            {/* Progress CTA */}
            {validCourses.length > 0 && (
                <section className="bg-[#06a7d9] px-4 py-14 sm:px-6 lg:px-10">
                    <div className="mx-auto max-w-4xl text-center">

                        <i className="bi bi-mortarboard-fill text-4xl text-white"></i>

                        <h2 className="mt-4 text-3xl font-bold text-white">
                            Keep Learning, Keep Growing
                        </h2>

                        <p className="mx-auto mt-3 max-w-2xl text-white/90">
                            Continue your courses and make
                            progress toward completing your
                            learning goals.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/courses")
                            }
                            className="mt-6 bg-white px-7 py-3 font-semibold text-[#181d38] transition hover:bg-gray-100"
                        >
                            Explore More Courses
                        </button>

                    </div>
                </section>
            )}

        </div>
    );
};

export default StudentDashboard;