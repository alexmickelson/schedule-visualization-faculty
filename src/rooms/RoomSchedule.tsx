import { FC } from "react";
import { CourseData } from "../models/courseData";
import { WeekSchedule } from "../weekSchedule/WeekSchedule";

export const RoomSchedule: FC<{ courses: CourseData[]; roomName: string }> = ({
  courses,
  roomName,
}) => {
  return (
    <div>
      <h4 className="text-center">{roomName}</h4>
      <ul>
        {courses.map((c) => (
          <li key={"room" + c.CRN + c.Course.replace(".", "").replace(" ", "")}>
            {c.Course} - {c.CRN} - {c.MeetingPattern}
          </li>
        ))}
      </ul>
      <section>
        <WeekSchedule
          courses={courses}
          uniqueKey={"roomkey" + roomName.replace(" ", "").replace(".", "")}
        />
      </section>
    </div>
  );
};
