const Progress = require("../models/Progress");
const Section = require("../models/Section");
const Lesson = require("../models/Lesson");
const Enrollment = require("../models/Enrollment");

const calculateProgress = async (courseId, progress) => {
    const sections = await Section.find({
        course: courseId
    }).select("_id");

    const sectionIds = sections.map(
        (section) => section._id
    );

    const totalLessons = await Lesson.countDocuments({
        section: { $in: sectionIds }
    });

    const completedCount =
        progress?.completedLessons?.length || 0;

    if (totalLessons === 0) {
        return 0;
    }

    return Math.round(
        (completedCount / totalLessons) * 100
    );
};

const completeLesson = async (req, res) => {
    try {
        const { lessonId } = req.params;
        const { courseId } = req.body;
        const userId = req.user.id;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required"
            });
        }

        let progress = await Progress.findOne({
            user: userId,
            course: courseId
        });

        if (!progress) {
            progress = await Progress.create({
                user: userId,
                course: courseId,
                completedLessons: [lessonId]
            });
        } else {
            const alreadyCompleted =
                progress.completedLessons.some(
                    (id) =>
                        id.toString() ===
                        lessonId.toString()
                );

            if (!alreadyCompleted) {
                progress.completedLessons.push(lessonId);
                await progress.save();
            }
        }

        const progressPercentage =
            await calculateProgress(
                courseId,
                progress
            );

        await Enrollment.findOneAndUpdate(
            {
                student: userId,
                course: courseId
            },
            {
                progress: progressPercentage,
                completed: progressPercentage === 100,
                completedAt:
                    progressPercentage === 100
                        ? new Date()
                        : null
            }
        );

        res.status(200).json({
            success: true,
            message: "Lesson completed successfully",
            progress: progressPercentage,
            completedLessons:
                progress.completedLessons
        });
    } catch (error) {
        console.log(
            "COMPLETE LESSON ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        const progress = await Progress.findOne({
            user: userId,
            course: courseId
        });

        const progressPercentage =
            await calculateProgress(
                courseId,
                progress
            );

        res.status(200).json({
            success: true,
            progress: progressPercentage,
            completedLessons:
                progress?.completedLessons || []
        });
    } catch (error) {
        console.log(
            "GET PROGRESS ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    completeLesson,
    getProgress
};