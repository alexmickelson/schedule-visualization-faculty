// sum.test.js
import { expect, test } from "vitest";
import { parseCourseData } from "./scheduleParsing";
import { CourseData } from "../models/courseData";

test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});

test("can parse single line from website", () => {
  const input = `CRN	Course	Section #	Course Title	Meeting Pattern	Instructor Name	Room	Credit Hrs
  4455	CS 1810	001	course name here	TR 11am-12:15pm	professor name here 	GRSC 143 - Engineering Computer Lab	3`;
  const actual = parseCourseData(input);
  const expected: CourseData[] = [
    {
      CRN: "4455",
      Course: "CS 1810",
      Section: "001",
      CourseTitle: "course name here",
      MeetingPattern: "TR 11am-12:15pm",
      Instructor: "professor name here",
      Room: "GRSC 143 - Engineering Computer Lab",
      CHI: 3,
    },
  ];
  expect(actual).toEqual(expected);
});
