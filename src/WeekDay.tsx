import { FC } from "react";
import { CourseData } from "./models/courseData";
import { isCourseInTimeSlot, timeSlots } from "./utils/courseTimeUtilities";


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
    <>
      {coursesByTimeSlot.map((coursesInTimeslot, index) => (
        <div key={index} className="calendarDay p-2 border-end">
            {coursesInTimeslot.timeSlotCourses.map((course) => (
              <div className="text-truncate">
                {course.CourseTitle}
              </div>
            ))}
        </div>
      ))}
    </>
  );
};
