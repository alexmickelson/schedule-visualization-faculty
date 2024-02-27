import { TimePeriod } from "./timePeriod";

export interface CourseData {
  CRN: string;
  Course: string;
  Section: string;
  CourseTitle: string;
  MeetingTimeSlots: TimePeriod[];
  Instructor: string;
  Room: string;
  CHI: number;
}
