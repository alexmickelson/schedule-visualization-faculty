import { CourseData } from "../models/courseData";

const timeStringToDate = (timeString: string): Date => {
  if (!timeString) throw new Error("cannot parse empty timestring");

  const normalizedTimeString = timeString.replace(/(\d)(AM|PM|am|pm)/, "$1 $2");
  let [hoursMinutes, period] = normalizedTimeString.split(" ");
  let [hours, minutes] = hoursMinutes.split(":").map(Number);
  
  console.log(timeString, hoursMinutes, period);
  if (period.toUpperCase() === "PM" && hours < 12) {
    hours += 12;
  } else if (period.toUpperCase() === "AM" && hours === 12) {
    hours = 0; // Handle midnight
  }

  const referenceDate = new Date(0, 0, 0); // Year, month, day are irrelevant
  referenceDate.setHours(hours, minutes);
  return referenceDate;
};

export const isCourseInTimeSlot = (
  course: CourseData,
  timeSlot: string,
  day: string
): boolean => {
  console.log(timeSlot, course);
  if (course.MeetingPattern === "Does Not Meet") return false;

  const meetingPatterns = course.MeetingPattern.split(";")
    .map((p) => p.trim())
    .filter(p => p.split(" ")[0].includes(day));

  const timeSlotDate = timeStringToDate(timeSlot);
  const endTimeSlot = new Date(timeSlotDate);
  endTimeSlot.setMinutes(endTimeSlot.getMinutes() + 30);

  return meetingPatterns.some((pattern) => {
    const timePart = pattern.trim().split(" ")[1];
    if (!timePart) return false; // Skip if there's no time part
    const [startTimeString, endTimeString] = timePart
      .split("-")
      .map((t) => t.trim());

    const startTime = timeStringToDate(startTimeString);
    const endTime = timeStringToDate(endTimeString);

    // timeSlotDate.setMinutes(timeSlotDate.getMinutes());

    // return (
    //   (timeSlotDate <= startTime && startTime < endTimeSlot) ||
    //   (timeSlotDate <= endTime && endTime < endTimeSlot)
    // );
    return startTime < endTimeSlot && timeSlotDate < endTime;
  });
};

export const timeSlots = Array.from({ length: 20 }, (_, i) => {
  const hours = 7 + Math.floor(i / 2);
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hours % 12 === 0 ? 12 : hours % 12}:${minutes} ${
    hours < 12 ? "AM" : "PM"
  }`;
});
