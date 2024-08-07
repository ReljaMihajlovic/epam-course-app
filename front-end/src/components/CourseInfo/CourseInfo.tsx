import React from "react";
import styles from "./CourseInfo.module.css";
import Button from "../../common/Button/Button";
import { getCourseDuration } from "../../helpers/getCourseDuration";
import { formatDate } from "../../helpers/formatCreationDate";
import { useParams } from "react-router-dom";
import { CourseInfoProps } from "./CourseInfo.types";
import { Course } from "../Courses/Courses.types";
import { Link } from "react-router-dom";

const CourseInfo: React.FC<CourseInfoProps> = ({ courses }) => {
    const { courseId } = useParams();
    const course: Course | undefined = courses.find(
        (course) => course.id === courseId
    );

    if (!course) {
        return (
            <section className={`${styles.course} container`}>
                <h1 className={styles.error}>Course not found!</h1>
            </section>
        );
    }

    const formattedDuration = getCourseDuration(course.duration);
    const formattedCreationDate = formatDate(course.creationDate);

    return (
        <section className={`${styles.course} container`}>
            <h1 className={styles.title}>{course.title}</h1>
            <article className={styles.card}>
                <div className={styles.description}>
                    <h2 className={styles.descriptionLabel}>
                        <b>Description:</b>
                    </h2>
                    <p>{course.description}</p>
                </div>
                <ul className={styles.info}>
                    <li>
                        <b className={styles.listItem}>ID:</b> {course.id}
                    </li>
                    <li>
                        <b className={styles.listItem}>Duration:</b>{" "}
                        {formattedDuration}
                    </li>
                    <li>
                        <b className={styles.listItem}>Created:</b>{" "}
                        {formattedCreationDate}
                    </li>
                    <li>
                        <b className={styles.listItem}>Authors:</b>{" "}
                        {course.authors.join(", ")}
                    </li>
                </ul>
            </article>
            <Link to="/courses" className={styles.button}>
                <Button buttonText="Back" />
            </Link>
        </section>
    );
};

export default CourseInfo;
