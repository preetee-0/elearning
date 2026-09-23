const express = require("express");

const {
    registerUser,
    loginUser
} = require("../controllers/UserController");

const {
    googleLogin,
    googleCallback,
    githubLogin,
    githubCallback
} = require("../controllers/OAuthController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

// Google
router.get("/google", googleLogin);

router.get(
    "/google/callback",
    googleCallback
);

// GitHub
router.get("/github", githubLogin);

router.get(
    "/github/callback",
    githubCallback
);

router.get("/profile", protect, (req, res) => {
    res.json({
        success: true,
        message: "You can access this protected route",
        user: req.user
    });
});

module.exports = router;