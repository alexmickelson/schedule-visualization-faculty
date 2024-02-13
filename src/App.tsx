import { useState } from "react";
import { CourseData } from "./models/courseData";
import { ProfessorSchedule } from "./ProfessorSchedule";
import { RoomSchedule } from "./RoomSchedule";
import { parseCourseData } from "./utils/scheduleParsing";

const localStorageKey = "faculty-schedule";
// const lastInput = localStorage.getItem(localStorageKey) ?? "";

export const App = () => {
  const [inputString, setInputString] = useState("");
  localStorage.setItem(localStorageKey, inputString);

  const parsedCourses = parseCourseData(inputString);

  const coursesByProfessor = parsedCourses.reduce((acc, course) => {
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
  console.log(coursesByProfessor);

  const coursesByRoom = parsedCourses.reduce((acc, course) => {
    if (acc[course.Room]) {
      return {
        ...acc,
        [course.Room]: [...acc[course.Room], course],
      };
    } else {
      return {
        ...acc,
        [course.Room]: [course],
      };
    }
  }, {} as Record<string, CourseData[]>);

  return (
    <>
      <div>
        <label htmlFor="spreadsheet-data">Paste in Schedule Spreadsheet</label>
        <br />
        <textarea
          id="spreadsheet-data"
          value={inputString}
          onChange={(e) => {
            console.log(e.target.value);
            setInputString(e.target.value);
          }}
        />
      </div>
      <section className="m-2 p-1">
        <h3 className="text-center">Professors</h3>
        <hr />
        {Object.keys(coursesByProfessor).map((professor) => (
          <ProfessorSchedule
            key={"professor" + professor}
            courses={coursesByProfessor[professor]}
            professor={professor}
          />
        ))}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <h3 className="text-center">Rooms</h3>
        <hr />
        {Object.keys(coursesByRoom).map((room) => (
          <RoomSchedule
            key={"room" + room}
            courses={coursesByRoom[room]}
            roomName={room}
          />
        ))}
      </section>
    </>
  );
};

