import { useState } from "react";
import { AllProfessorsSchedule } from "./professors/AllProfessorsSchedule";
import { AllRoomsSchedule } from "./rooms/AllRoomsSchedule";
import { ScheduleInput } from "./ScheduleInput";
import { CourseData } from "./models/courseData";
import { ScheduleCreator } from "./schedules/ScheduleCreators";
import { ScheduleDisplay } from "./schedules/ScheduleDisplay";

// const localStorageKey = "faculty-schedule";
// const lastInput = localStorage.getItem(localStorageKey) ?? "";
export const App = () => {
  // localStorage.setItem(localStorageKey, inputString);

  const [courses, setCourses] = useState<CourseData[]>([]);
  try {
    return (
      <>
        <ScheduleInput setCourses={setCourses} />
        <section className="m-2 p-1">
          <AllProfessorsSchedule courses={courses} />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <ScheduleCreator />
          <hr />
          <ScheduleDisplay courses={courses} />

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <AllRoomsSchedule courses={courses} />
        </section>
      </>
    );
  } catch (e) {
    console.log(e);
    return <div>Error parsing content, please reload and try again</div>;
  }
};
