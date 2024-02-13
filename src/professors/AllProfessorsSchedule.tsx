import React, { FC } from "react";
import { CourseData } from "../models/courseData";
import { ProfessorSchedule } from "./ProfessorSchedule";

export const AllProfessorsSchedule: FC<{ courses: CourseData[] }> = ({
  courses,
}) => {
  const coursesByProfessor = courses.reduce((acc, course) => {
    if (acc[course.Instructor]) {
      return {
        ...acc,
        [course.Instructor]: [...acc[course.Instructor], course],
      };
    } else {
      return {
        ...acc,
        [course.Instructor]: [course],
      };
    }
  }, {} as Record<string, CourseData[]>);
  return (
    <div>
    <h3 className="text-center">Professors</h3>
    <hr />
      {Object.keys(coursesByProfessor).map((professor) => (
        <ProfessorSchedule
          key={"professor" + professor}
          courses={coursesByProfessor[professor]}
          professor={professor}
        />
      ))}
    </div>
  );
};
