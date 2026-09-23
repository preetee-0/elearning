import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price: 0,
        thumbnail: "",
        level: "beginner",
        duration: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/courses/${id}`
                );

                const course = response.data.course;

                setFormData({
                    title: course.title || "",
                    description: course.description || "",
                    category: course.category || "",
                    price: course.price || 0,
                    thumbnail: course.thumbnail || "",
                    level: course.level || "beginner",
                    duration: course.duration || ""
                });
            } catch (error) {
                console.log(
                    error.response?.data || error.message
                );

                alert("Failed to load course");
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);

        try {
            await axios.patch(
                `${import.meta.env.VITE_API_URL}/courses/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Course updated successfully");

            navigate("/instructor/dashboard");
        } catch (error) {
            console.log(
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                    "Failed to update course"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">

                <section className="bg-[#181d38] py-14">
                    <div className="mx-auto max-w-7xl px-4">
                        <p className="text-sm font-semibold uppercase tracking-widest text-[#06a7d9]">
                            Instructor Panel
                        </p>

                        <h1 className="mt-3 text-4xl font-bold text-white">
                            Edit Course
                        </h1>
                    </div>
                </section>

                <div className="flex min-h-100 items-center justify-center">
                    <div className="text-center">
                        <i className="bi bi-arrow-repeat text-4xl text-[#06a7d9]"></i>

                        <p className="mt-4 text-gray-500">
                            Loading course...
                        </p>
                    </div>
                </div>

            </div>
        );
    }

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
                            Edit Course
                        </h1>

                        <p className="mt-4 text-lg text-gray-300">
                            Update your course information and
                            keep your content up to date.
                        </p>

                    </div>

                </div>
            </section>

            {/* Form */}
            <section className="py-12">
                <div className="mx-auto max-w-4xl px-4">

                    <form
                        onSubmit={handleSubmit}
                        className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8"
                    >

                        {/* Form Header */}
                        <div className="mb-8 flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-cyan-50">
                                <i className="bi bi-pencil-square text-2xl text-[#06a7d9]"></i>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-[#181d38]">
                                    Course Information
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Update the details of your course.
                                </p>
                            </div>

                        </div>

                        {/* Title */}
                        <div className="mb-5">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Course Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="Enter course title"
                                className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                            />

                        </div>

                        {/* Description */}
                        <div className="mb-5">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Course Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="Describe what students will learn..."
                                className="w-full resize-none rounded-md border border-gray-200 px-4 py-3 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                            />

                        </div>

                        {/* Category */}
                        <div className="mb-5">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Category
                            </label>

                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Web Development"
                                className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                            />

                        </div>

                        {/* Price + Level */}
                        <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">

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
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-full rounded-md border border-gray-200 py-3 pl-12 pr-4 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Course Level
                                </label>

                                <select
                                    name="level"
                                    value={formData.level}
                                    onChange={handleChange}
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

                        {/* Duration */}
                        <div className="mb-5">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Duration
                            </label>

                            <div className="relative">

                                <i className="bi bi-clock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    placeholder="e.g. 10 hours"
                                    className="w-full rounded-md border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                                />

                            </div>

                        </div>

                        {/* Thumbnail */}
                        <div className="mb-6">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Thumbnail URL
                            </label>

                            <div className="relative">

                                <i className="bi bi-image absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                                <input
                                    type="text"
                                    name="thumbnail"
                                    value={formData.thumbnail}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full rounded-md border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#06a7d9] focus:ring-2 focus:ring-cyan-100"
                                />

                            </div>

                        </div>

                        {/* Preview */}
                        {formData.thumbnail && (
                            <div className="mb-7">

                                <p className="mb-2 text-sm font-semibold text-gray-700">
                                    Thumbnail Preview
                                </p>

                                <div className="overflow-hidden rounded-lg border border-gray-200">

                                    <img
                                        src={formData.thumbnail}
                                        alt="Course thumbnail"
                                        className="h-52 w-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display =
                                                "none";
                                        }}
                                    />

                                </div>

                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/instructor/dashboard"
                                    )
                                }
                                className="flex-1 rounded-md border border-gray-300 px-5 py-3 font-semibold text-gray-600 transition hover:bg-gray-100"
                            >
                                <i className="bi bi-arrow-left mr-2"></i>
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 rounded-md bg-[#06a7d9] px-5 py-3 font-semibold text-white transition hover:bg-[#058fb9] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {saving ? (
                                    <>
                                        <i className="bi bi-arrow-repeat mr-2"></i>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-lg mr-2"></i>
                                        Save Changes
                                    </>
                                )}
                            </button>

                        </div>

                    </form>

                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-[#181d38] py-14">
                <div className="mx-auto max-w-4xl px-4 text-center">

                    <i className="bi bi-mortarboard text-5xl text-[#06a7d9]"></i>

                    <h2 className="mt-5 text-3xl font-bold text-white">
                        Keep Your Course Updated
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-gray-300">
                        Make sure your course information is clear,
                        accurate and useful for your students.
                    </p>

                </div>
            </section>

        </div>
    );
};

export default EditCourse;