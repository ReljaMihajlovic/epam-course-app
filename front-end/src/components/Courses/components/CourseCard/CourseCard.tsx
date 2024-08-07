import React from "react";
import styles from "./CourseCard.module.css";
import Button from "../../../../common/Button/Button";
import { CourseProps } from "../../Courses.types";
import IconTrash from "../../../../common/Icons/IconTrash";
import IconPencil from "../../../../common/Icons/IconPencil";
import { getCourseDuration } from "../../../../helpers/getCourseDuration";
import { formatDate } from "../../../../helpers/formatCreationDate";
import { Link } from "react-router-dom";
import useIsAdmin from "../../../../helpers/useIsAdmin";
import { useDispatch } from "../../../../helpers/useDispatch";
import { deleteCourseThunk } from "../../../../store/courses/thunk";
import useUserToken from "../../../../helpers/useUserToken";

const CourseCard: React.FC<CourseProps> = ({ course }) => {
    const dispatch = useDispatch();
    const token = useUserToken();
    const isAdmin = useIsAdmin();
    const formattedDuration = getCourseDuration(course.duration);
    const formattedCreation = formatDate(course.creationDate);
    const handleCourseDelete = (id: string) => {
        dispatch(deleteCourseThunk(id, token));
    }
    return (
        <article className={styles.card}>
            <h1 className={styles.title}>{course.title}</h1>
            <div className={styles.body}>
                <p className={styles.description}>{course.description}</p>
                <div className={styles.info}>
                    <ul>
                        <li className={styles.authors}>
                            <b>Authors:</b> {course.authors.join(", ")}
                        </li>
                        <li>
                            <b>Duration:</b> {formattedDuration}
                        </li>
                        <li>
                            <b>Created:</b> {formattedCreation}
                        </li>
                    </ul>
                    <div className={styles.options}>
                        <Link to={`${course.id}`}>
                            <Button buttonText="Show course" />
                        </Link>
                        {isAdmin && (
                            <>
                                <Button
                                    icon={IconTrash}
                                    onClick={() =>
                                        handleCourseDelete(course.id)
                                    }
                                />
                                <Link to={`update/${course.id}`}>
                                    <Button icon={IconPencil} />
                                </Link>
                                
                            </>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default CourseCard;
