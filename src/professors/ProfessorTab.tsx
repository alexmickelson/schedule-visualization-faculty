import { FC } from "react";
import { CourseData } from "../models/courseData";
import { sumChi } from "../utils/courseUtilities";

export const ProfessorTab: FC<{
  professor: string;
  setSelectedProfessor: (professor: string) => void;
  selectedProfessor: string;
  courses: CourseData[];
}> = ({ professor, setSelectedProfessor, selectedProfessor, courses }) => {
  const isSelected = professor === selectedProfessor;
  const htmlProfessor = professor.replace(" ", "").replace(",", "");

  const chiLoad = sumChi(courses);

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
      {professor} - {chiLoad}
    </button>
  );
};
