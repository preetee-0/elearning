import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getStudentDashboard = async (token) => {
    const response = await axios.get(
        `${API_URL}/student/dashboard`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};