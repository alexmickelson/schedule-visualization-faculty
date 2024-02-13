import { CourseData } from "../models/courseData";

export function parseCourseData(data: string): CourseData[] {
  // Split the input data into lines
  const lines = data.split("\n");

  // Extract and process the header row to determine the position of each attribute
  const headers = lines[0].split("\t").map((header) => header.trim());
  const headerIndices = {
    CRN: headers.findIndex((v) => v.includes("CRN")),
    Course: headers.findIndex((v) => v.includes("Course")),
    Section: headers.findIndex((v) => v.includes("Section")),
    CourseTitle: headers.findIndex((v) => v.includes("Title")),
    MeetingPattern: headers.findIndex((v) => v.includes("Meeting Pattern")),
    Instructor: headers.findIndex((v) => v.includes("Instructor")),
    Room: headers.findIndex((v) => v.includes("Room")),
    CHI: headers.findIndex((v) => v.includes("CHI") || v.includes("Credit")),
  };

  // Skip the header row and map each line to an object based on the header indices
  const courses = lines.slice(1).map((line) => {
    const values = line.split("\t");

    return {
      CRN: values[headerIndices.CRN],
      Course: values[headerIndices.Course],
      Section: values[headerIndices.Section]?.trim(), // Trim to remove any leading/trailing whitespace
      CourseTitle: values[headerIndices.CourseTitle],
      MeetingPattern: values[headerIndices.MeetingPattern],
      Instructor: values[headerIndices.Instructor],
      Room: values[headerIndices.Room],
      CHI: parseInt(values[headerIndices.CHI], 10), // Convert string to number
    };
  });

  return courses;
}
