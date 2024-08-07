export const getCourseDuration = (duration: number): string => {
    if(duration === 0 || !duration){
        return "00:00 hours";
    }
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const hourText = hours === 1 ? "hour" : "hours";

    return `${formattedHours}:${formattedMinutes} ${hourText}`;
};
