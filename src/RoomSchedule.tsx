import React, { FC } from "react";
import { CourseData } from "./models/courseData";

export const RoomSchedule: FC<{ courses: CourseData[]; roomName: string }> = ({
  courses,
  roomName,
}) => {
  return (
    <div>
      <h4>{roomName}</h4>
      <ul>
        {courses.map((c) => (
          <li key={"room" + c.CRN}>
            {c.Course} - {c.CRN} - {c.MeetingPattern} - {c.CHI}
          </li>
        ))}
      </ul>
    </div>
  );
};
