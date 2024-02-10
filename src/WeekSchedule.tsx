import React, { FC } from "react";
import { CourseData } from "./models/courseData";
import { WeekDay } from "./WeekDay";

const days = ["M", "T", "W", "R", "F"];
export const WeekSchedule: FC<{ courses: CourseData[] }> = ({ courses }) => {
  const splitByDay = splitCoursesByDay(courses);
  const salt = Math.random().toString(36).substring(2, 7);

  return (
    <div className="row">
      {days.map((d) => (
        <div key={"dayofweeek" + d + salt} className="col">
          <WeekDay day={d} courses={splitByDay[d]} />
        </div>
      ))}
      {/* <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div>
      <div className="col"></div> */}
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
