import styles from "./CourseForm.module.css";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { useEffect, useState } from "react";
import { getCourseDuration } from "../../helpers/getCourseDuration";
import AuthorItem from "./AuthorItem/AuthorItem";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../helpers/useDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.types";
import { addAuthor, removeAuthor } from "../../store/authors/thunk";
import useUserToken from "../../helpers/useUserToken";
import { createCourse, updateCourseThunk } from "../../store/courses/thunk";
import { useParams } from "react-router-dom";
import { getCourseById } from "../../services";

const CourseForm = () => {
    const { courseId } = useParams();
    const token = useUserToken();
    const authors = useSelector((state: RootState) => state.authors);
    const dispatch = useDispatch();
    const forbiddenSymbols = /[@#$%^&]/;
    const MIN_CH = 2;
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [authorName, setAuthorName] = useState("");
    // const [authors, setAuthors] = useState<Author[]>([]);
    const [duration, setDuration] = useState(0);
    const [durationInHours, setDurationInHours] = useState("");
    const [authorsList, setAuthorsList] = useState<string[]>([]);

    useEffect(() => {
        if (courseId) {
            getCourseById(courseId).then((course) => {
                if (course) {
                    setTitle(course.title);
                    setDescription(course.description);
                    setDuration(course.duration);
                    setAuthorsList(course.authors);
                }
            });
        }
    }, []);

    // Define states for error messages
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [durationError, setDurationError] = useState("");
    const [authorNameError, setAuthorNameError] = useState("");

    const handleTitleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        if (!forbiddenSymbols.test(value)) {
            setTitle(value);
        }
    };
    const handleDurationChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        if (!forbiddenSymbols.test(value)) {
            setDuration(parseInt(value));
            const temp = getCourseDuration(parseInt(value));
            setDurationInHours(temp);
        }
    };
    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        if (!forbiddenSymbols.test(description)) {
            setDescription(value);
        }
    };
    const handleAuthorChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        if (!forbiddenSymbols.test(value)) {
            setAuthorName(value);
        }
    };
    const handleCreateAuthor = () => {
        if (authorName.trim().length >= MIN_CH) {
            dispatch(addAuthor(authorName, token)); // Add author to store
            // setAuthors([...authors, { id: uuid(), name: authorName }]);
            setAuthorNameError("");
            setAuthorName("");
        } else {
            setAuthorNameError("Needs to be at least 2 characters");
        }
    };
    const handleAddAuthor = (id: string) => {
        setAuthorsList([...authorsList, id]);
    };
    const handleRemoveAuthor = (id: string) => {
        const updatedAuthors = authorsList.filter(
            (authorId) => authorId !== id
        );
        setAuthorsList(updatedAuthors);
    };

    // Validation functions
    const validateTitle = (title: string) => {
        if (title.trim() === "") {
            setTitleError("Title is required");
            return false;
        } else if (title.trim().length < MIN_CH) {
            setTitleError("Needs to be at least 2 characters");
            return false;
        }
        setTitleError("");
        return true;
    };
    const validateDescription = (description: string) => {
        if (description.trim() === "") {
            setDescriptionError("Description is required");
            return false;
        } else if (description.trim().length < MIN_CH) {
            setDescriptionError("Needs to be at least 2 characters");
            return false;
        }
        setDescriptionError("");
        return true;
    };
    const validateDuration = (duration: number) => {
        if (!duration) {
            setDurationError("Duration is required");
            return false;
        }
        setDurationError("");
        return true;
    };
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Validate fields
        const isTitleValid = validateTitle(title);
        const isDescriptionValid = validateDescription(description);
        const isDurationValid = validateDuration(duration);

        if (!isTitleValid || !isDescriptionValid || !isDurationValid) {
            return;
        }

        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, "0");
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // January is 0!
        const year = currentDate.getFullYear();

        const formattedDate = `${month}.${day}.${year}`;
        const course = {
            title: title,
            description: description,
            creationDate: formattedDate,
            duration: duration,
            authors: authorsList,
        };

        if(courseId) {
            dispatch(updateCourseThunk(courseId, course, token));
        }else{
            dispatch(createCourse(course, token));
        }
        navigate("/courses");
    };

    const isAuthorAdded = (id: string) => {
        return authorsList.some((authorId) => authorId === id);
    };

    return (
        <form
            className={`container ${styles.wrapper}`}
            onSubmit={handleFormSubmit}>
            <h1>Course edit/create page</h1>
            <div className="form">
                <div className={styles.section}>
                    <h2>Main Info</h2>
                    <Input
                        labelText="Title"
                        errorMsg={titleError}
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <Input
                        type="textarea"
                        labelText="Description"
                        errorMsg={descriptionError}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div className={styles.section}>
                    <h2>Duration</h2>
                    <div className={styles.group}>
                        <Input
                            labelText="Duration"
                            errorMsg={durationError}
                            type="number"
                            value={duration}
                            onChange={handleDurationChange}
                        />
                        <p>{durationInHours}</p>
                    </div>
                </div>
                <div className={styles.authors}>
                    <div className={styles.section}>
                        <h2>Authors</h2>
                        <div className={styles.group}>
                            <Input
                                labelText="Author name"
                                value={authorName}
                                errorMsg={authorNameError}
                                onChange={handleAuthorChange}
                            />
                            <Button
                                buttonText="Create Author"
                                type="button"
                                onClick={handleCreateAuthor}
                            />
                        </div>
                        <div>
                            <h3>Authors List</h3>
                            <div className={styles.authorsWrapper}>
                                {authors.map((author) => {
                                    return (
                                        !isAuthorAdded(author.id) && (
                                            <AuthorItem
                                                authorId={author.id}
                                                key={author.id}
                                                onRemove={() => {
                                                    dispatch(
                                                        removeAuthor(
                                                            author.id,
                                                            token
                                                        )
                                                    );
                                                }}
                                                onAdd={() =>
                                                    handleAddAuthor(author.id)
                                                }
                                            />
                                        )
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={styles.authorsWrapper}>
                        <h2>Course Authors</h2>
                        {authorsList.length ? (
                            <div>
                                {authorsList.map((authorId) => {
                                    return (
                                        <AuthorItem
                                            authorId={authorId}
                                            key={authorId}
                                            onRemove={() =>
                                                handleRemoveAuthor(authorId)
                                            }
                                            type="remove"
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <p>Author list is empty</p>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                <Link to="/courses">
                    <Button buttonText="Cancel" type="button" />
                </Link>
                {courseId ? (
                    <Button buttonText="Update" type="submit" />
                ) : (
                    <Button buttonText="Create Course" type="submit" />
                )}
            </div>
        </form>
    );
};

export default CourseForm;
