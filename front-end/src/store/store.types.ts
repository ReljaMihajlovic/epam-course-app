import { Course } from "../components/Courses/Courses.types";
import { Author } from "../components/Courses/Courses.types";

export type User = {
    isAuth : boolean;
    id: string;
    name: string;
    email: string;
    token: string;
    role: string;
};

export type RootState = {
    courses: Course[];
    authors: Author[];
    user: User;
};

export type Action = {
    type: string;
    payload: any;
};
