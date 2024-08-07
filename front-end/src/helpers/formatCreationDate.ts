export const formatDate = (dateString: string): string => {
    const parts = dateString.split("/");
    const date = new Date(
        parseInt(parts[2]),
        parseInt(parts[1]) - 1,
        parseInt(parts[0])
    );

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // +1 because getMonth() is 0-based
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};
