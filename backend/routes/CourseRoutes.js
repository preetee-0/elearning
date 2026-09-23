const express = require("express");

const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse, getMyCourses
} = require("../controllers/CourseController");

const { protect } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, roleMiddleware("instructor"), createCourse);
router.get(
    "/my",
    protect,
    roleMiddleware("instructor"),
    getMyCourses
);
router.get("/",getCourses);
router.get("/:id",getCourseById);


router.patch("/:id",protect, roleMiddleware("instructor"),updateCourse);

router.delete("/:id",protect, roleMiddleware("instructor"),deleteCourse);
module.exports = router;