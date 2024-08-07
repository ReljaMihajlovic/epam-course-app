export interface Course {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
}

export interface CourseProps {
    course: Course;
}

export interface Author {
    id: string;
    name: string;
}
