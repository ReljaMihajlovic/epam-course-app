import axios from "axios";
import { AxiosError } from "axios";
const baseURL = "http://localhost:4000";
export const axiosBase = axios.create({
    baseURL: baseURL,
});

export interface Response {
    errors?: string[];
    result: string;
    successful: boolean;
}

export async function makePostRequest(
    endpoint: string,
    data: any,
    token?: string
) {
    try {
        const resp = await axiosBase.post(endpoint, data, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        });
        return resp.data;
    } catch (error: unknown) {
        const err = error as AxiosError;
        const resp = err.response?.data as Response;
        if (resp.errors) {
            return {
                successful: resp.successful,
                result: resp.errors.join(", "),
            };
        } else {
            return resp;
        }
    }
}
// === Entry services ===
export const performLogin = async (email: string, password: string) => {
    return makePostRequest("/login", { email, password });
};
export const performRegistration = async (
    email: string,
    name: string,
    password: string
) => {
    return makePostRequest("/register", { email, name, password });
};
export const getUserInfo = async (token: string) => {
    try {
        const response = await axiosBase.get(`/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.result;
    } catch (error) {
        console.error("Failed to get user:", error);
    }
};
// === Courses services ===
export const getCourses = async () => {
    try {
        const response = await axiosBase.get("/courses/all");
        const courses = response.data.result;
        return courses;
    } catch (error) {
        console.error("Failed to get courses:", error);
    }
};
export const getCourseById = async (id: string) => {
    try {
        const response = await axiosBase.get(`/courses/${id}`);
        return response.data.result;
    } catch (error) {
        console.error("Failed to get course:", error);
    }
};
export const deleteCourse = async (id: string, token: string) => {
    try {
        await axiosBase.delete(`/courses/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Failed to delete course:", error);
    }
};

export const getAuthors = async () => {
    try {
        const response = await axiosBase.get("/authors/all");
        const authors = response.data.result;
        return authors;
    } catch (error) {
        console.error("Failed to get authors:", error);
    }
};
export const createAuthor = async (name: string, token: string) => {
    return makePostRequest("/authors/add", { name }, token);
};
export const deleteAuthor = async (id: string, token: string) => {
    try {
        const resp = await axiosBase.delete(`/authors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return resp.status
    } catch (error) {
        console.error("Failed to delete author:", error);
    }
}
