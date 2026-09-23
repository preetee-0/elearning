const express = require("express");

const {
    createSection,
    getSectionsByCourse,
    getSectionById,
    updateSection,
    deleteSection
} = require("../controllers/SectionController");

const { protect } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    roleMiddleware("instructor"),
    createSection
);

router.get(
    "/course/:courseId",
    getSectionsByCourse
);

router.get(
    "/:id",
    getSectionById
);

router.patch(
    "/:id",
    protect,
    roleMiddleware("instructor"),
    updateSection
);

router.delete(
    "/:id",
    protect,
    roleMiddleware("instructor"),
    deleteSection
);

module.exports = router;