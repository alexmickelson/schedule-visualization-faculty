import { CourseData } from "../models/courseData";

export interface TimeSlot {
  hour: number;
  minute: number;
  timeOfDay: "AM" | "PM";
}

const timeStringToDate = (timeString: string): Date => {
  if (!timeString) throw new Error("cannot parse empty timestring");

  const normalizedTimeString = timeString.replace(/(\d)(AM|PM|am|pm)/, "$1 $2");
  let [hoursMinutes, period] = normalizedTimeString.split(" ");
  let [hours, minutes] = hoursMinutes.split(":").map(Number);

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
  if (course.MeetingPattern === "Does Not Meet") return false;

  const meetingPatterns = course.MeetingPattern.split(";")
    .map((p) => p.trim())
    .filter((p) => p.split(" ")[0].includes(day));

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

// export const calendarDayTimeSlots = Array.from({ length: 20 }, (_, i) => {
//   const hours = 7 + Math.floor(i / 2);
//   const minutes = i % 2 === 0 ? "00" : "30";
//   return `${hours % 12 === 0 ? 12 : hours % 12}:${minutes} ${
//     hours < 12 ? "AM" : "PM"
//   }`;
// });

export const calendarDayTimeSlots: TimeSlot[] = Array.from(
  { length: 20 },
  (_, i) => {
    const hours = 7 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? 0 : 30; // Changed to number to match the TimeSlot interface
    return {
      hour: hours % 12 === 0 ? 12 : hours % 12,
      minute: minutes,
      timeOfDay: hours < 12 ? "AM" : "PM",
    };
  }
);

export const timeSlotToString = (timeSlot: TimeSlot): string => {
  const minuteString =
    timeSlot.minute < 10 ? `0${timeSlot.minute}` : `${timeSlot.minute}`;
  return `${timeSlot.hour}:${minuteString} ${timeSlot.timeOfDay}`;
};

export const splitCoursesByDay = (
  courses: CourseData[]
): Record<string, CourseData[]> => {
  return courses.reduce(
    (acc, course) => {
      const pattern = course.MeetingPattern;

      const days = ["M", "T", "W", "R", "F"];

      days.forEach((day) => {
        if (pattern.includes(day)) {
          // If the day is part of the meeting pattern, add the course to the corresponding day in the accumulator
          // Initialize with an empty array if this is the first course for the day
          if (!acc[day]) {
            acc[day] = [];
          }

          // Use the spread operator to maintain immutability
          acc[day] = [...acc[day], course];
        }
      });

      return acc;
    },
    {
      M: [],
      T: [],
      W: [],
      R: [],
      F: [],
    } as Record<string, CourseData[]>
  );
};
