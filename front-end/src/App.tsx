import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import { Course } from "./components/Courses/Courses.types";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import Registration from "./components/Entry/Registration";
import Login from "./components/Entry/Login";
import CourseForm from "./components/CourseForm/CourseForm";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "./helpers/useDispatch";
import useCoursesWithNames from "./helpers/useCoursesWithNames";
import { fetchAllCourses } from "./store/courses/thunk";
import { fetchAllAuthors } from "./store/authors/thunk";
import { getUser } from "./store/user/thunk";
import { useSelector } from "react-redux";
import { RootState } from "./store/store.types";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import EmptyCourseList from "./components/EmptyCourseList/EmptyCourseList";

function App() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const coursesWithAuthorNames = useCoursesWithNames();
    useEffect(() => {
        dispatch(fetchAllCourses());
        dispatch(fetchAllAuthors());
    }, []);
    useEffect(() => {
        if (user.token) {
            dispatch(getUser(user.token));
            navigate("/courses");
        }else{
            navigate("/login");
        }
    }, []);
    return (
      <div className="site">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/courses">
              <Route
                index
                element={
                  coursesWithAuthorNames.length > 0 ? (
                    <Courses />
                  ) : (
                    <EmptyCourseList />
                  )
                }
              />
              <Route
                path="update/:courseId"
                element={<PrivateRoute Component={CourseForm} />}
              />
              <Route
                path=":courseId"
                element={<CourseInfo courses={coursesWithAuthorNames} />}
              />
              <Route
                path="add"
                element={<PrivateRoute Component={CourseForm} />}
              />
            </Route>
          </Routes>
        </main>
        <footer className="footer"></footer>
      </div>
    );
}

export default App;
