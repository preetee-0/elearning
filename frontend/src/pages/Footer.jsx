import React from 'react'

const Footer = () => {
  return (
   <>
      {/* FOOTER */}
            <footer className="bg-gray-900 py-16 text-gray-300">
                <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
                    <div>
                        <h3 className="mb-5 text-lg font-bold text-white">
                            Quick Link
                        </h3>

                        <div className="space-y-3 text-sm">
                            <button
                                onClick={() => navigate("/")}
                                className="block transition hover:text-[#06a7d9]"
                            >
                                Home
                            </button>

                            <button
                                onClick={() => navigate("/about")}
                                className="block transition hover:text-[#06a7d9]"
                            >
                                About
                            </button>

                            <button
                                onClick={() => navigate("/courses")}
                                className="block transition hover:text-[#06a7d9]"
                            >
                                Courses
                            </button>

                            <button
                                onClick={() => navigate("/contact")}
                                className="block transition hover:text-[#06a7d9]"
                            >
                                Contact
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-5 text-lg font-bold text-white">
                            Contact
                        </h3>

                        <div className="space-y-3 text-sm">
                            <p>Kathmandu, Nepal</p>
                            <p>+0977 9813066122</p>
                            <p>preetipaudel.0@gmail.com</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-5 text-lg font-bold text-white">
                            Gallery
                        </h3>

                        <div className="grid grid-cols-3 gap-2">
                            {[
                                "https://e-learning-six-iota.vercel.app/img/course-1.jpg",
                                "https://img.magnific.com/free-photo/front-view-teacher-with-stack-books_23-2148665916.jpg?semt=ais_hybrid&w=740&q=80",
                                "https://e-learning-six-iota.vercel.app/img/course-3.jpg",
                                "https://e-learning-six-iota.vercel.app/img/course-2.jpg",
                                "https://img.magnific.com/free-photo/front-view-teacher-with-stack-books_23-2148665916.jpg?semt=ais_hybrid&w=740&q=80",
                                "https://e-learning-six-iota.vercel.app/img/course-1.jpg",
                            ].map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt="Course"
                                    className="h-20 w-full object-cover"
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-5 text-lg font-bold text-white">
                            Newsletter
                        </h3>

                        <p className="text-sm leading-6">
                            This website is a Final Year project
                            of IT Department , Nepal.
                        </p>

                        <div className="mt-5 flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="min-w-0 flex-1 px-3 py-3 text-gray-800 outline-none"
                            />

                            <button className="bg-[#06a7d9] px-4 text-white">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mx-auto mt-12 max-w-7xl border-t border-gray-700 px-6 pt-6 text-center text-sm lg:px-10">
                    &copy; eLearning, All Right Reserved.
                </div>
            </footer>
            </>
  )
}

export default Footer
