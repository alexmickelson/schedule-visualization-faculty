import { FC } from "react";
import { CourseData } from "../models/courseData";
import { isCourseInTimeSlot } from "../utils/courseTimeUtilities";
import { calendarDayTimeSlots } from "../utils/timeSlotUtilities";


export const WeekDay: FC<{ day: string; courses: CourseData[] }> = ({
  day,
  courses,
}) => {
  const coursesByTimeSlot = calendarDayTimeSlots.map((t) => {
    const timeSlotCourses = courses.filter((c) => isCourseInTimeSlot(c, t, day));

    return { timeSlot: t, timeSlotCourses: timeSlotCourses };
  });

  return (
    <>
      {coursesByTimeSlot.map((coursesInTimeslot, index) => (
        <div key={index + "weekday-courses"} className="calendarDay m-auto text-center px-2 border-end">
            {coursesInTimeslot.timeSlotCourses.map((course) => (
              <div className="text-truncate courseTitleInDay">
                {course.CourseTitle}
              </div>
            ))}
        </div>
      ))}
    </>
  );
};
