import { FC, useState } from "react";
import { CourseData } from "../models/courseData";
import { RoomSchedule } from "./RoomSchedule";

export const AllRoomsSchedule: FC<{ courses: CourseData[] }> = ({
  courses,
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>();
  const coursesByRoom = courses.reduce((acc, course) => {
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
    <div>
      <h3 className="text-center">Rooms</h3>
      <hr />
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          {Object.keys(coursesByRoom).map((room) => {
            const isSelected = room === selectedRoomId;
            const htmlroom = room.replace(" ", "").replace(",", "");
            return (
              <button
                key={"roombutton" + room}
                className={"nav-link " + (isSelected ? "active" : "")}
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target={`#nav-${htmlroom}`}
                type="button"
                role="tab"
                aria-controls={`nav-${htmlroom}`}
                aria-selected={isSelected}
                onClick={() => setSelectedRoomId(room)}
              >
                {room}
              </button>
            );
          })}
        </div>
      </nav>
      <div className="tab-content" id="room-tab-content">
        {Object.keys(coursesByRoom).map((room) => {
          const isSelected = room === selectedRoomId;
          const htmlroom = room.replace(" ", "").replace(",", "");
          return (
            <div
              key={"room" + room}
              className={"tab-pane fade " + (isSelected ? "show active" : "")}
              id={`nav-${htmlroom}`}
              role="tabpanel"
              aria-labelledby={`nav-${htmlroom}-tab`}
              tabIndex={0}
            >
              <RoomSchedule
                key={"room" + room}
                courses={coursesByRoom[room]}
                roomName={room}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
