import { createContext, useContext } from "react";

export interface Schedule {
  name: string;
  courses: string[];
}

interface ScheduleContextValue {
  schedules: Schedule[];
  setSchedules: (schedules: Schedule[]) => void;
  // removeSchedule: (name: string) => void;
}

export const scheduleContext = createContext<ScheduleContextValue>({
  schedules: [],
  setSchedules: function () {},
  // removeSchedule: function () {},
});

export const useScheduleContext = () => {
  const context = useContext(scheduleContext);
  if (!context) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
};
