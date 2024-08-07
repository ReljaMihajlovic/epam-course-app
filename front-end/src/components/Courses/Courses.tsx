import CourseCard from "./components/CourseCard/CourseCard";
import styles from "./Courses.module.css";
import Button from "../../common/Button/Button";
import React from "react";
import useCoursesWithNames from "../../helpers/useCoursesWithNames";
import { Link } from "react-router-dom";
import useIsAdmin from "../../helpers/useIsAdmin";

const Courses = () => {
    const coursesWithAuthorNames = useCoursesWithNames();
    const isAdmin = useIsAdmin();
    return (
        <section className={`${styles.courses} container`}>
            {isAdmin && (
                <Link to="/courses/add" className={styles.button}>
                    <Button buttonText="Add New Course" />
                </Link>
            )}
            {coursesWithAuthorNames.map((course) => (
                <CourseCard
                    key={course.id}
                    course={course}
                />
            ))}
        </section>
    );
};

export default Courses;
