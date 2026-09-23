import { Navigate } from "react-router-dom";

const ProtectedInstructorRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (user?.role !== "instructor") {
        return <Navigate to="/courses" />;
    }

    return children;
};

export default ProtectedInstructorRoute;