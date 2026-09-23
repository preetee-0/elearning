const Section = require("../models/Section");
const Course = require("../models/Course");

const createSection = async (req, res) => {
    try {
        const { title, course, order } = req.body;

        if (!title || !course) {
            return res.status(400).json({
                success: false,
                message: "Title and course are required"
            });
        }

        const existingCourse = await Course.findById(course);

        if (!existingCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (existingCourse.instructor.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only add sections to your own course"
            });
        }

        const section = await Section.create({
            title,
            course,
            order: order || 0
        });

        res.status(201).json({
            success: true,
            message: "Section created successfully",
            section
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getSectionsByCourse = async (req, res) => {
    try {
        const sections = await Section.find({
            course: req.params.courseId
        }).sort({ order: 1 });

        res.status(200).json({
            success: true,
            count: sections.length,
            sections
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getSectionById = async (req, res) => {
    try {
        const section = await Section.findById(req.params.id);

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }

        res.status(200).json({
            success: true,
            section
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateSection = async (req, res) => {
    try {
        const section = await Section.findById(req.params.id);

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
                message: "You can only update your own section"
            });
        }

        const updatedSection = await Section.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Section updated successfully",
            section: updatedSection
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteSection = async (req, res) => {
    try {
        const section = await Section.findById(req.params.id);

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
                message: "You can only delete your own section"
            });
        }

        await Section.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Section deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createSection,
    getSectionsByCourse,
    getSectionById,
    updateSection,
    deleteSection
};