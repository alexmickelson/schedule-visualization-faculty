import { FC, useState } from "react";
import { CourseData } from "../models/courseData";
import { ProfessorSchedule } from "./ProfessorSchedule";

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
          {Object.keys(coursesByProfessor).map((professor) => {
            const isSelected = professor === selectedProfessor;
            const htmlProfessor = professor.replace(" ", "").replace(",", "");
            return (
              <button
                key={"professorbutton" + professor}
                className={"nav-link " + (isSelected ? "active" : "")}
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target={`#nav-${htmlProfessor}`}
                type="button"
                role="tab"
                aria-controls={`nav-${htmlProfessor}`}
                aria-selected={isSelected}
                onClick={() => setSelectedProfessor(professor)}
              >
                {professor}
              </button>
            );
          })}
        </div>
      </nav>
      <div className="tab-content" id="professor-tab-content">
        {Object.keys(coursesByProfessor).map((professor) => {
          const isSelected = professor === selectedProfessor;
          const htmlProfessor = professor.replace(" ", "").replace(",", "");
          console.log(isSelected, htmlProfessor, selectedProfessor);
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

// <nav>
//   <div class="nav nav-tabs" id="nav-tab" role="tablist">
//     <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
//     <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
//     <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
//     <button class="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false" disabled>Disabled</button>
//   </div>
// </nav>
// <div class="tab-content" id="nav-tabContent">
//   <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">...</div>
//   <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">...</div>
//   <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">...</div>
//   <div class="tab-pane fade" id="nav-disabled" role="tabpanel" aria-labelledby="nav-disabled-tab" tabindex="0">...</div>
// </div>
