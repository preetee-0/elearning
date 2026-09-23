require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8"]);

const express = require("express");
const cors = require("cors");

const ContactRoutes = require("./routes/ContactRoutes");
const connectDB = require("./config/db");

const UserRoutes = require("./routes/UserRoutes");
const CourseRoutes = require("./routes/CourseRoutes");
const SectionRoutes = require("./routes/SectionRoutes");
const LessonRoutes = require("./routes/LessonRoutes");
const ProgressRoutes = require("./routes/ProgressRoutes");
const QuizRoutes = require("./routes/QuizRoutes");
const QuizAttemptRoutes = require("./routes/QuizAttemptRoutes");
const ReviewRoutes = require("./routes/ReviewRoutes");
const EnrollmentRoutes = require("./routes/EnrollmentRoutes");
const StudentRoutes = require("./routes/StudentRoutes");
const FeedbackRoutes = require("./routes/FeedbackRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", UserRoutes);
app.use("/api/courses", CourseRoutes);
app.use("/api/sections", SectionRoutes);
app.use("/api/progress", ProgressRoutes);
app.use("/api/enrollments", EnrollmentRoutes);
app.use("/api/lessons", LessonRoutes);
app.use("/api/quizzes", QuizRoutes);
app.use("/api/quiz-attempts", QuizAttemptRoutes);
app.use("/api/reviews", ReviewRoutes);
app.use("/api/feedback", FeedbackRoutes);
app.use("/api/student", StudentRoutes);
app.use("/api/contact", ContactRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "E-Learning Backend is running"
  });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });