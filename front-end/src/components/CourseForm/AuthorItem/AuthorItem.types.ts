import { ReactEventHandler } from "react";
import { Author } from "../../Courses/Courses.types";

export default interface AuthorItemProps {
    authorId: string;
    onAdd?: React.MouseEventHandler<HTMLButtonElement>;
    onRemove?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "remove";
}
