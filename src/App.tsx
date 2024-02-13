import { useState } from "react";
import { CourseData } from "./models/courseData";
import { RoomSchedule } from "./rooms/RoomSchedule";
import { parseCourseData } from "./utils/scheduleParsing";
import { AllProfessorsSchedule } from "./professors/AllProfessorsSchedule";

// const localStorageKey = "faculty-schedule";
// const lastInput = localStorage.getItem(localStorageKey) ?? "";

export const App = () => {
  const [inputString, setInputString] = useState("");
  // localStorage.setItem(localStorageKey, inputString);

  try {
    const parsedCourses = parseCourseData(inputString);

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
          <label htmlFor="spreadsheet-data">
            Paste in Schedule Spreadsheet
          </label>
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
          <AllProfessorsSchedule courses={parsedCourses} />
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
  } catch (e) {
    console.log(e);
    return <div>Error parsing content, please reload and try again</div>;
  }
};
