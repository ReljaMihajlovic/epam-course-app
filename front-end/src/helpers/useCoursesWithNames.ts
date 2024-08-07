import { useSelector } from "react-redux";
import { RootState } from "../store/store.types";

const useCoursesWithNames = () => {
    const courses = useSelector((state: RootState) => state.courses);
    const authors = useSelector((state: RootState) => state.authors);

    const coursesWithAuthorNames = courses.map((course) => {
        const authorNames = course.authors.map((authorId) => {
            const author = authors.find((author) => author.id === authorId);
            return author ? author.name : "";
        });
        return { ...course, authors: authorNames };
    });

    return coursesWithAuthorNames;
};

export default useCoursesWithNames;
