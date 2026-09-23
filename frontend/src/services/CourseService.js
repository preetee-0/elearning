
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCourses = async () => {
    const response = await axios.get(
        `${API_URL}/courses`
    );

    return response.data;
};

export const getCourseById = async (courseId) => {
    const response = await axios.get(
        `${API_URL}/courses/${courseId}`
    );

    return response.data;
};

export const getMyEnrollments = async (token) => {
    const response = await axios.get(
        `${API_URL}/enrollments/my`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const enrollCourse = async (courseId, token) => {
    const response = await axios.post(
        `${API_URL}/enrollments`,
        { course: courseId },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};