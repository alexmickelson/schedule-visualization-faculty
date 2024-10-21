import { CourseData } from "../models/courseData";
import { getTimePeriodsForPattern } from "./courseTimeUtilities";

export function parseCourseData(data: string): CourseData[] {
  const lines = data.split("\n");

  const headers = lines[0].split("\t").map((header) => header.trim());
  const columnIndices = {
    CRN: headers.findIndex((v) => v.includes("CRN")),
    Course: headers.findIndex((v) => v.includes("Course")),
    Section: headers.findIndex((v) => v.includes("Section")),
    CourseTitle: headers.findIndex((v) => v.includes("Title")),
    MeetingPattern: headers.findIndex((v) => v.includes("Meeting Pattern")),
    Instructor: headers.findIndex((v) => v.includes("Instructor")),
    Room: headers.findIndex((v) => v.includes("Room")),
    CHI: headers.findIndex((v) => v.includes("CHI")|| v.includes("CHE")), // || v.includes("Credit")),
  };

  const courses = lines.slice(1).map((line): CourseData => {
    const values = line.split("\t");

    const meetingPattern = values[columnIndices.MeetingPattern];
    const timePeriods = getTimePeriodsForPattern(meetingPattern);

    return {
      CRN: values[columnIndices.CRN].trim(),
      Course: values[columnIndices.Course],
      Section: values[columnIndices.Section]?.trim() ?? "", // Trim to remove any leading/trailing whitespace
      CourseTitle: values[columnIndices.CourseTitle],
      MeetingPattern: meetingPattern,
      MeetingTimeSlots: timePeriods,
      Instructor: values[columnIndices.Instructor].trim(),
      Room: values[columnIndices.Room],
      CHI: parseInt(values[columnIndices.CHI], 10), // Convert string to number
    };
  });

  return courses;
}
