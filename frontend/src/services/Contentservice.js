
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getSectionsByCourse = async (courseId) => {
    const response = await axios.get(
        `${API_URL}/sections/course/${courseId}`
    );

    return response.data;
};

export const getLessonsBySection = async (sectionId) => {
    const response = await axios.get(
        `${API_URL}/lessons/section/${sectionId}`
    );

    return response.data;
};