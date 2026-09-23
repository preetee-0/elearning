
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: "bi-person-workspace",
            title: "Skilled Instructors",
            text: "Learn from experienced instructors who provide practical and easy-to-understand lessons."
        },
        {
            icon: "bi-globe2",
            title: "Online Classes",
            text: "Access your courses anytime and learn at your own pace from anywhere."
        },
        {
            icon: "bi-award",
            title: "Certificates",
            text: "Complete your courses and receive certificates to showcase your achievements."
        },
        {
            icon: "bi-book",
            title: "Online Assessment",
            text: "Test your knowledge and track your learning through assessments and quizzes."
        }
    ];

    return (
        <div className="bg-white">

            {/* Page Header */}

            <section className="relative bg-[#181d38] py-24">

                <div className="absolute inset-0 bg-[#06a7d9]/10"></div>

                <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-10">

                    <p className="font-semibold uppercase tracking-[3px] text-[#06a7d9]">
                        About Us
                    </p>

                    <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">
                        About E-Learning
                    </h1>

                    <div className="mt-5 flex items-center justify-center gap-3 text-sm text-gray-300">
                        <button
                            onClick={() => navigate("/")}
                            className="hover:text-[#06a7d9]"
                        >
                            Home
                        </button>

                        <span>/</span>

                        <span className="text-[#06a7d9]">
                            About
                        </span>
                    </div>

                </div>

            </section>


            {/* About Section */}

            <section className="py-20">

                <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">

                    <div className="relative">

                        <img
                            src="https://img.freepik.com/free-photo/teacher-giving-online-class_23-2149170361.jpg"
                            alt="Online Learning"
                            className="h-125 w-full object-cover"
                        />

                        <div className="absolute bottom-0 left-0 bg-[#06a7d9] px-8 py-6 text-white">

                            <p className="text-4xl font-extrabold">
                                100+
                            </p>

                            <p className="mt-1 font-medium">
                                Online Courses
                            </p>

                        </div>

                    </div>


                    <div>

                        <p className="font-bold uppercase tracking-widest text-[#06a7d9]">
                            About Us
                        </p>

                        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                            Get Educated Online From Your Home
                        </h2>

                        <p className="mt-6 leading-7 text-gray-500">
                            E-Learning is an online learning platform designed
                            to help students and professionals gain useful
                            knowledge and practical skills.
                        </p>

                        <p className="mt-4 leading-7 text-gray-500">
                            Our platform provides structured courses,
                            experienced instructors and flexible learning
                            opportunities so that you can learn whenever
                            and wherever you want.
                        </p>

                        <div className="mt-7 grid gap-4 sm:grid-cols-2">

                            {[
                                "Expert Instructors",
                                "Flexible Learning",
                                "Practical Courses",
                                "Learning Progress",
                                "Online Assessments",
                                "Course Certificates"
                            ].map((item) => (

                                <div
                                    key={item}
                                    className="flex items-center gap-3"
                                >

                                    <i className="bi bi-check-circle-fill text-[#06a7d9]"></i>

                                    <span className="text-sm font-medium text-gray-700">
                                        {item}
                                    </span>

                                </div>

                            ))}

                        </div>

                        <button
                            onClick={() => navigate("/courses")}
                            className="mt-8 bg-[#06a7d9] px-7 py-3 font-semibold text-white transition hover:bg-[#078eb7]"
                        >
                            Explore Courses
                        </button>

                    </div>

                </div>

            </section>


            {/* Features */}

            <section className="bg-gray-50 py-20">

                <div className="mx-auto max-w-7xl px-6 lg:px-10">

                    <div className="mx-auto mb-12 max-w-2xl text-center">

                        <p className="font-bold uppercase tracking-widest text-[#06a7d9]">
                            Why Choose Us
                        </p>

                        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Learn Better With E-Learning
                        </h2>

                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                        {features.map((feature) => (

                            <div
                                key={feature.title}
                                className="bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                            >

                                <div className="mx-auto flex h-16 w-16 items-center justify-center bg-[#e8f8fc] text-3xl text-[#06a7d9]">
                                    <i className={`bi ${feature.icon}`}></i>
                                </div>

                                <h3 className="mt-5 text-xl font-bold text-gray-900">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-gray-500">
                                    {feature.text}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* Statistics */}

            <section className="bg-[#06a7d9] py-16">

                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 text-center text-white lg:grid-cols-4 lg:px-10">

                    <div>
                        <h3 className="text-4xl font-extrabold">
                            100+
                        </h3>

                        <p className="mt-2 text-white/80">
                            Courses
                        </p>
                    </div>

                    <div>
                        <h3 className="text-4xl font-extrabold">
                            50+
                        </h3>

                        <p className="mt-2 text-white/80">
                            Expert Instructors
                        </p>
                    </div>

                    <div>
                        <h3 className="text-4xl font-extrabold">
                            1K+
                        </h3>

                        <p className="mt-2 text-white/80">
                            Happy Students
                        </p>
                    </div>

                    <div>
                        <h3 className="text-4xl font-extrabold">
                            500+
                        </h3>

                        <p className="mt-2 text-white/80">
                            Certificates
                        </p>
                    </div>

                </div>

            </section>


            {/* CTA */}

            <section className="py-20">

                <div className="mx-auto max-w-4xl px-6 text-center">

                    <p className="font-bold uppercase tracking-widest text-[#06a7d9]">
                        Start Learning
                    </p>

                    <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Start Learning Today
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-500">
                        Explore our courses, learn new skills and take
                        the next step toward your goals.
                    </p>

                    <button
                        onClick={() => navigate("/courses")}
                        className="mt-8 bg-[#06a7d9] px-8 py-3 font-semibold text-white transition hover:bg-[#078eb7]"
                    >
                        Explore Courses
                    </button>

                </div>

            </section>

        </div>
    );
};

export default About;
