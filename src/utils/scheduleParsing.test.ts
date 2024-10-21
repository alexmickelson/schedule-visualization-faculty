import { expect, test } from "vitest";
import { parseCourseData } from "./scheduleParsing";
import { CourseData } from "../models/courseData";

test("can parse single line from website with inline tab characters", () => {
  const input = `CRN	Course	Section #	Course Title	Meeting Pattern	Instructor Name	Room	CHI
  4455	CS 1810	001	course name here	TR 11am-12:15pm	professor name here 	GRSC 143 - Engineering Computer Lab	3`;
  const actual = parseCourseData(input);

  const expected: CourseData[] = [
    {
      CRN: "4455",
      Course: "CS 1810",
      Section: "001",
      CourseTitle: "course name here",
      MeetingPattern: "TR 11am-12:15pm",
      MeetingTimeSlots: [
        {
          day: "T",
          start: new Date(0, 0, 0, 11, 0),
          end: new Date(0, 0, 0, 12, 15),
        },
        {
          day: "R",
          start: new Date(0, 0, 0, 11, 0),
          end: new Date(0, 0, 0, 12, 15),
        }
      ],
      Instructor: "professor name here",
      Room: "GRSC 143 - Engineering Computer Lab",
      CHI: 3,
    },
  ];
  expect(actual).toEqual(expected);
});

test("can parse single line from website with declared tab characters", () => {
  const input = `CRN\tCourse\tSection #\tCourse Title\tMeeting Pattern\tInstructor Name\tRoom\tCHI
  4455\tCS 1810\t001\tcourse name here\tTR 11am-12:15pm\tprofessor name here \tGRSC 143 - Engineering Computer Lab\t3`;
  const actual = parseCourseData(input);
  const expected: CourseData[] = [
    {
      CRN: "4455",
      Course: "CS 1810",
      Section: "001",
      CourseTitle: "course name here",
      MeetingPattern: "TR 11am-12:15pm",
      MeetingTimeSlots: [
        {
          day: "T",
          start: new Date(0, 0, 0, 11, 0),
          end: new Date(0, 0, 0, 12, 15),
        },
        {
          day: "R",
          start: new Date(0, 0, 0, 11, 0),
          end: new Date(0, 0, 0, 12, 15),
        }
      ],
      Instructor: "professor name here",
      Room: "GRSC 143 - Engineering Computer Lab",
      CHI: 3,
    },
  ];
  expect(actual).toEqual(expected);
});

test("can multiple meeting patterns", () => {
  const input = `CRN\tCourse\tSection #\tCourse Title\tMeeting Pattern\tInstructor Name\tRoom\tCHI
  4455\tCS 1810\t001\tcourse name here\tT 3:30pm-5:20pm; R 1:30pm-2:20pm\tprofessor name here \tGRSC 143 - Engineering Computer Lab\t3`;
  const actual = parseCourseData(input);
  const expected: CourseData[] = [
    {
      CRN: "4455",
      Course: "CS 1810",
      Section: "001",
      CourseTitle: "course name here",
      MeetingPattern: "T 3:30pm-5:20pm; R 1:30pm-2:20pm",
      MeetingTimeSlots: [
        {
          day: "T",
          start: new Date(0, 0, 0, 15, 30),
          end: new Date(0, 0, 0, 17, 20),
        },
        {
          day: "R",
          start: new Date(0, 0, 0, 13, 30),
          end: new Date(0, 0, 0, 14, 20),
        }
      ],
      Instructor: "professor name here",
      Room: "GRSC 143 - Engineering Computer Lab",
      CHI: 3,
    },
  ];
  expect(actual).toEqual(expected);
});

test("can get jonathan chi correctly", () => {
  const input = `CRN	Course	Sec	Course Title	Meeting Pattern	Instructor	Room	Credits	Max	Prior	CHE
	CL		Computer Labs Manager		professor name here					3`;
  const actual = parseCourseData(input);
  const expected: CourseData[] = [
    {
      CRN: "",
      Course: "CL",
      Section: "",
      CourseTitle: "Computer Labs Manager",
      MeetingPattern: "",
      MeetingTimeSlots: [],
      Instructor: "professor name here",
      Room: "",
      CHI: 3,
    },
  ];
  expect(actual).toEqual(expected);
});
