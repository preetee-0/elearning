const Lesson = require("../models/Lesson");
const Section = require("../models/Section");
const Course = require("../models/Course");

const createLesson = async (req, res) => {
    try {
        const {
            title,
            description,
            section,
            videoUrl,
            duration,
            order,
            isFree
        } = req.body;

        if (!title || !section) {
            return res.status(400).json({
                success: false,
                message: "Title and section are required"
            });
        }

        const existingSection = await Section.findById(section);

        if (!existingSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }

        const course = await Course.findById(existingSection.course);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only add lessons to your own course"
            });
        }

        const lesson = await Lesson.create({
            title,
            description: description || "",
            section,
            videoUrl: videoUrl || "",
            duration: duration || "",
            order: order || 0,
            isFree: isFree || false
        });

        res.status(201).json({
            success: true,
            message: "Lesson created successfully",
            lesson
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getLessonsBySection = async (req, res) => {
    try {
        const lessons = await Lesson.find({
            section: req.params.sectionId
        }).sort({ order: 1 });

        res.status(200).json({
            success: true,
            count: lessons.length,
            lessons
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }

        res.status(200).json({
            success: true,
            lesson
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }

        const section = await Section.findById(lesson.section);

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }

        const course = await Course.findById(section.course);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own lesson"
            });
        }

        const updatedLesson = await Lesson.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Lesson updated successfully",
            lesson: updatedLesson
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }

        const section = await Section.findById(lesson.section);

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }

        const course = await Course.findById(section.course);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (course.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own lesson"
            });
        }

        await Lesson.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Lesson deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createLesson,
    getLessonsBySection,
    getLessonById,
    updateLesson,
    deleteLesson
};