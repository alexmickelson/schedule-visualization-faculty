import { useState } from "react";
import { parseCourseData } from "./utils/scheduleParsing";
import { AllProfessorsSchedule } from "./professors/AllProfessorsSchedule";
import { AllRoomsSchedule } from "./rooms/AllRoomsSchedule";

// const localStorageKey = "faculty-schedule";
// const lastInput = localStorage.getItem(localStorageKey) ?? "";

export const App = () => {
  const [inputString, setInputString] = useState("");
  // localStorage.setItem(localStorageKey, inputString);

  try {
    const parsedCourses = parseCourseData(inputString);

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
          <AllRoomsSchedule courses={parsedCourses} />
        </section>
      </>
    );
  } catch (e) {
    console.log(e);
    return <div>Error parsing content, please reload and try again</div>;
  }
};
