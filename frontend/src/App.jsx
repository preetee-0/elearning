
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import Learning from "./pages/Learning";
import StudentDashboard from "./pages/StudentDashboard";
import CourseDetails from "./pages/CourseDetails";
import CreateCourse from "./pages/CreateCourse";
import InstructorDashboard from "./pages/InstructorDashboard";
import Home from "./components/Home";
import EditCourse from "./pages/EditCourses";
import ProtectedInstructorRoute from "./components/ProtectedInstructorRoute";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OAuthSuccess from "./pages/OAuthSuccess";
import Footer from "./pages/Footer";
import Testimonials from "./pages/Testimonials";
import Teams from "./pages/Teams";
import Feedback from "./pages/Feedback";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
    path="/about"
    element={<About />}
/>
                <Route
                    path="/contact"
                    element={<Contact />}
                />
                <Route
    path="/oauth-success"
    element={<OAuthSuccess />}
/>

                <Route
                    path="/student/dashboard"
                    element={<StudentDashboard />}
                />

                <Route
                    path="/courses"
                    element={<Courses />}
                />

                <Route
                    path="/courses/:id"
                    element={<CourseDetails />}
                />

                <Route
                    path="/courses/:id/learn"
                    element={<Learning />}
                />

                <Route
                    path="/instructor/dashboard"
                    element={
                        <ProtectedInstructorRoute>
                            <InstructorDashboard />
                        </ProtectedInstructorRoute>
                    }
                />

                <Route
                    path="/instructor/create-course"
                    element={
                        <ProtectedInstructorRoute>
                            <CreateCourse />
                        </ProtectedInstructorRoute>
                    }
                />

                <Route
                    path="/instructor/edit-course/:id"
                    element={
                        <ProtectedInstructorRoute>
                            <EditCourse />
                        </ProtectedInstructorRoute>
                    }
                />
                                <Route path="/testimonials" element={<Testimonials />}/>
                                 <Route path="/teams" element={<Teams />}/>
                                 <Route path="/feedback" element={<Feedback />} />
            </Routes>
            
           
              <Footer />
        </BrowserRouter>
      
    );
}

export default App;
