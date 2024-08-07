import IconMiniTrash from "../../../common/Icons/IconMiniTrash";
import React from "react";
import styles from "./AuthorItem.module.css";
import AuthorItemProps from "./AuthorItem.types";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store.types";
import { Author } from "../../Courses/Courses.types";

const AuthorItem: React.FC<AuthorItemProps> = ({ authorId, onAdd, onRemove }) => {
    const authors = useSelector((state: RootState) => state.authors);
    const author = authors.find((author: Author) => author.id === authorId);

    if(author === undefined) {
        return <span>Author not found</span>;
    }
    return (
        <div className={styles.wrapper}>
            <span>{author.name}</span>
            <button
                type="button"
                onMouseDown={onRemove}
                className={styles.button}>
                <IconMiniTrash />
            </button>
            <button type="button" className={styles.button} onMouseDown={onAdd}>
                +
            </button>
        </div>
    );
};

export default AuthorItem;
