import {  FC } from "react";
import { CourseData } from "../models/courseData";
import { WeekSchedule } from "../weekSchedule/WeekSchedule";

export const ProfessorSchedule: FC<{
  courses: CourseData[];
  professor: string;
}> = ({ courses, professor }) => {
  const chiLoad =courses.reduce((acc, c) => acc + (c.CHI ? c.CHI : 0), 0)

  const professorName = professor ? professor : "unassigned"

  return (
    <div>
      <h4>{professorName} - {chiLoad}</h4>
      <ul>
        {courses.map((c) => (
          <li key={"professor" + c.CRN}>
            {c.Course} - {c.CRN} - {c.MeetingPattern} - {c.CHI}
          </li>
        ))}
      </ul>
      <section>
        <WeekSchedule courses={courses} />
      </section>
    </div>
  );
};
