import { FC } from "react";
import { Schedule, useScheduleContext } from "./scheduleContext";
import { CourseData } from "../models/courseData";
import { WeekSchedule } from "../weekSchedule/WeekSchedule";

export const ScheduleDisplay: FC<{
  courses: CourseData[];
}> = ({ courses }) => {
  const { schedules } = useScheduleContext();

  return (
    <div>
      {schedules.map((s) => (
        <SingleScheduleDisplay key={s.name} schedule={s} courses={courses} />
      ))}
      <hr />
    </div>
  );
};

const SingleScheduleDisplay: FC<{
  schedule: Schedule;
  courses: CourseData[];
}> = ({ schedule, courses }) => {
  const coursesInSchedule = courses.filter((c) =>
    schedule.courses.includes(c.Course)
  );

  return (
    <div>
      <h3 className="text-center">{schedule.name}</h3>
      <WeekSchedule
        courses={coursesInSchedule}
        uniqueKey={"customSchedule" + schedule.name}
      />
    </div>
  );
};
