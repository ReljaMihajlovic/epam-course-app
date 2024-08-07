import Button from "../../common/Button/Button";
import styles from "./EmptyCourseList.module.css";
import { Link } from "react-router-dom";
import useIsAdmin from "../../helpers/useIsAdmin";
const EmptyCourseList = () => {
    const isAdmin = useIsAdmin();
    return (
      <section className={`${styles.list} container`}>
        {isAdmin ? (
          <>
            <h1 className={styles.title}>Course List is Empty</h1>
            <h2 className={styles.subtitle}>
              Please use "Add New Course" button to add your first course
            </h2>
            <Link to="/courses/add" className={styles.button}>
              <Button buttonText="Add New Course" />
            </Link>
          </>
        ) : (
          <p className={styles.button}>
            You don't have permissions to create a course. Please log in as
            ADMIN
          </p>
        )}
      </section>
    );
};
export default EmptyCourseList;
