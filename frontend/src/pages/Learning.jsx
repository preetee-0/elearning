import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { getCourseById } from "../services/CourseService";

import {
    getSectionsByCourse,
    getLessonsBySection
} from "../services/Contentservice";

import {
    completeLesson,
    getCourseProgress
} from "../services/ProgressService";

const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";

    if (url.includes("/embed/")) {
        return url;
    }

    if (url.includes("youtu.be/")) {
        const videoId = url
            .split("youtu.be/")[1]
            .split("?")[0];

        return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes("watch?v=")) {
        const videoId = url
            .split("watch?v=")[1]
            .split("&")[0];

        return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
};

const Learning = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const lessonId = searchParams.get("lesson");

    const [course, setCourse] = useState(null);
    const [sections, setSections] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(null);

    const [progress, setProgress] = useState(0);
    const [completedLessons, setCompletedLessons] = useState([]);

    const [loading, setLoading] = useState(true);
    const [enrolled, setEnrolled] = useState(false);

    const token = localStorage.getItem("token");
    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

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

                const allLessons =
                    sectionsWithLessons.flatMap(
                        (section) =>
                            section.lessons || []
                    );

                if (token) {
                    try {
                        const progressData =
                            await getCourseProgress(
                                id,
                                token
                            );

                        setProgress(
                            progressData.progress || 0
                        );

                        setCompletedLessons(
                            (
                                progressData.completedLessons ||
                                []
                            ).map((lessonId) =>
                                lessonId.toString()
                            )
                        );
                    } catch (error) {
                        console.log(
                            "Progress not available:",
                            error.response?.data ||
                                error.message
                        );
                    }

                    try {
                        const enrollmentResponse =
                            await fetch(
                                `${import.meta.env.VITE_API_URL}/enrollments/my`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }
                            );

                        const enrollmentData =
                            await enrollmentResponse.json();

                        const isEnrolled =
                            (
                                enrollmentData.enrollments ||
                                []
                            ).some(
                                (enrollment) =>
                                    enrollment.course?._id ===
                                    id
                            );

                        setEnrolled(isEnrolled);
                    } catch (error) {
                        console.log(
                            "Enrollment check failed:",
                            error.message
                        );
                    }
                }

                if (lessonId) {
                    const selected =
                        allLessons.find(
                            (lesson) =>
                                lesson._id === lessonId
                        );

                    if (selected) {
                        setSelectedLesson(selected);
                    }
                } else if (allLessons.length > 0) {
                    const firstFreeLesson =
                        allLessons.find(
                            (lesson) => lesson.isFree
                        );

                    setSelectedLesson(
                        firstFreeLesson ||
                            allLessons[0]
                    );
                }
            } catch (error) {
                console.log(
                    "LEARNING ERROR:",
                    error.response?.data ||
                        error.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, token, lessonId]);

    const canWatchLesson = (lesson) => {
        if (!lesson) {
            return false;
        }

        if (lesson.isFree) {
            return true;
        }

        if (user?.role === "instructor") {
            return true;
        }

        if (enrolled) {
            return true;
        }

        return false;
    };

    const handleLessonClick = (lesson) => {
        if (!canWatchLesson(lesson)) {
            alert(
                "Please enroll in this course to watch this lesson."
            );
            return;
        }

        setSelectedLesson(lesson);

        navigate(
            `/courses/${id}/learn?lesson=${lesson._id}`,
            {
                replace: true
            }
        );
    };

    const handleComplete = async () => {
        if (!selectedLesson || !token) {
            return;
        }

        try {
            const data = await completeLesson(
                selectedLesson._id,
                id,
                token
            );

            alert(data.message);

            setProgress(data.progress || 0);

            const lessonId =
                selectedLesson._id.toString();

            if (
                !completedLessons.includes(lessonId)
            ) {
                setCompletedLessons([
                    ...completedLessons,
                    lessonId
                ]);
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    "Failed to update progress"
            );
        }
    };

    const isLessonCompleted = (lessonId) => {
        return completedLessons.some(
            (completedId) =>
                completedId.toString() ===
                lessonId.toString()
        );
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#06a7d9]"></div>

                    <p className="text-gray-500">
                        Loading lesson...
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
        <div className="min-h-screen bg-gray-100">

            {/* Top Learning Header */}
            <div className="sticky top-0 z-30 border-b bg-[#181d38] shadow-md">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="min-w-0">

                            <button
                                onClick={() =>
                                    navigate(
                                        `/courses/${id}`
                                    )
                                }
                                className="mb-1 text-xs text-[#06a7d9] hover:text-white"
                            >
                                <i className="bi bi-arrow-left mr-1"></i>
                                Back to Course
                            </button>

                            <h1 className="truncate text-lg font-bold text-white sm:text-xl">
                                {course.title}
                            </h1>

                        </div>

                        <div className="w-full sm:w-80">

                            <div className="mb-2 flex items-center justify-between text-xs">
                                <span className="text-gray-300">
                                    Your Progress
                                </span>

                                <span className="font-semibold text-white">
                                    {progress}%
                                </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-white/20">
                                <div
                                    className="h-full rounded-full bg-[#06a7d9] transition-all duration-500"
                                    style={{
                                        width: `${progress}%`
                                    }}
                                ></div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            {/* Main Learning Area */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-3">

                {/* Lesson Sidebar */}
                <aside className="order-2 border-r bg-white lg:order-1 lg:col-span-1">

                    <div className="border-b px-5 py-5">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-[#06a7d9]">
                                    Learning
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-[#181d38]">
                                    Course Content
                                </h2>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#06a7d9]/10">
                                <i className="bi bi-list-ul text-lg text-[#06a7d9]"></i>
                            </div>

                        </div>

                    </div>

                    <div className="max-h-[calc(100vh-140px)] overflow-y-auto">

                        {sections.length === 0 ? (
                            <div className="p-6 text-center">
                                <p className="text-sm text-gray-500">
                                    No lessons available.
                                </p>
                            </div>
                        ) : (
                            sections.map(
                                (
                                    section,
                                    sectionIndex
                                ) => (
                                    <div
                                        key={
                                            section._id
                                        }
                                        className="border-b"
                                    >

                                        {/* Section */}
                                        <div className="bg-gray-50 px-5 py-4">

                                            <div className="flex items-center gap-3">

                                                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#06a7d9] text-xs font-bold text-white">
                                                    {sectionIndex +
                                                        1}
                                                </span>

                                                <div>
                                                    <h3 className="text-sm font-bold text-[#181d38]">
                                                        {
                                                            section.title
                                                        }
                                                    </h3>

                                                    <p className="mt-1 text-xs text-gray-400">
                                                        {
                                                            section
                                                                .lessons
                                                                ?.length ||
                                                            0
                                                        }{" "}
                                                        lessons
                                                    </p>
                                                </div>

                                            </div>

                                        </div>

                                        {/* Lessons */}
                                        {section.lessons?.map(
                                            (
                                                lesson,
                                                lessonIndex
                                            ) => {

                                                const completed =
                                                    isLessonCompleted(
                                                        lesson._id
                                                    );

                                                const selected =
                                                    selectedLesson?._id ===
                                                    lesson._id;

                                                const watchable =
                                                    canWatchLesson(
                                                        lesson
                                                    );

                                                return (
                                                    <button
                                                        key={
                                                            lesson._id
                                                        }
                                                        onClick={() =>
                                                            handleLessonClick(
                                                                lesson
                                                            )
                                                        }
                                                        className={`flex w-full items-center justify-between gap-3 border-l-4 px-5 py-4 text-left transition ${
                                                            selected
                                                                ? "border-[#06a7d9] bg-[#06a7d9]/10"
                                                                : "border-transparent hover:bg-gray-50"
                                                        }`}
                                                    >

                                                        <div className="flex min-w-0 items-start gap-3">

                                                            <span
                                                                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                                                                    completed
                                                                        ? "bg-green-600 text-white"
                                                                        : selected
                                                                        ? "bg-[#06a7d9] text-white"
                                                                        : watchable
                                                                        ? "bg-gray-100 text-gray-600"
                                                                        : "bg-gray-200 text-gray-400"
                                                                }`}
                                                            >
                                                                {completed ? (
                                                                    <i className="bi bi-check"></i>
                                                                ) : (
                                                                    lessonIndex +
                                                                    1
                                                                )}
                                                            </span>

                                                            <div className="min-w-0">

                                                                <p
                                                                    className={`text-sm font-medium ${
                                                                        selected
                                                                            ? "text-[#06a7d9]"
                                                                            : "text-gray-700"
                                                                    }`}
                                                                >
                                                                    {
                                                                        lesson.title
                                                                    }
                                                                </p>

                                                                {lesson.duration && (
                                                                    <p className="mt-1 text-xs text-gray-400">
                                                                        <i className="bi bi-clock mr-1"></i>
                                                                        {
                                                                            lesson.duration
                                                                        }
                                                                    </p>
                                                                )}

                                                            </div>

                                                        </div>

                                                        <div className="shrink-0">

                                                            {completed ? (
                                                                <i className="bi bi-check-circle-fill text-green-600"></i>
                                                            ) : lesson.isFree ? (
                                                                <span className="text-xs font-medium text-green-600">
                                                                    Free
                                                                </span>
                                                            ) : watchable ? (
                                                                <i className="bi bi-play-circle text-[#06a7d9]"></i>
                                                            ) : (
                                                                <i className="bi bi-lock-fill text-gray-300"></i>
                                                            )}

                                                        </div>

                                                    </button>
                                                );
                                            }
                                        )}

                                    </div>
                                )
                            )
                        )}

                    </div>

                </aside>

                {/* Video / Lesson Area */}
                <main className="order-1 lg:order-2 lg:col-span-2">

                    {selectedLesson ? (

                        <div className="p-4 sm:p-7">

                            {canWatchLesson(
                                selectedLesson
                            ) ? (
                                <>
                                    {/* Video */}
                                    <div className="overflow-hidden bg-black shadow-lg">

                                        {selectedLesson.videoUrl ? (
                                            <iframe
                                                className="aspect-video w-full"
                                                src={getYouTubeEmbedUrl(
                                                    selectedLesson.videoUrl
                                                )}
                                                title={
                                                    selectedLesson.title
                                                }
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <div className="flex aspect-video items-center justify-center text-gray-400">
                                                <div className="text-center">

                                                    <i className="bi bi-camera-video-off text-5xl"></i>

                                                    <p className="mt-3">
                                                        No video available
                                                    </p>

                                                </div>
                                            </div>
                                        )}

                                    </div>

                                    {/* Lesson Information */}
                                    <div className="mt-6 bg-white p-6 shadow-sm sm:p-8">

                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                            <div>

                                                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#06a7d9]">
                                                    Current Lesson
                                                </p>

                                                <h2 className="text-2xl font-bold text-[#181d38] sm:text-3xl">
                                                    {
                                                        selectedLesson.title
                                                    }
                                                </h2>

                                            </div>

                                            {selectedLesson.duration && (
                                                <span className="shrink-0 rounded-full bg-gray-100 px-4 py-2 text-xs font-medium text-gray-500">
                                                    <i className="bi bi-clock mr-1"></i>
                                                    {
                                                        selectedLesson.duration
                                                    }
                                                </span>
                                            )}

                                        </div>

                                        <div className="mt-6 border-t pt-6">

                                            <p className="leading-8 text-gray-600">
                                                {selectedLesson.description ||
                                                    "No description available."}
                                            </p>

                                        </div>

                                        {/* Completion */}
                                        <div className="mt-7 border-t pt-6">

                                            {isLessonCompleted(
                                                selectedLesson._id
                                            ) ? (
                                                <div className="flex items-center gap-3 rounded-md bg-green-50 p-4 text-green-700">

                                                    <i className="bi bi-check-circle-fill text-xl"></i>

                                                    <div>
                                                        <p className="font-semibold">
                                                            Lesson Completed
                                                        </p>

                                                        <p className="mt-1 text-sm text-green-600">
                                                            Your progress has
                                                            been saved.
                                                        </p>
                                                    </div>

                                                </div>
                                            ) : token ? (
                                                <button
                                                    onClick={
                                                        handleComplete
                                                    }
                                                    className="bg-[#06a7d9] px-7 py-3 font-semibold text-white transition hover:bg-[#058db8]"
                                                >
                                                    <i className="bi bi-check2-circle mr-2"></i>
                                                    Mark as Complete
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            "/login"
                                                        )
                                                    }
                                                    className="bg-[#06a7d9] px-7 py-3 font-semibold text-white transition hover:bg-[#058db8]"
                                                >
                                                    <i className="bi bi-box-arrow-in-right mr-2"></i>
                                                    Login to Track Progress
                                                </button>
                                            )}

                                        </div>

                                    </div>

                                </>
                            ) : (

                                /* Locked Lesson */
                                <div className="flex min-h-125 items-center justify-center bg-white p-8 shadow-sm">

                                    <div className="max-w-md text-center">

                                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                                            <i className="bi bi-lock-fill text-3xl text-gray-400"></i>
                                        </div>

                                        <h2 className="mt-6 text-2xl font-bold text-[#181d38]">
                                            Lesson Locked
                                        </h2>

                                        <p className="mt-3 leading-7 text-gray-500">
                                            Enroll in this course
                                            to unlock this lesson
                                            and continue learning.
                                        </p>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/courses/${id}`
                                                )
                                            }
                                            className="mt-7 bg-[#06a7d9] px-7 py-3 font-semibold text-white transition hover:bg-[#058db8]"
                                        >
                                            <i className="bi bi-mortarboard-fill mr-2"></i>
                                            View Course
                                        </button>

                                    </div>

                                </div>
                            )}

                        </div>

                    ) : (

                        <div className="flex min-h-150 items-center justify-center p-8">

                            <div className="text-center">

                                <i className="bi bi-play-circle text-6xl text-gray-300"></i>

                                <h2 className="mt-5 text-2xl font-bold text-[#181d38]">
                                    Start Learning
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    Select a lesson from the
                                    course content.
                                </p>

                            </div>

                        </div>
                    )}

                </main>

            </div>

            {/* Bottom */}
            <div className="border-t bg-[#181d38] px-4 py-5">
                <div className="mx-auto flex max-w-7xl flex-col gap-2 text-center text-sm sm:flex-row sm:items-center sm:justify-between sm:text-left">

                    <p className="text-gray-400">
                        Keep learning and complete your course.
                    </p>

                    <button
                        onClick={() =>
                            navigate(
                                `/courses/${id}`
                            )
                        }
                        className="font-medium text-[#06a7d9] hover:text-white"
                    >
                        Course Details
                        <i className="bi bi-arrow-right ml-2"></i>
                    </button>

                </div>
            </div>

        </div>
    );
};

export default Learning;