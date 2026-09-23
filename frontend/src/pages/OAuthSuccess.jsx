import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");
        const user = searchParams.get("user");

        if (!token || !user) {
            navigate("/login");
            return;
        }

        try {
            const userData = JSON.parse(
                decodeURIComponent(user)
            );

            localStorage.setItem("token", token);

            localStorage.setItem(
                "user",
                JSON.stringify(userData)
            );

            if (userData.role === "instructor") {
                navigate("/instructor/dashboard");
            } else {
                navigate("/student/dashboard");
            }
        } catch (error) {
            console.log(
                "OAUTH SUCCESS ERROR:",
                error
            );

            navigate("/login");
        }
    }, [navigate, searchParams]);

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">

            <div className="text-center">

                <div className="w-16 h-16 bg-[#06a7d9] rounded-full flex items-center justify-center mx-auto mb-5">
                    <i className="bi bi-check-lg text-white text-3xl"></i>
                </div>

                <h1 className="text-2xl font-bold text-[#181d38]">
                    Login Successful
                </h1>

                <p className="text-gray-500 mt-2">
                    Redirecting you to your dashboard...
                </p>

            </div>

        </div>
    );
};

export default OAuthSuccess;