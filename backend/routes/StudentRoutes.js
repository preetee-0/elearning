const express = require("express");

const {
    getStudentDashboard
} = require("../controllers/StudentController");

const { protect } = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
    "/dashboard",
    protect,
    roleMiddleware("student"),
    getStudentDashboard
);

module.exports = router;