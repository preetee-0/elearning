import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getCourseById,
    getMyEnrollments,
    enrollCourse
} from "../services/CourseService";

import {
    getSectionsByCourse,
    getLessonsBySection
} from "../services/Contentservice";

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [enrolled, setEnrolled] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const courseData =
                    await getCourseById(id);

                setCourse(courseData.course);

                const sectionData =
                    await getSectionsByCourse(id);

                const sectionsWithLessons =
                    await Promise.all(
                        (sectionData.sections || []).map(
                            async (section) => {
                                const lessonData =
                                    await getLessonsBySection(
                                        section._id
                                    );

                                return {
                                    ...section,
                                    lessons:
                                        lessonData.lessons || []
                                };
                            }
                        )
                    );

                setSections(sectionsWithLessons);

                if (token) {
                    const enrollmentData =
                        await getMyEnrollments(token);

                    const alreadyEnrolled =
                        (enrollmentData.enrollments || []).some(
                            (enrollment) =>
                                enrollment.course &&
                                enrollment.course._id === id
                        );

                    setEnrolled(alreadyEnrolled);
                }
            } catch (error) {
                console.log(
                    error.response?.data ||
                    error.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, token]);

    const handleEnroll = async () => {
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const data = await enrollCourse(
                id,
                token
            );

            alert(data.message);
            setEnrolled(true);
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to enroll"
            );
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#06a7d9]"></div>

                    <p className="text-gray-500">
                        Loading course...
                    </p>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <i className="bi bi-book text-6xl text-gray-300"></i>

                    <h2 className="mt-4 text-2xl font-bold text-gray-700">
                        Course not found
                    </h2>

                    <button
                        onClick={() =>
                            navigate("/courses")
                        }
                        className="mt-6 rounded-md bg-[#06a7d9] px-6 py-3 font-medium text-white"
                    >
                        Back to Courses
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Page Header */}
            <section className="bg-[#181d38] px-4 py-16 sm:px-6 lg:px-10">
                <div className="mx-auto max-w-7xl">

                    <div className="mb-5 flex items-center gap-3 text-sm">
                        <button
                            onClick={() =>
                                navigate("/")
                            }
                            className="text-[#06a7d9] hover:text-white"
                        >
                            Home
                        </button>

                        <span className="text-gray-500">
                            /
                        </span>

                        <button
                            onClick={() =>
                                navigate("/courses")
                            }
                            className="text-[#06a7d9] hover:text-white"
                        >
                            Courses
                        </button>

                        <span className="text-gray-500">
                            /
                        </span>

                        <span className="truncate text-gray-300">
                            {course.title}
                        </span>
                    </div>

                    <div className="max-w-4xl">

                        <div className="mb-5 flex flex-wrap gap-3">

                            <span className="bg-[#06a7d9] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
                                {course.category ||
                                    "Course"}
                            </span>

                            <span className="bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-200">
                                {course.level}
                            </span>

                        </div>

                        <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl">
                            {course.title}
                        </h1>

                        <p className="mt-5 max-w-3xl text-base leading-7 text-gray-300">
                            {course.description}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-300">

                            <span>
                                <i className="bi bi-star-fill mr-2 text-yellow-400"></i>
                                <strong className="text-white">
                                    {course.averageRating ||
                                        0}
                                </strong>{" "}
                                ({course.reviewCount || 0}{" "}
                                reviews)
                            </span>

                            <span>
                                <i className="bi bi-clock mr-2 text-[#06a7d9]"></i>
                                {course.duration ||
                                    "Self paced"}
                            </span>

                            <span>
                                <i className="bi bi-bar-chart mr-2 text-[#06a7d9]"></i>
                                <span className="capitalize">
                                    {course.level}
                                </span>
                            </span>

                        </div>

                    </div>

                </div>
            </section>

            {/* Main Content */}
            <section className="px-4 py-16 sm:px-6 lg:px-10">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">

                    {/* Left Content */}
                    <div className="lg:col-span-2">

                        {/* Course Image */}
                        <div className="overflow-hidden bg-white shadow-md">

                            <div className="h-64 sm:h-96">

                                {course.thumbnail ? (
                                    <img
                                        src={
                                            course.thumbnail
                                        }
                                        alt={
                                            course.title
                                        }
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center bg-gray-100">
                                        <i className="bi bi-book text-7xl text-gray-300"></i>
                                    </div>
                                )}

                            </div>

                        </div>

                        {/* About Course */}
                        <div className="mt-8 bg-white p-6 shadow-sm sm:p-8">

                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#06a7d9]">
                                About This Course
                            </p>

                            <h2 className="mb-5 text-2xl font-bold text-[#181d38]">
                                Course Description
                            </h2>

                            <p className="leading-8 text-gray-600">
                                {course.description}
                            </p>

                        </div>

                        {/* Course Content */}
                        <div className="mt-8 bg-white p-6 shadow-sm sm:p-8">

                            <div className="mb-7">

                                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#06a7d9]">
                                    Learning Material
                                </p>

                                <h2 className="text-2xl font-bold text-[#181d38]">
                                    Course Content
                                </h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    {sections.length} sections
                                </p>

                            </div>

                            {sections.length === 0 ? (
                                <div className="rounded-md bg-gray-50 p-8 text-center">

                                    <i className="bi bi-journal-x text-4xl text-gray-300"></i>

                                    <p className="mt-3 text-gray-500">
                                        No course content
                                        available yet.
                                    </p>

                                </div>
                            ) : (
                                <div className="space-y-4">

                                    {sections.map(
                                        (
                                            section,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    section._id
                                                }
                                                className="overflow-hidden border border-gray-200"
                                            >

                                                {/* Section Header */}
                                                <div className="flex items-center justify-between bg-gray-50 px-5 py-5">

                                                    <div className="flex items-center gap-4">

                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#06a7d9] text-sm font-bold text-white">
                                                            {index +
                                                                1}
                                                        </div>

                                                        <div>
                                                            <h3 className="font-bold text-[#181d38]">
                                                                {
                                                                    section.title
                                                                }
                                                            </h3>

                                                            <p className="mt-1 text-xs text-gray-500">
                                                                {
                                                                    section.lessons?.length ||
                                                                    0
                                                                }{" "}
                                                                lessons
                                                            </p>
                                                        </div>

                                                    </div>

                                                </div>

                                                {/* Lessons */}
                                                <div className="divide-y divide-gray-100">

                                                    {section
                                                        .lessons
                                                        ?.length >
                                                    0 ? (
                                                        section.lessons.map(
                                                            (
                                                                lesson,
                                                                lessonIndex
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        lesson._id
                                                                    }
                                                                    className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-gray-50"
                                                                >

                                                                    <div className="flex min-w-0 items-center gap-4">

                                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm text-gray-500">
                                                                            {lessonIndex +
                                                                                1}
                                                                        </div>

                                                                        <div className="min-w-0">

                                                                            <p className="truncate text-sm font-medium text-gray-700">
                                                                                {
                                                                                    lesson.title
                                                                                }
                                                                            </p>

                                                                            <div className="mt-1 flex items-center gap-3">

                                                                                {lesson.duration && (
                                                                                    <span className="text-xs text-gray-400">
                                                                                        <i className="bi bi-clock mr-1"></i>
                                                                                        {
                                                                                            lesson.duration
                                                                                        }
                                                                                    </span>
                                                                                )}

                                                                                {lesson.isFree && (
                                                                                    <span className="text-xs font-medium text-green-600">
                                                                                        Free Preview
                                                                                    </span>
                                                                                )}

                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                    {lesson.isFree ||
                                                                    enrolled ? (
                                                                        <button
                                                                            onClick={() =>
                                                                                navigate(
                                                                                    `/courses/${id}/learn?lesson=${lesson._id}`
                                                                                )
                                                                            }
                                                                            className="shrink-0 rounded-md bg-[#06a7d9] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#058db8] sm:px-4"
                                                                        >
                                                                            <i className="bi bi-play-fill mr-1"></i>

                                                                            <span className="hidden sm:inline">
                                                                                {lesson.isFree
                                                                                    ? "Watch Preview"
                                                                                    : "Watch Lesson"}
                                                                            </span>

                                                                            <span className="sm:hidden">
                                                                                Watch
                                                                            </span>
                                                                        </button>
                                                                    ) : (
                                                                        <span className="shrink-0 text-gray-400">
                                                                            <i className="bi bi-lock-fill text-lg"></i>
                                                                        </span>
                                                                    )}

                                                                </div>
                                                            )
                                                        )
                                                    ) : (
                                                        <p className="px-5 py-5 text-sm text-gray-500">
                                                            No lessons in
                                                            this section.
                                                        </p>
                                                    )}

                                                </div>

                                            </div>
                                        )
                                    )}

                                </div>
                            )}

                        </div>

                    </div>

                    {/* Right Sidebar */}
                    <div>

                        <div className="sticky top-24 bg-white shadow-lg">

                            {/* Price */}
                            <div className="border-b border-gray-100 p-6">

                                <p className="mb-2 text-sm text-gray-500">
                                    Course Price
                                </p>

                                <div className="flex items-center justify-between">

                                    <h2 className="text-3xl font-bold text-[#181d38]">
                                        {course.price ===
                                        0
                                            ? "Free"
                                            : `Rs. ${course.price}`}
                                    </h2>

                                    {course.price ===
                                        0 && (
                                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                                            FREE
                                        </span>
                                    )}

                                </div>

                            </div>

                            {/* Enrollment Button */}
                            <div className="p-6">

                                {enrolled ? (
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/courses/${id}/learn`
                                            )
                                        }
                                        className="w-full bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700"
                                    >
                                        <i className="bi bi-play-circle-fill mr-2"></i>
                                        Continue Learning
                                    </button>
                                ) : (
                                    <button
                                        onClick={
                                            handleEnroll
                                        }
                                        className="w-full bg-[#06a7d9] px-6 py-4 font-semibold text-white transition hover:bg-[#058db8]"
                                    >
                                        <i className="bi bi-mortarboard-fill mr-2"></i>
                                        Enroll Now
                                    </button>
                                )}

                                <p className="mt-4 text-center text-xs text-gray-400">
                                    Start learning at your
                                    own pace
                                </p>

                            </div>

                            {/* Course Features */}
                            <div className="border-t border-gray-100 p-6">

                                <h3 className="mb-5 font-bold text-[#181d38]">
                                    This Course Includes
                                </h3>

                                <div className="space-y-4">

                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <i className="bi bi-play-circle text-lg text-[#06a7d9]"></i>
                                        Video lessons
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <i className="bi bi-clock text-lg text-[#06a7d9]"></i>
                                        {course.duration ||
                                            "Self-paced learning"}
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <i className="bi bi-bar-chart text-lg text-[#06a7d9]"></i>
                                        {course.level} level
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <i className="bi bi-award text-lg text-[#06a7d9]"></i>
                                        Certificate of completion
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <i className="bi bi-infinity text-lg text-[#06a7d9]"></i>
                                        Learn at your own pace
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-[#181d38] px-4 py-16 sm:px-6 lg:px-10">
                <div className="mx-auto max-w-4xl text-center">

                    <i className="bi bi-mortarboard-fill text-4xl text-[#06a7d9]"></i>

                    <h2 className="mt-4 text-3xl font-bold text-white">
                        Ready to Start Learning?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                        Join this course and start building
                        valuable skills today.
                    </p>

                    <button
                        onClick={() => {
                            if (enrolled) {
                                navigate(
                                    `/courses/${id}/learn`
                                );
                            } else {
                                handleEnroll();
                            }
                        }}
                        className="mt-7 bg-[#06a7d9] px-8 py-3 font-semibold text-white transition hover:bg-[#058db8]"
                    >
                        {enrolled
                            ? "Continue Learning"
                            : "Enroll Now"}
                    </button>

                </div>
            </section>

        </div>
    );
};

export default CourseDetails;