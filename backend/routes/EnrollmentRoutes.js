const express = require("express");

const {
    enrollCourse,
    getMyEnrollments,
    getEnrollmentByCourse,
    getCourseStudents,
    unenrollCourse
} = require("../controllers/EnrollmentController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    enrollCourse
);

router.get(
    "/my",
    protect,
    getMyEnrollments
);

router.get(
    "/course/:courseId",
    protect,
    getEnrollmentByCourse
);

router.get(
    "/course/:courseId/students",
    protect,
    getCourseStudents
);

router.delete(
    "/course/:courseId",
    protect,
    unenrollCourse
);

module.exports = router;