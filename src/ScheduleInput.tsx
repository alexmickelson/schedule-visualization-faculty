import { FC, FormEvent, useState } from "react";
import { CourseData } from "./models/courseData";
import { parseCourseData } from "./utils/scheduleParsing";

export const ScheduleInput: FC<{
  setCourses: (courses: CourseData[]) => void;
}> = ({ setCourses }) => {
  const [error, _setError] = useState("");
  const handleChange = (e: FormEvent<HTMLTextAreaElement>) => {
    console.log(e.currentTarget.value);
    const parsedCourses = parseCourseData(e.currentTarget.value);

    console.log(parsedCourses);

    setCourses(parsedCourses);
  };
  return (
    <>
      <div className="px-3 m-0 row">
        <div className="col-3">
          <label htmlFor="spreadsheet-data">
            Paste in Schedule Spreadsheet
          </label>
          <br />
          <textarea
            id="spreadsheet-data"
            className="form-control bg-secondary-subtle pb-0"
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <details>
            <summary>Instructions</summary>
            <ul>
              <li>
                Required Columns: CRN, Course, Section #, Course Title, Meeting
                Pattern, Instructor Name, Room, Credit Hrs
              </li>
              <li>
                Copy from web version of excel (windows app has different
                delimiters)
              </li>
            </ul>
          </details>
        </div>
      </div>
      {error && <div className="text-danger">{error}</div>}
    </>
  );
};
