import { FC } from "react";
import { CourseData } from "../models/courseData";
import { WeekDay } from "./WeekDay";
import { splitCoursesByDay, calendarDayTimeSlots, timeSlotToString } from "../utils/courseTimeUtilities";

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
        {calendarDayTimeSlots.map((s) => (
          <div className="calendarDay p-1">{timeSlotToString(s)}</div>
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
