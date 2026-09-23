import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const completeLesson = async (
    lessonId,
    courseId,
    token
) => {
    const response = await axios.patch(
        `${API_URL}/progress/lesson/${lessonId}`,
        {
            courseId
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const getCourseProgress = async (
    courseId,
    token
) => {
    const response = await axios.get(
        `${API_URL}/progress/course/${courseId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};