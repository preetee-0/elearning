const Enrollment = require("../models/Enrollment");
const QuizAttempt = require("../models/QuizAttempt");

const getStudentDashboard = async (req, res) => {
    try {
        const studentId = req.user.id;

        const enrollments = await Enrollment.find({
            student: studentId
        })
            .populate(
                "course",
                "title category thumbnail level duration"
            )
            .sort({ createdAt: -1 });

        const validEnrollments = enrollments.filter(
            (enrollment) => enrollment.course
        );

        const quizAttempts = await QuizAttempt.find({
            student: studentId
        })
            .populate("quiz", "title passingScore")
            .sort({ createdAt: -1 });

        const totalCourses = validEnrollments.length;

        const completedCourses = validEnrollments.filter(
            (enrollment) => enrollment.completed
        ).length;

        const learningCourses = validEnrollments.filter(
            (enrollment) => !enrollment.completed
        ).length;

        const overallProgress =
            totalCourses > 0
                ? Math.round(
                      validEnrollments.reduce(
                          (total, enrollment) =>
                              total + enrollment.progress,
                          0
                      ) / totalCourses
                  )
                : 0;

        const courses = validEnrollments.map(
            (enrollment) => ({
                enrollmentId: enrollment._id,
                course: enrollment.course,
                progress: enrollment.progress,
                completed: enrollment.completed,
                completedLessons:
                    enrollment.completedLessons.length,
                enrolledAt: enrollment.enrolledAt,
                completedAt: enrollment.completedAt
            })
        );

        res.status(200).json({
            success: true,
            dashboard: {
                totalCourses,
                learningCourses,
                completedCourses,
                overallProgress,
                courses,
                quizAttempts
            }
        });
    } catch (error) {
        console.log(
            "STUDENT DASHBOARD ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getStudentDashboard
}