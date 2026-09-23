const express = require("express");

const {
    createLesson,
    getLessonsBySection,
    getLessonById,
    updateLesson,
    deleteLesson
} = require("../controllers/LessonController");

const { protect } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    roleMiddleware("instructor"),
    createLesson
);

router.get(
    "/section/:sectionId",
    getLessonsBySection
);

router.get(
    "/:id",
    getLessonById
);

router.patch(
    "/:id",
    protect,
    roleMiddleware("instructor"),
    updateLesson
);

router.delete(
    "/:id",
    protect,
    roleMiddleware("instructor"),
    deleteLesson
);

module.exports = router;