import { CourseData } from "../models/courseData";
import { TimePeriod } from "../models/timePeriod";
import { TimeSlot } from "../models/timeSlot";

export const isCourseInTimeSlot = (
  course: CourseData,
  timeSlot: TimeSlot,
  day: string
): boolean => {
  let hour = timeSlot.hour;
  if (timeSlot.timeOfDay === 'PM' && hour < 12) {
    hour += 12;
  } else if (timeSlot.timeOfDay === 'AM' && hour === 12) {
    hour = 0; // Convert 12 AM to 00 hours
  }

  return course.MeetingTimeSlots.some(timePeriod => {
    if (timePeriod.day === day) {
      const slotStartTime = new Date(0, 0, 0, hour, timeSlot.minute);
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

    const [startTime, endTime] = timePart.split("-");
    const startMatch = startTime.match(/(\d+)(?::(\d+))?(am|pm)/i);
    const endMatch = endTime.match(/(\d+)(?::(\d+))?(am|pm)/i);

    if (!startMatch || !endMatch) {
      console.log(
        "could not parse meeting pattern session",
        session,
        meetingPattern
      );
      return [];
    }

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
        return [];
      }
      const day = dayChar as TimePeriod["day"];
      return [{ day, start: new Date(start), end: new Date(end) }];
    });
  });
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
