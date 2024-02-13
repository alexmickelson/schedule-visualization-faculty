import { FC } from "react";
import { CourseData } from "../models/courseData";
import { WeekDay } from "./WeekDay";
import { timeSlots } from "../utils/courseTimeUtilities";

const days = ["M", "T", "W", "R", "F"];
const dayLookup: { [key: string]: string } = {
  M: "Monday",
  T: "Tuesday",
  W: "Wednesday",
  R: "Thursday",
  F: "Friday",
};
export const WeekSchedule: FC<{ courses: CourseData[]; uniqueKey: string }> = ({
  courses,
  uniqueKey,
}) => {
  const splitByDay = splitCoursesByDay(courses);
  const salt = Math.random().toString(36).substring(2, 7);

  return (
    <div className="d-flex w-100 justify-content-center">
      <div className="flex-1 m-0 p-0 border-end text-end ">
        <div className="text-center">time</div>
        {timeSlots.map((s) => (
          <div className="calendarDay p-1">{s}</div>
        ))}
      </div>
      {days.map((d) => {
        return (
          <div
            key={"dayofweeek" + uniqueKey + d + salt}
            className="flex-2 m-0 p-0"
          >
            <div className="text-center">{dayLookup[d]}</div>
            <WeekDay day={d} courses={splitByDay[d]} />
          </div>
        );
      })}
    </div>
  );
};

function splitCoursesByDay(
  courses: CourseData[]
): Record<string, CourseData[]> {
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
}
