
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
 
    FaUserTie,
    FaGlobe,
    FaAward,
    FaBook,
    FaCheckCircle,
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
} from "react-icons/fa";

const Home = () => {
    const [courses, setCourses] = useState([]);
const navigate = useNavigate();

const categories = [...new Set(courses.map(course => course.category).filter(Boolean))].map(category => ({
    title: category,
    count: `${courses.filter(course => course.category === category).length} Courses`,
}));


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/courses`
                );

                setCourses(response.data.courses || []);
            } catch (error) {
                console.log(error.response?.data || error.message);
            }
        };

        fetchCourses();
    }, []);

    const instructors = [
        {
            name: "Maria Doe",
            role: "Web Developer",
            image: "https://static.vecteezy.com/system/resources/thumbnails/059/888/297/small/teacher-engages-students-in-a-warm-classroom-setting-during-a-lesson-on-a-sunny-afternoon-photo.jpeg",
        },
        {
            name: "Sarah Smith",
            role: "Graphic Designer",
            image: "https://img.magnific.com/premium-photo/happy-teacher-outdoors-elementary-school-portrait_653449-35632.jpg?semt=ais_hybrid&w=740&q=80",
        },
        {
            name: "Maya Wilson",
            role: "Digital Marketer",
            image: "https://t4.ftcdn.net/jpg/09/55/17/31/360_F_955173103_9R1yVuPxukYKo6SumB2JxjyxJeCZPodn.jpg",
        },
        {
            name: "Emily Brown",
            role: "UI/UX Designer",
            image: "https://static.vecteezy.com/system/resources/thumbnails/048/764/596/small/confident-middle-eastern-female-school-teacher-smiling-in-classroom-setting-for-educational-and-diversity-promotion-photo.jpg",
        },
    ];



    const features = [
        {
            icon: FaUserTie,
            title: "Skilled Instructors",
            text: "Learn from experienced professionals.",
        },
        {
            icon: FaGlobe,
            title: "Online Classes",
            text: "Learn anytime and anywhere.",
        },
        {
            icon: FaAward,
            title: "International Certificate",
            text: "Earn certificates after completing courses.",
        },
        {
            icon: FaBook,
            title: "Online Assessment",
            text: "Test your knowledge with online assessments.",
        },
    ];

    return (
        <div className="bg-white text-gray-800">

            {/* HERO */}
            <section className="relative min-h-162.5 overflow-hidden">

                <img
                    src="https://media.gettyimages.com/id/2026162051/photo/portrait-of-a-young-latin-female-student-using-laptop-on-the-bench-on-campus.jpg?s=612x612&w=0&k=20&c=GBwXkFS8HIS964_IMJozrsW_r1LGspQnGT-5A4DZXbI="
                    alt="Online Learning"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/55"></div>

                <div className="relative z-10 mx-auto flex min-h-162.5 max-w-7xl items-center px-6 py-20 lg:px-10">

                    <div className="max-w-3xl text-white">

                        <p className="mb-5 text-sm font-bold uppercase tracking-[4px]">
                            Best Online Courses
                        </p>

                        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                            The Best Online Learning Platform
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">
                            Learn new skills from expert instructors and build your
                            future with our online learning platform.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">

                            <button
                                onClick={() => navigate("/courses")}
                                className="bg-[#06a7d9] px-8 py-4 font-semibold text-white transition hover:bg-[#078eb7]"
                            >
                                Read More
                            </button>

                            <button
                                onClick={() => navigate("/register")}
                                className="bg-[#06a7d9] px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-gray-900"
                            >
                                Enroll Now
                            </button>

                        </div>

                  
                    </div>

                </div>
            </section>


            {/* FEATURES */}
            <section className="bg-white py-20">

                <div className="mx-auto max-w-7xl px-6 lg:px-10">

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                        {features.map((item) => {

                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="group border border-gray-100 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                                >

                                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center bg-[#e8f8fc] text-3xl text-[#06a7d9] transition group-hover:bg-[#06a7d9] group-hover:text-white">

                                        <Icon />

                                    </div>

                                    <h3 className="text-xl font-bold">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-gray-500">
                                        {item.text}
                                    </p>

                                </div>
                            );
                        })}

                    </div>

                </div>

            </section>


            {/* ABOUT */}
            <section className="bg-gray-50 py-20">

                <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">

                    <div className="relative">

                        <img
                            src="https://t3.ftcdn.net/jpg/09/51/89/30/360_F_951893069_Cro8fc7cZj1ha9KyJZibgZ8TCPEGk09W.jpg"
                            alt="About E Learning"
                            className="h-125 w-full object-cover"
                        />

                        <div className="absolute bottom-0 left-0 bg-[#06a7d9] px-8 py-6 text-white">

                            <p className="text-3xl font-bold">
                                100+
                            </p>

                            <p className="text-sm">
                                Online Courses
                            </p>

                        </div>

                    </div>

                    <div>

                        <p className="font-bold uppercase tracking-[3px] text-[#06a7d9]">
                            About Us
                        </p>

                        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Get Educated Online From Your Home
                        </h2>

                        <p className="mt-6 leading-7 text-gray-500">
                            Our e-learning platform provides high-quality
                            online courses designed to help students and
                            professionals develop useful skills.
                        </p>

                        <p className="mt-4 leading-7 text-gray-500">
                            Learn from experienced instructors, study at your
                            own pace and track your learning progress from
                            anywhere.
                        </p>

                        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">

                            {[
                                
                                "Expert Instructors",
                                "Online Classes",
                                "International Certificate",
                                "Skill Development",
                            ].map((item) => (

                                <div
                                    key={item}
                                    className="flex items-center gap-3"
                                >

                                    <FaCheckCircle className="text-[#06a7d9]" />

                                    <span className="text-sm font-medium">
                                        {item}
                                    </span>

                                </div>

                            ))}

                        </div>

                        <button
                            onClick={() => navigate("/about")}
                            className="mt-8 bg-[#06a7d9] px-8 py-3 font-semibold text-white transition hover:bg-[#078eb7]"
                        >
                            Read More
                        </button>

                    </div>

                </div>

            </section>


            {/* CATEGORIES */}
        {/* CATEGORIES */}
<section className="py-20">

    <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div className="mx-auto mb-12 max-w-2xl text-center">

            <p className="font-bold uppercase tracking-[3px] text-[#06a7d9]">
                Categories
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Courses Categories
            </h2>

            <p className="mt-4 text-gray-500">
                Explore courses from different categories and
                develop the skills you need for your future.
            </p>

        </div>

       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

    {categories.map((category) => {

        const categoryCourse = courses.find(
            course => course.category === category.title
        );

        return (
            <div
                key={category.title}
                onClick={() => navigate(`/courses?category=${encodeURIComponent(category.title)}`)}
                className="group cursor-pointer overflow-hidden bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

                <div className="relative h-52 overflow-hidden bg-gray-200">

                    {categoryCourse?.thumbnail ? (
                        <img
                            src={categoryCourse.thumbnail}
                            alt={category.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-gray-400">
                            No Image
                        </div>
                    )}

                    <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/40"></div>

                </div>

                <div className="p-6">

                    <h3 className="text-xl font-bold text-gray-900">
                        {category.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                        {category.count}
                    </p>

                </div>

            </div>
        );
    })}

</div>

    </div>

</section>

            {/* COURSES */}
            <section className="bg-gray-50 py-20">

                <div className="mx-auto max-w-7xl px-6 lg:px-10">

                    <div className="mb-12 text-center">

                        <p className="font-bold uppercase tracking-[3px] text-[#06a7d9]">
                            Courses
                        </p>

                        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Popular Courses
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                            Choose from our latest courses and start learning
                            new skills today.
                        </p>

                    </div>

                    {courses.length === 0 ? (

                        <div className="py-10 text-center text-gray-500">
                            No courses available.
                        </div>

                    ) : (

                        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

                            {courses.slice(0, 6).map((course) => (

                                <div
                                    key={course._id}
                                    className="group overflow-hidden bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                                >

                                    <div className="relative h-56 overflow-hidden bg-gray-200">

                                        {course.thumbnail ? (

                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />

                                        ) : (

                                            <div className="flex h-full items-center justify-center text-gray-400">
                                                No Image
                                            </div>

                                        )}

                                        <div className="absolute left-4 top-4 bg-[#06a7d9] px-3 py-1 text-xs font-semibold text-white">
                                            {course.level}
                                        </div>

                                    </div>

                                    <div className="p-6">

                                        <div className="flex items-center justify-between">

                                            <span className="text-sm font-semibold text-[#06a7d9]">
                                                {course.category}
                                            </span>

                                            <span className="text-sm text-gray-500">
                                                {course.duration || "Online"}
                                            </span>

                                        </div>

                                        <h3 className="mt-3 line-clamp-2 text-xl font-bold text-gray-900">
                                            {course.title}
                                        </h3>

                                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
                                            {course.description}
                                        </p>

                                        <div className="mt-5 flex items-center justify-between border-t pt-4">

                                            <div className="flex items-center">

                                                <span className="text-yellow-500">
                                                    ★
                                                </span>

                                                <span className="ml-1 text-sm">
                                                    {course.averageRating || 0}
                                                </span>

                                            </div>

                                            <span className="font-bold text-gray-900">
                                                {course.price === 0
                                                    ? "Free"
                                                    : `Rs. ${course.price}`}
                                            </span>

                                        </div>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/courses/${course._id}`
                                                )
                                            }
                                            className="mt-5 w-full bg-[#06a7d9] py-3 font-semibold text-white transition hover:bg-[#078eb7]"
                                        >
                                            View Course
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                    <div className="mt-12 text-center">

                        <button
                            onClick={() => navigate("/courses")}
                            className="border-2 border-[#06a7d9] px-8 py-3 font-semibold text-[#06a7d9] transition hover:bg-[#06a7d9] hover:text-white"
                        >
                            View All Courses
                        </button>

                    </div>

                </div>

            </section>


         


            {/* INSTRUCTORS */}
            <section className="py-20">

                <div className="mx-auto max-w-7xl px-6 lg:px-10">

                    <div className="mb-12 text-center">

                        <p className="font-bold uppercase tracking-[3px] text-[#06a7d9]">
                            Instructors
                        </p>

                        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Expert Instructors
                        </h2>

                    </div>

                    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

                        {instructors.map((instructor) => (

                            <div
                                key={instructor.name}
                                className="group overflow-hidden bg-white text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >

                                <div className="overflow-hidden">

                                    <img
                                        src={instructor.image}
                                        alt={instructor.name}
                                        className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                                    />

                                </div>

                                <div className="p-5">

                                    <h3 className="text-lg font-bold">
                                        {instructor.name}
                                    </h3>

                                    <p className="mt-1 text-sm text-[#06a7d9]">
                                        {instructor.role}
                                    </p>

                                    <div className="mt-4 flex justify-center gap-4 text-gray-400">

                                        <FaFacebookF className="cursor-pointer transition hover:text-[#06a7d9]" />

                                        <FaTwitter className="cursor-pointer transition hover:text-[#06a7d9]" />

                                        <FaLinkedinIn className="cursor-pointer transition hover:text-[#06a7d9]" />

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


    
            {/* NEWSLETTER */}

        </div>
    );
};

export default Home;
