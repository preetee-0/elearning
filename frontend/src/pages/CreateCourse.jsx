import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [thumbnail, setThumbnail] = useState("");
    const [level, setLevel] = useState("beginner");
    const [duration, setDuration] = useState("");

    const [sections, setSections] = useState([
        {
            title: "",
            lessons: [
                {
                    title: "",
                    description: "",
                    videoUrl: "",
                    duration: "",
                    isFree: false
                }
            ]
        }
    ]);

    const addSection = () => {
        setSections([
            ...sections,
            {
                title: "",
                lessons: [
                    {
                        title: "",
                        description: "",
                        videoUrl: "",
                        duration: "",
                        isFree: false
                    }
                ]
            }
        ]);
    };

    const removeSection = (sectionIndex) => {
        const updatedSections = sections.filter(
            (_, index) => index !== sectionIndex
        );

        setSections(updatedSections);
    };

    const updateSection = (sectionIndex, value) => {
        const updatedSections = [...sections];

        updatedSections[sectionIndex].title = value;

        setSections(updatedSections);
    };

    const addLesson = (sectionIndex) => {
        const updatedSections = [...sections];

        updatedSections[sectionIndex].lessons.push({
            title: "",
            description: "",
            videoUrl: "",
            duration: "",
            isFree: false
        });

        setSections(updatedSections);
    };

    const removeLesson = (
        sectionIndex,
        lessonIndex
    ) => {
        const updatedSections = [...sections];

        updatedSections[sectionIndex].lessons =
            updatedSections[sectionIndex].lessons.filter(
                (_, index) => index !== lessonIndex
            );

        setSections(updatedSections);
    };

    const updateLesson = (
        sectionIndex,
        lessonIndex,
        field,
        value
    ) => {
        const updatedSections = [...sections];

        updatedSections[sectionIndex].lessons[
            lessonIndex
        ][field] = value;

        setSections(updatedSections);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const courseResponse = await axios.post(
                `${import.meta.env.VITE_API_URL}/courses`,
                {
                    title,
                    description,
                    category,
                    price: Number(price),
                    thumbnail,
                    level,
                    duration
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const courseId =
                courseResponse.data.course._id;

            for (
                let i = 0;
                i < sections.length;
                i++
            ) {
                const sectionResponse =
                    await axios.post(
                        `${import.meta.env.VITE_API_URL}/sections`,
                        {
                            title: sections[i].title,
                            course: courseId,
                            order: i + 1
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );

                const sectionId =
                    sectionResponse.data.section._id;

                for (
                    let j = 0;
                    j < sections[i].lessons.length;
                    j++
                ) {
                    const lesson =
                        sections[i].lessons[j];

                    await axios.post(
                        `${import.meta.env.VITE_API_URL}/lessons`,
                        {
                            title: lesson.title,
                            description:
                                lesson.description,
                            section: sectionId,
                            videoUrl:
                                lesson.videoUrl,
                            duration:
                                lesson.duration,
                            order: j + 1,
                            isFree: lesson.isFree
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                }
            }

            alert("Course created successfully");

            navigate("/courses");
        } catch (error) {
            console.log(
                "CREATE COURSE ERROR:",
                error
            );

            console.log(
                "ERROR RESPONSE:",
                error.response?.data
            );

            console.log(
                "ERROR STATUS:",
                error.response?.status
            );

            alert(
                error.response?.data?.message ||
                    "Failed to create course"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <section className="bg-[#181d38] py-14">
                <div className="mx-auto max-w-7xl px-4">

                    <div className="max-w-3xl">

                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#06a7d9]">
                            Instructor Panel
                        </p>

                        <h1 className="text-4xl font-bold text-white md:text-5xl">
                            Create Course
                        </h1>

                        <p className="mt-4 text-lg text-gray-300">
                            Create an engaging course with
                            sections, lessons and video content.
                        </p>

                    </div>

                </div>
            </section>

            {/* Form */}
            <section className="py-12">
                <div className="mx-auto max-w-5xl px-4">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-8"
                    >

                        {/* Course Information */}
                        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">

                            <div className="mb-7 flex items-center gap-4">

                                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-cyan-50">
                                    <i className="bi bi-book text-2xl text-[#06a7d9]"></i>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-[#181d38]">
                                        Course Information
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Enter the basic information
                                        about your course.
                                    </p>
                                </div>

                            </div>

                            <div className="grid grid-cols-1 gap-5">

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Course Title
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter course title"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Course Description
                                    </label>

                                    <textarea
                                        placeholder="Describe what students will learn..."
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(
                                                e.target.value
                                            )
                                        }
                                        rows="5"
                                        className="w-full resize-none rounded-md border border-gray-200 px-4 py-3 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Category
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="e.g. Web Development"
                                            value={category}
                                            onChange={(e) =>
                                                setCategory(
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Price
                                        </label>

                                        <div className="relative">

                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                                                Rs.
                                            </span>

                                            <input
                                                type="number"
                                                min="0"
                                                value={price}
                                                onChange={(e) =>
                                                    setPrice(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-md border border-gray-200 py-3 pl-12 pr-4 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                                            />

                                        </div>
                                    </div>

                                </div>

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Thumbnail URL
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="https://example.com/image.jpg"
                                            value={thumbnail}
                                            onChange={(e) =>
                                                setThumbnail(
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Duration
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="e.g. 10 hours"
                                            value={duration}
                                            onChange={(e) =>
                                                setDuration(
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                                        />
                                    </div>

                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Course Level
                                    </label>

                                    <select
                                        value={level}
                                        onChange={(e) =>
                                            setLevel(
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                                    >
                                        <option value="beginner">
                                            Beginner
                                        </option>

                                        <option value="intermediate">
                                            Intermediate
                                        </option>

                                        <option value="advanced">
                                            Advanced
                                        </option>
                                    </select>
                                </div>

                            </div>
                        </div>

                        {/* Sections */}
                        {sections.map(
                            (
                                section,
                                sectionIndex
                            ) => (
                                <div
                                    key={sectionIndex}
                                    className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8"
                                >

                                    {/* Section Header */}
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                        <div className="flex items-center gap-4">

                                            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-cyan-50">
                                                <span className="font-bold text-[#06a7d9]">
                                                    {sectionIndex +
                                                        1}
                                                </span>
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-[#06a7d9]">
                                                    Section{" "}
                                                    {sectionIndex +
                                                        1}
                                                </p>

                                                <h2 className="text-xl font-bold text-[#181d38]">
                                                    Course Section
                                                </h2>
                                            </div>

                                        </div>

                                        {sections.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeSection(
                                                        sectionIndex
                                                    )
                                                }
                                                className="w-fit text-sm font-semibold text-red-500 hover:text-red-600"
                                            >
                                                <i className="bi bi-trash mr-1"></i>
                                                Remove Section
                                            </button>
                                        )}

                                    </div>

                                    {/* Section Title */}
                                    <div className="mt-6">

                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Section Title
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="e.g. Introduction to Web Development"
                                            value={
                                                section.title
                                            }
                                            onChange={(e) =>
                                                updateSection(
                                                    sectionIndex,
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                                            required
                                        />

                                    </div>

                                    {/* Lessons */}
                                    <div className="mt-7">

                                        <div className="mb-4 flex items-center justify-between">

                                            <h3 className="font-bold text-[#181d38]">
                                                Lessons
                                            </h3>

                                            <span className="text-sm text-gray-500">
                                                {
                                                    section
                                                        .lessons
                                                        .length
                                                }{" "}
                                                Lesson
                                                {section
                                                    .lessons
                                                    .length !==
                                                1
                                                    ? "s"
                                                    : ""}
                                            </span>

                                        </div>

                                        <div className="space-y-5">

                                            {section.lessons.map(
                                                (
                                                    lesson,
                                                    lessonIndex
                                                ) => (
                                                    <div
                                                        key={
                                                            lessonIndex
                                                        }
                                                        className="rounded-lg border border-gray-200 bg-gray-50 p-5"
                                                    >

                                                        {/* Lesson Header */}
                                                        <div className="flex items-center justify-between">

                                                            <div className="flex items-center gap-3">

                                                                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#181d38] text-sm font-bold text-white">
                                                                    {lessonIndex +
                                                                        1}
                                                                </div>

                                                                <h4 className="font-semibold text-[#181d38]">
                                                                    Lesson{" "}
                                                                    {lessonIndex +
                                                                        1}
                                                                </h4>

                                                            </div>

                                                            {section
                                                                .lessons
                                                                .length >
                                                                1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        removeLesson(
                                                                            sectionIndex,
                                                                            lessonIndex
                                                                        )
                                                                    }
                                                                    className="text-sm font-semibold text-red-500 hover:text-red-600"
                                                                >
                                                                    <i className="bi bi-x-lg mr-1"></i>
                                                                    Remove
                                                                </button>
                                                            )}

                                                        </div>

                                                        <div className="mt-5 space-y-4">

                                                            <div>
                                                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                                    Lesson Title
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    placeholder="Enter lesson title"
                                                                    value={
                                                                        lesson.title
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateLesson(
                                                                            sectionIndex,
                                                                            lessonIndex,
                                                                            "title",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                                                                    required
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                                    Lesson Description
                                                                </label>

                                                                <textarea
                                                                    placeholder="Describe this lesson..."
                                                                    value={
                                                                        lesson.description
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateLesson(
                                                                            sectionIndex,
                                                                            lessonIndex,
                                                                            "description",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    rows="3"
                                                                    className="w-full resize-none rounded-md border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                                    Video URL
                                                                </label>

                                                                <div className="relative">

                                                                    <i className="bi bi-play-circle absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                                                                    <input
                                                                        type="text"
                                                                        placeholder="https://youtube.com/..."
                                                                        value={
                                                                            lesson.videoUrl
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            updateLesson(
                                                                                sectionIndex,
                                                                                lessonIndex,
                                                                                "videoUrl",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        className="w-full rounded-md border border-gray-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                                                                    />

                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                                    Lesson Duration
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    placeholder="e.g. 15 minutes"
                                                                    value={
                                                                        lesson.duration
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateLesson(
                                                                            sectionIndex,
                                                                            lessonIndex,
                                                                            "duration",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                                                                />
                                                            </div>

                                                            {/* Free Preview */}
                                                            <label className="flex cursor-pointer items-center gap-3 rounded-md border border-gray-200 bg-white p-4">

                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        lesson.isFree
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateLesson(
                                                                            sectionIndex,
                                                                            lessonIndex,
                                                                            "isFree",
                                                                            e
                                                                                .target
                                                                                .checked
                                                                        )
                                                                    }
                                                                    className="h-4 w-4 accent-[#06a7d9]"
                                                                />

                                                                <div>
                                                                    <p className="font-semibold text-[#181d38]">
                                                                        Free Preview Lesson
                                                                    </p>

                                                                    <p className="text-sm text-gray-500">
                                                                        Allow students to
                                                                        watch this lesson
                                                                        before enrolling.
                                                                    </p>
                                                                </div>

                                                            </label>

                                                        </div>

                                                    </div>
                                                )
                                            )}

                                        </div>

                                        {/* Add Lesson */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                addLesson(
                                                    sectionIndex
                                                )
                                            }
                                            className="mt-5 rounded-md border border-[#06a7d9] px-5 py-2.5 font-semibold text-[#06a7d9] transition hover:bg-cyan-50"
                                        >
                                            <i className="bi bi-plus-lg mr-2"></i>
                                            Add Lesson
                                        </button>

                                    </div>

                                </div>
                            )
                        )}

                        {/* Bottom Actions */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <button
                                type="button"
                                onClick={addSection}
                                className="rounded-md border border-[#181d38] px-6 py-3 font-semibold text-[#181d38] transition hover:bg-[#181d38] hover:text-white"
                            >
                                <i className="bi bi-plus-lg mr-2"></i>
                                Add Section
                            </button>

                            <div className="flex flex-col gap-3 sm:flex-row">

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            "/instructor/dashboard"
                                        )
                                    }
                                    className="rounded-md border border-gray-300 px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-md bg-[#06a7d9] px-7 py-3 font-semibold text-white transition hover:bg-[#058fb9]"
                                >
                                    <i className="bi bi-check-lg mr-2"></i>
                                    Create Course
                                </button>

                            </div>

                        </div>

                    </form>

                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-[#181d38] py-14">
                <div className="mx-auto max-w-4xl px-4 text-center">

                    <i className="bi bi-mortarboard text-5xl text-[#06a7d9]"></i>

                    <h2 className="mt-4 text-3xl font-bold text-white">
                        Build Something Students Will Love
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-gray-300">
                        Add useful lessons, videos and resources
                        to create a complete learning experience.
                    </p>

                </div>
            </section>

        </div>
    );
};

export default CreateCourse;