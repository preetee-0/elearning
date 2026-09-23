import { useState } from "react";
import axios from "axios";
import {
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.mobile.trim() ||
            !formData.message.trim()
        ) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                `${API_URL}/contact`,
                formData
            );

            alert(
                response.data.message ||
                "Message sent successfully!"
            );

            setFormData({
                name: "",
                email: "",
                mobile: "",
                message: "",
            });
        } catch (error) {
            console.log(error.response?.data || error.message);
            alert(
                error.response?.data?.message ||
                "Failed to send message. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* HEADER */}
            <section className="bg-[#06a7d9] py-16 text-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <h1 className="text-4xl font-extrabold sm:text-5xl">
                        Contact Us
                    </h1>
                    <p className="mt-4 text-lg text-white/90">
                        Contact For Any Query
                    </p>
                </div>
            </section>

            {/* MAIN SECTION */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="mb-12 text-center">
                        <p className="font-bold uppercase tracking-[3px] text-[#06a7d9]">
                            Get In Touch
                        </p>
                        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Contact For Any Query
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                            Have a question? Send us a message and we'll
                            get back to you as soon as possible.
                        </p>
                    </div>

                    <div className="grid gap-10 lg:grid-cols-2">

                        {/* INFO CARDS */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-5 bg-white p-6 shadow-sm">
                                <div className="flex h-14 w-14 items-center justify-center bg-[#e8f8fc] text-2xl text-[#06a7d9]">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Office
                                    </h3>
                                    <p className="mt-1 text-gray-500">
                                        DSCET Chennai, Tamil Nadu
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 bg-white p-6 shadow-sm">
                                <div className="flex h-14 w-14 items-center justify-center bg-[#e8f8fc] text-2xl text-[#06a7d9]">
                                    <FaPhone />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Mobile
                                    </h3>
                                    <p className="mt-1 text-gray-500">
                                        +91 705 088 9705
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 bg-white p-6 shadow-sm">
                                <div className="flex h-14 w-14 items-center justify-center bg-[#e8f8fc] text-2xl text-[#06a7d9]">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Email
                                    </h3>
                                    <p className="mt-1 text-gray-500">
                                        basantgoswami7050@gmail.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-8 shadow-sm"
                        >
                            <div className="mb-6">
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Your Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full border border-gray-200 px-4 py-3 outline-none transition focus:border-[#06a7d9]"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Your Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-200 px-4 py-3 outline-none transition focus:border-[#06a7d9]"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="mobile"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Mobile No
                                </label>
                                <input
                                    id="mobile"
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="Enter your mobile number"
                                    className="w-full border border-gray-200 px-4 py-3 outline-none transition focus:border-[#06a7d9]"
                                    required
                                />
                            </div>

                            {/* ⭐ NEW: MESSAGE FIELD */}
                            <div className="mb-8">
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    rows="5"
                                    className="w-full resize-none border border-gray-200 px-4 py-3 outline-none transition focus:border-[#06a7d9]"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 bg-[#06a7d9] py-3 font-semibold text-white transition hover:bg-[#078eb7] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <FaPaperPlane />
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                        </form>

                    </div>
                </div>
            </section>

        </div>
    );
};

export default Contact;