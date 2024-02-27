import { TimeSlot } from "../models/timeSlot";


export const calendarDayTimeSlots: TimeSlot[] = Array.from(
  { length: 20 },
  (_, i) => {
    const hours = 7 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? 0 : 30; // Changed to number to match the TimeSlot interface
    return {
      hour: hours % 12 === 0 ? 12 : hours % 12,
      minute: minutes,
      timeOfDay: hours < 12 ? "AM" : "PM",
    };
  }
);

export const timeSlotToString = (timeSlot: TimeSlot): string => {
  const minuteString =
    timeSlot.minute < 10 ? `0${timeSlot.minute}` : `${timeSlot.minute}`;
  return `${timeSlot.hour}:${minuteString} ${timeSlot.timeOfDay}`;
};