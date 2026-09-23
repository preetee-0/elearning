import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    getCourses,
    getMyEnrollments,
    enrollCourse
} from "../services/CourseService";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryFromUrl = searchParams.get("category");

    const [selectedCategory, setSelectedCategory] = useState(
        categoryFromUrl || "All"
    );

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesData = await getCourses();

                setCourses(coursesData.courses || []);

                if (token) {
                    const enrollmentData =
                        await getMyEnrollments(token);

                    setEnrolledCourses(
                        (enrollmentData.enrollments || []).filter(
                            (enrollment) => enrollment.course
                        )
                    );
                }
            } catch (error) {
                console.log(
                    error.response?.data || error.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);
useEffect(() => {
    setSelectedCategory(categoryFromUrl || "All");
}, [categoryFromUrl]);
    const isEnrolled = (courseId) => {
        return enrolledCourses.some(
            (enrollment) =>
                enrollment.course &&
                enrollment.course._id === courseId
        );
    };

    const handleEnroll = async (courseId) => {
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const data = await enrollCourse(
                courseId,
                token
            );

            alert(data.message);

            const enrollmentData =
                await getMyEnrollments(token);

            setEnrolledCourses(
                (enrollmentData.enrollments || []).filter(
                    (enrollment) => enrollment.course
                )
            );
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to enroll"
            );
        }
    };

    const categories = [
        "All",
        ...new Set(
            courses
                .map((course) => course.category)
                .filter(Boolean)
        )
    ];

    const filteredCourses =
        selectedCategory === "All"
            ? courses
            : courses.filter(
                  (course) =>
                      course.category === selectedCategory
              );

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#06a7d9]"></div>

                    <p className="text-gray-500">
                        Loading courses...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">

            {/* Page Header */}
            <section className="bg-[#181d38] px-4 py-20 sm:px-6 lg:px-10">
                <div className="mx-auto max-w-7xl text-center">

                    <h1 className="text-4xl font-bold text-white sm:text-5xl">
                        Courses
                    </h1>

                    <div className="mt-5 flex items-center justify-center gap-3 text-sm">
                        <button
                            onClick={() => navigate("/")}
                            className="text-[#06a7d9] hover:text-white"
                        >
                            Home
                        </button>

                        <span className="text-gray-400">
                            /
                        </span>

                        <span className="text-gray-300">
                            Courses
                        </span>
                    </div>

                </div>
            </section>

            {/* Courses Section */}
            <section className="px-4 py-20 sm:px-6 lg:px-10">
                <div className="mx-auto max-w-7xl">

                    {/* Heading */}
                    <div className="mb-10 text-center">

                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#06a7d9]">
                            Courses
                        </p>

                        <h2 className="text-3xl font-bold text-[#181d38] sm:text-4xl">
                            Explore Our Courses
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                            Learn new skills from expert instructors
                            and build knowledge that helps you grow.
                        </p>

                    </div>

                    {/* Category Filter */}
                    {categories.length > 1 && (
                        <div className="mb-12 flex flex-wrap justify-center gap-3">

                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
    setSelectedCategory(category);

    if (category === "All") {
        setSearchParams({});
    } else {
        setSearchParams({ category });
    }
}}
                                    className={`rounded-full px-6 py-2.5 text-sm font-medium transition ${
                                        selectedCategory ===
                                        category
                                            ? "bg-[#06a7d9] text-white shadow-md"
                                            : "bg-gray-100 text-gray-600 hover:bg-[#06a7d9] hover:text-white"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}

                        </div>
                    )}

                    {/* Course Count */}
                    <div className="mb-6 flex items-center justify-between">

                        <p className="text-sm text-gray-500">
                            Showing{" "}
                            <span className="font-semibold text-gray-800">
                                {filteredCourses.length}
                            </span>{" "}
                            courses
                        </p>

                    </div>

                    {/* Courses */}
                    {filteredCourses.length === 0 ? (
                        <div className="rounded-lg border border-gray-100 bg-gray-50 p-12 text-center">
                            <i className="bi bi-book text-5xl text-gray-300"></i>

                            <h3 className="mt-4 text-xl font-semibold text-gray-700">
                                No courses available
                            </h3>

                            <p className="mt-2 text-gray-500">
                                Check another category or come
                                back later.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

                            {filteredCourses.map((course) => {
                                const enrolled =
                                    isEnrolled(
                                        course._id
                                    );

                                return (
                                    <div
                                        key={course._id}
                                        className="group overflow-hidden bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                                    >

                                        {/* Image */}
                                        <div className="relative h-56 overflow-hidden bg-gray-100">

                                            {course.thumbnail ? (
                                                <img
                                                    src={
                                                        course.thumbnail
                                                    }
                                                    alt={
                                                        course.title
                                                    }
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center bg-gray-100">
                                                    <i className="bi bi-book text-6xl text-gray-300"></i>
                                                </div>
                                            )}

                                            {/* Category */}
                                            <span className="absolute left-4 top-4 bg-[#06a7d9] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
                                                {course.category ||
                                                    "Course"}
                                            </span>

                                        </div>

                                        {/* Content */}
                                        <div className="p-6">

                                            {/* Rating */}
                                            <div className="mb-3 flex items-center justify-between">

                                                <div className="flex items-center gap-1">

                                                    <i className="bi bi-star-fill text-sm text-yellow-400"></i>

                                                    <span className="text-sm font-semibold text-gray-700">
                                                        {course.averageRating ||
                                                            0}
                                                    </span>

                                                    <span className="text-sm text-gray-400">
                                                        (
                                                        {course.reviewCount ||
                                                            0}
                                                        )
                                                    </span>

                                                </div>

                                                <span className="text-xs font-medium uppercase text-gray-400">
                                                    {course.level}
                                                </span>

                                            </div>

                                            {/* Title */}
                                            <h3
                                                onClick={() =>
                                                    navigate(
                                                        `/courses/${course._id}`
                                                    )
                                                }
                                                className="mb-3 cursor-pointer text-xl font-bold leading-snug text-[#181d38] transition hover:text-[#06a7d9]"
                                            >
                                                {course.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="mb-5 line-clamp-2 text-sm leading-6 text-gray-500">
                                                {
                                                    course.description
                                                }
                                            </p>

                                            {/* Course Info */}
                                            <div className="mb-5 flex items-center gap-5 border-b border-gray-100 pb-5 text-sm text-gray-500">

                                                <span>
                                                    <i className="bi bi-clock mr-2 text-[#06a7d9]"></i>
                                                    {course.duration ||
                                                        "Self paced"}
                                                </span>

                                                <span>
                                                    <i className="bi bi-bar-chart mr-2 text-[#06a7d9]"></i>
                                                    {course.level}
                                                </span>

                                            </div>

                                            {/* Price + Button */}
                                            <div className="flex items-center justify-between gap-4">

                                                <div>
                                                    <span className="text-xl font-bold text-[#181d38]">
                                                        {course.price ===
                                                        0
                                                            ? "Free"
                                                            : `Rs. ${course.price}`}
                                                    </span>
                                                </div>

                                                {enrolled ? (
                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/courses/${course._id}/learn`
                                                            )
                                                        }
                                                        className="rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                                                    >
                                                        Continue
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            handleEnroll(
                                                                course._id
                                                            )
                                                        }
                                                        className="rounded-md bg-[#06a7d9] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#058db8]"
                                                    >
                                                        Enroll Now
                                                    </button>
                                                )}

                                            </div>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>
                    )}

                </div>
            </section>

            

        </div>
    );
};

export default Courses;