import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    FaStar,
    FaRegStar,
    FaTrash,
    FaHome,
    FaChevronRight,
} from "react-icons/fa";

const Feedback = () => {
    const navigate = useNavigate();

    const [feedbacks, setFeedbacks] = useState([]);
    const [comment, setComment] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    // Get current logged-in user + token
    const token = localStorage.getItem("token");
    const currentUser = JSON.parse(localStorage.getItem("user") || "null");

    // Auth header for protected routes
    const authConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get(`${API_URL}/feedback`);

            setFeedbacks(
                response.data.feedbacks ||
                response.data.data ||
                response.data ||
                []
            );
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            alert("Please login to give feedback.");
            navigate("/login");
            return;
        }

        if (!comment.trim()) {
            alert("Please enter your comment.");
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                `${API_URL}/feedback`,
                {
                    comment,
                    imageUrl,
                    rating,
                },
                authConfig
            );

            setComment("");
            setImageUrl("");
            setRating(5);

            fetchFeedbacks();

            alert("Feedback submitted successfully!");
        } catch (error) {
            console.log(error.response?.data || error.message);

            alert(
                error.response?.data?.message ||
                "Failed to submit feedback."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this feedback?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `${API_URL}/feedback/${id}`,
                authConfig
            );

            setFeedbacks(
                feedbacks.filter((feedback) => feedback._id !== id)
            );
        } catch (error) {
            console.log(error.response?.data || error.message);

            alert(
                error.response?.data?.message ||
                "Failed to delete feedback."
            );
        }
    };

    const formatDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const renderStars = (value) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) =>
                    star <= value ? (
                        <FaStar
                            key={star}
                            className="text-yellow-400"
                        />
                    ) : (
                        <FaRegStar
                            key={star}
                            className="text-gray-300"
                        />
                    )
                )}
            </div>
        );
    };

    // Check if current user owns this feedback
    const isOwner = (feedback) => {
        if (!currentUser) return false;
        const ownerId =
            feedback.user?._id || feedback.user;
        return ownerId === currentUser._id;
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* BREADCRUMB */}
            <section className="bg-[#06a7d9] py-16 text-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <h1 className="text-4xl font-extrabold sm:text-5xl">
                        Feedbacks
                    </h1>

                    <div className="mt-4 flex items-center gap-3 text-sm">
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 transition hover:text-gray-200"
                        >
                            <FaHome />
                            Home
                        </button>

                        <FaChevronRight className="text-xs" />
                        <span>Pages</span>
                        <FaChevronRight className="text-xs" />
                        <span>Feedbacks</span>
                    </div>
                </div>
            </section>

            {/* FEEDBACK FORM */}
            <section className="py-20">
                <div className="mx-auto max-w-4xl px-6 lg:px-10">
                    <div className="mb-10 text-center">
                        <p className="font-bold uppercase tracking-[3px] text-[#06a7d9]">
                            Give Your Feedback
                        </p>

                        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Share Your Experience
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                            We would love to hear your thoughts about our
                            e-learning platform.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6 shadow-sm sm:p-10"
                    >
                        {/* POSTING AS */}
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Posting as
                            </label>

                            <div className="w-full border border-gray-100 bg-gray-50 px-4 py-3 text-gray-600">
                                {currentUser?.name || "Guest (please login)"}
                            </div>
                        </div>

                        {/* COMMENT */}
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Comment
                            </label>

                            <textarea
                                value={comment}
                                onChange={(e) =>
                                    setComment(e.target.value)
                                }
                                placeholder="Write your feedback..."
                                rows="5"
                                className="w-full resize-none border border-gray-200 px-4 py-3 outline-none transition focus:border-[#06a7d9]"
                            />
                        </div>

                        {/* IMAGE URL */}
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Image URL (optional)
                            </label>

                            <input
                                type="url"
                                value={imageUrl}
                                onChange={(e) =>
                                    setImageUrl(e.target.value)
                                }
                                placeholder="https://example.com/image.jpg"
                                className="w-full border border-gray-200 px-4 py-3 outline-none transition focus:border-[#06a7d9]"
                            />
                        </div>

                        {/* RATING */}
                        <div className="mb-8">
                            <label className="mb-3 block text-sm font-semibold text-gray-700">
                                Rating
                            </label>

                            <div className="flex flex-wrap items-center gap-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        type="button"
                                        key={star}
                                        onClick={() =>
                                            setRating(star)
                                        }
                                        className="flex items-center gap-1 text-sm"
                                    >
                                        {star <= rating ? (
                                            <FaStar className="text-2xl text-yellow-400" />
                                        ) : (
                                            <FaRegStar className="text-2xl text-gray-300" />
                                        )}

                                        <span className="text-gray-600">
                                            {star} Star{star > 1 ? "s" : ""}
                                        </span>
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => setRating(0)}
                                    className="text-sm text-gray-500 hover:text-[#06a7d9]"
                                >
                                    Empty
                                </button>
                            </div>
                        </div>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#06a7d9] py-3 font-semibold text-white transition hover:bg-[#078eb7] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
                        >
                            {loading ? "Submitting..." : "Give Feedback"}
                        </button>
                    </form>
                </div>
            </section>

            {/* ALL FEEDBACKS */}
            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="mb-12 text-center">
                        <p className="font-bold uppercase tracking-[3px] text-[#06a7d9]">
                            All Feedbacks of Users
                        </p>

                        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            All Feedbacks
                        </h2>
                    </div>

                    {feedbacks.length === 0 ? (
                        <div className="py-10 text-center text-gray-500">
                            No feedbacks available.
                        </div>
                    ) : (
                        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                            {feedbacks.map((feedback) => (
                                <div
                                    key={feedback._id}
                                    className="relative bg-gray-50 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    {/* DELETE - only if owner */}
                                    {isOwner(feedback) && (
                                        <button
                                            onClick={() =>
                                                handleDelete(feedback._id)
                                            }
                                            className="absolute right-5 top-5 text-gray-400 transition hover:text-red-500"
                                            title="Delete feedback"
                                        >
                                            <FaTrash />
                                        </button>
                                    )}

                                    {/* USER */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={
                                                feedback.imageUrl ||
                                                feedback.image ||
                                                "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                            }
                                            alt={
                                                feedback.user?.name ||
                                                feedback.name ||
                                                "User"
                                            }
                                            className="h-16 w-16 rounded-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";
                                            }}
                                        />

                                        <div>
                                            {/* Show logged-in user's name first */}
                                            <h3 className="font-bold text-gray-900">
                                                {feedback.user?.name ||
                                                    feedback.name ||
                                                    "Anonymous"}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {formatDate(
                                                    feedback.createdAt ||
                                                    feedback.date
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {/* RATING */}
                                    <div className="mt-5">
                                        {renderStars(feedback.rating || 0)}
                                    </div>

                                    {/* COMMENT */}
                                    <p className="mt-4 leading-7 text-gray-600">
                                        {feedback.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

          
        </div>
    );
};

export default Feedback;