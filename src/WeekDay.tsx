import { FC } from "react";
import { CourseData } from "./models/courseData";
import { isCourseInTimeSlot, timeSlots } from "./utils/courseTimeUtilities";

const dayLookup: { [key: string]: string } = {
  M: "Monday",
  T: "Tuesday",
  W: "Wednesday",
  R: "Thursday",
  F: "Friday",
};

export const WeekDay: FC<{ day: string; courses: CourseData[] }> = ({
  day,
  courses,
}) => {
  const coursesByTimeSlot = timeSlots.map((t) => {
    const timeSlotCourses = courses.filter((c) => isCourseInTimeSlot(c, t, day));

    return { timeSlot: t, timeSlotCourses: timeSlotCourses };
  });

  console.log(coursesByTimeSlot);
  return (
    <div className="col">
      <div>{dayLookup[day]}</div>
      {coursesByTimeSlot.map((coursesInTimeslot, index) => (
        <div key={index} className="time-slot">
          <div>{coursesInTimeslot.timeSlot}</div>
          <ul>
            {coursesInTimeslot.timeSlotCourses.map((course) => (
              <li>
                {course.CourseTitle} - {course.MeetingPattern}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
