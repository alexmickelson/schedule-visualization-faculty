import { FC } from "react";
import { CourseData } from "../models/courseData";
import { WeekSchedule } from "../weekSchedule/WeekSchedule";
import { sumChi } from "../utils/courseUtilities";


export const ProfessorSchedule: FC<{
  courses: CourseData[];
  professor: string;
}> = ({ courses, professor }) => {
  const chiLoad = sumChi(courses);

  const professorName = professor ? professor : "unassigned";

  return (
    <div>
      <h4>
        {professorName} - {chiLoad}
      </h4>
      <details>
        <summary>Course List</summary>
        <ul>
          {courses.map((c) => (
            <li
              key={
                "professor" + c.CRN + c.Course.replace(".", "").replace(" ", "")
              }
            >
              {c.Course} - {c.CRN} - {c.MeetingPattern} - {c.CHI}
            </li>
          ))}
        </ul>
      </details>
      <section>
        <WeekSchedule
          courses={courses}
          uniqueKey={"professorscheduleweek" + professor}
        />
      </section>
    </div>
  );
};
