import { CourseData } from "../models/courseData";
import { TimePeriod } from "../models/timePeriod";
import { TimeSlot } from "../models/timeSlot";

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

// export const isCourseInTimeSlot = (
//   course: CourseData,
//   timeSlot: TimeSlot,
//   day: string
// ): boolean => {
//   if (course.MeetingPattern === "Does Not Meet") return false;

//   const meetingPatterns = course.MeetingPattern.split(";")
//     .map((p) => p.trim())
//     .filter((p) => p.split(" ")[0].includes(day));

//   const timeSlotDate = timeStringToDate(timeSlot);
//   const endTimeSlot = new Date(timeSlotDate);
//   endTimeSlot.setMinutes(endTimeSlot.getMinutes() + 30);

//   return meetingPatterns.some((pattern) => {
//     const timePart = pattern.trim().split(" ")[1];
//     if (!timePart) return false; // Skip if there's no time part
//     const [startTimeString, endTimeString] = timePart
//       .split("-")
//       .map((t) => t.trim());

//     const startTime = timeStringToDate(startTimeString);
//     const endTime = timeStringToDate(endTimeString);

//     // timeSlotDate.setMinutes(timeSlotDate.getMinutes());

//     // return (
//     //   (timeSlotDate <= startTime && startTime < endTimeSlot) ||
//     //   (timeSlotDate <= endTime && endTime < endTimeSlot)
//     // );
//     return startTime < endTimeSlot && timeSlotDate < endTime;
//   });
// };


export const isCourseInTimeSlot = (
  course: CourseData,
  timeSlot: TimeSlot,
  day: string
): boolean => {
  // Convert the time slot to a 24-hour format for comparison
  let hour = timeSlot.hour;
  if (timeSlot.timeOfDay === 'PM' && hour < 12) {
    hour += 12;
  } else if (timeSlot.timeOfDay === 'AM' && hour === 12) {
    hour = 0; // Convert 12 AM to 00 hours
  }

  // Check each meeting time slot of the course
  return course.MeetingTimeSlots.some(timePeriod => {
    // Only proceed if the day matches
    if (timePeriod.day === day) {
      // Create a Date object for the start time of the time slot
      const slotStartTime = new Date(0, 0, 0, hour, timeSlot.minute);
      // Check if the slot start time is within the meeting time period
      return slotStartTime >= timePeriod.start && slotStartTime < timePeriod.end;
    }
    return false;
  });
};

const isValidDayChar = (char: string): char is "M" | "T" | "W" | "R" | "F" => {
  return ["M", "T", "W", "R", "F"].includes(char);
};

export const getTimePeriodsForPattern = (
  meetingPattern: string
): TimePeriod[] => {
  if (meetingPattern.trim().toLowerCase() === "does not meet") {
    return [];
  }
  if (meetingPattern.trim() === "") {
    return [];
  }
  // example: MW 2:30pm-3:20pm; F 2:30pm-4:20pm
  const sessions = meetingPattern.split(";");

  return sessions.flatMap((session) => {
    // example: MW 2:30pm-3:20pm
    const [daysPart, timePart] = session.trim().split(" ");
    // Adjust regex to optionally match minutes
    const [startTime, endTime] = timePart.split("-");
    const startMatch = startTime.match(/(\d+)(?::(\d+))?(am|pm)/i);
    const endMatch = endTime.match(/(\d+)(?::(\d+))?(am|pm)/i);

    if (!startMatch || !endMatch) {
      console.log(
        "could not parse meeting pattern session",
        session,
        meetingPattern
      );
      return []; // Skip this session if the time does not match the expected format
    }

    // Adjusted to provide default value of '0' for minutes if not present
    const [_, startHourString, startMinuteString = "0", startPeriod] =
      startMatch;
    const [__, endHourString, endMinuteString = "0", endPeriod] = endMatch;

    const startHour =
      parseInt(startHourString) +
      (startPeriod.toLowerCase() === "pm" && startHourString !== "12" ? 12 : 0);
    const startMinute = parseInt(startMinuteString);
    const start = new Date(0, 0, 0, startHour, startMinute);

    const endHour =
      parseInt(endHourString) +
      (endPeriod.toLowerCase() === "pm" && endHourString !== "12" ? 12 : 0);
    const endMinute = parseInt(endMinuteString);
    const end = new Date(0, 0, 0, endHour, endMinute);

    return daysPart.split("").flatMap((dayChar): TimePeriod[] => {
      if (!isValidDayChar(dayChar)) {
        return []; // Skip if dayChar is not a valid day
      }
      // Directly using dayChar as a day type after validation
      const day = dayChar as TimePeriod["day"];
      return [{ day, start: new Date(start), end: new Date(end) }];
    });
  });
};

const timeSlotToDate = (timeSlot: TimeSlot): Date => {
  const date = new Date();
  let hour = timeSlot.hour === 12 ? 0 : timeSlot.hour; // Convert 12 AM/PM to 0/12 hour format
  hour += timeSlot.timeOfDay === "PM" ? 12 : 0; // Convert PM hours
  date.setHours(hour, timeSlot.minute, 0, 0); // Set hours and minutes, reset seconds and milliseconds
  return date;
};

export const splitCoursesByDay = (
  courses: CourseData[]
): Record<string, CourseData[]> => {
  const groupedByDay: Record<string, CourseData[]> = {
    M: [],
    T: [],
    W: [],
    R: [],
    F: [],
  };

  courses.forEach((course) => {
    course.MeetingTimeSlots.forEach((timeSlot) => {
      if (!groupedByDay[timeSlot.day]) {
        groupedByDay[timeSlot.day] = [];
      }
      if (
        !groupedByDay[timeSlot.day].find(
          (existingCourse) => existingCourse.CRN === course.CRN
        )
      ) {
        groupedByDay[timeSlot.day].push(course);
      }
    });
  });

  return groupedByDay;
};
