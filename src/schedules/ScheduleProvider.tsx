import { ReactNode, useEffect, useState } from "react";
import { Schedule, scheduleContext } from "./scheduleContext";

export const ScheduleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [schedules, setSchedules] = useState<Schedule[]>(() => {
    const storedSchedules = localStorage.getItem("courseSchedules");
    return storedSchedules ? JSON.parse(storedSchedules) : [];
  });

  useEffect(() => {
    localStorage.setItem("courseSchedules", JSON.stringify(schedules));
  }, [schedules]);

  return (
    <scheduleContext.Provider value={{ schedules, setSchedules }}>
      {children}
    </scheduleContext.Provider>
  );
};
