import { FC, useState } from "react";
import { CourseData } from "../models/courseData";
import { ProfessorSchedule } from "./ProfessorSchedule";
import { ProfessorTab } from "./ProfessorTab";

export const AllProfessorsSchedule: FC<{ courses: CourseData[] }> = ({
  courses,
}) => {
  const [selectedProfessor, setSelectedProfessor] = useState("");
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
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          {Object.keys(coursesByProfessor).map((professor) => (
            <ProfessorTab
              professor={professor}
              setSelectedProfessor={setSelectedProfessor}
              selectedProfessor={selectedProfessor}
              courses={coursesByProfessor[professor]}
            />
          ))}
        </div>
      </nav>
      <div className="tab-content" id="professor-tab-content">
        {Object.keys(coursesByProfessor).map((professor) => {
          const isSelected = professor === selectedProfessor;
          const htmlProfessor = professor.replace(" ", "").replace(",", "");
          // console.log(isSelected, htmlProfessor, selectedProfessor);

          return (
            <div
              key={"professor" + professor}
              className={"tab-pane fade " + (isSelected ? "show active" : "")}
              id={`nav-${htmlProfessor}`}
              role="tabpanel"
              aria-labelledby={`nav-${htmlProfessor}-tab`}
              tabIndex={0}
            >
              <ProfessorSchedule
                courses={coursesByProfessor[professor]}
                professor={professor}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
