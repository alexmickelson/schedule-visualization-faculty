import { describe, it, expect } from "vitest";
import {
  getTimePeriodsForPattern,
  isCourseInTimeSlot,
  splitCoursesByDay,
} from "./courseTimeUtilities";
import { TimePeriod } from "../models/timePeriod";
import { CourseData } from "../models/courseData";
import { TimeSlot } from "../models/timeSlot";

describe("getStartAndEndTimes", () => {
  it("can convert a course pattern to start and end dates", () => {
    const meetingPattern = "MW 2:30pm-3:20pm";

    const expectedResult: TimePeriod[] = [
      {
        day: "M",
        start: new Date(0, 0, 0, 14, 30),
        end: new Date(0, 0, 0, 15, 20),
      },
      {
        day: "W",
        start: new Date(0, 0, 0, 14, 30),
        end: new Date(0, 0, 0, 15, 20),
      },
    ];

    expect(getTimePeriodsForPattern(meetingPattern)).toEqual(expectedResult);
  });

  it("can handle times in the morning", () => {
    const pattern = "TR 11am-12:15pm";
    const expected: TimePeriod[] = [
      {
        day: "T",
        start: new Date(0, 0, 0, 11, 0),
        end: new Date(0, 0, 0, 12, 15),
      },
      {
        day: "R",
        start: new Date(0, 0, 0, 11, 0),
        end: new Date(0, 0, 0, 12, 15),
      },
    ];
    expect(getTimePeriodsForPattern(pattern)).toEqual(expected);
  });

  it("can get start and end times for courses with different meeting times on different days", () => {
    const pattern = "MW 2:30pm-3:20pm; F 2:30pm-4:20pm";

    const expected: TimePeriod[] = [
      {
        day: "M",
        start: new Date(0, 0, 0, 14, 30),
        end: new Date(0, 0, 0, 15, 20),
      },
      {
        day: "W",
        start: new Date(0, 0, 0, 14, 30),
        end: new Date(0, 0, 0, 15, 20),
      },
      {
        day: "F",
        start: new Date(0, 0, 0, 14, 30),
        end: new Date(0, 0, 0, 16, 20),
      },
    ];

    expect(getTimePeriodsForPattern(pattern)).toEqual(expected);
  });

  it("can handle does not meet", () => {
    const pattern = "Does Not Meet";
    const expected: TimePeriod[] = [];
    expect(getTimePeriodsForPattern(pattern)).toEqual(expected);
  });
});

describe("splitCoursesByDay", () => {
  it("correctly groups courses by single day", () => {
    const courses: CourseData[] = [
      {
        CRN: "101",
        Course: "Math 101",
        Section: "001",
        CourseTitle: "Introduction to Math",
        MeetingTimeSlots: [
          {
            day: "M",
            start: new Date(0, 0, 0, 9, 0),
            end: new Date(0, 0, 0, 10, 15),
          },
        ],
        Instructor: "John Doe",
        Room: "101A",
        CHI: 3,
      },
    ];

    const grouped = splitCoursesByDay(courses);
    expect(grouped.M.length).toEqual(1);
    expect(grouped.M[0].CRN).toEqual("101");
  });

  it("correctly groups courses by multiple days", () => {
    const courses: CourseData[] = [
      {
        CRN: "102",
        Course: "Sci 102",
        Section: "002",
        CourseTitle: "Introduction to Science",
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
          },
        ],
        Instructor: "Jane Smith",
        Room: "102B",
        CHI: 3,
      },
    ];

    const grouped = splitCoursesByDay(courses);
    expect(grouped.T.length).toEqual(1);
    expect(grouped.R.length).toEqual(1);
    expect(grouped.T[0].CRN).toEqual("102");
    expect(grouped.R[0].CRN).toEqual("102");
  });
});

describe("isCourseInTimeSlot", () => {
  it("can confirm that course is in time slot", () => {
    const course: CourseData = {
      CRN: "4455",
      Course: "CS 1810",
      Section: "001",
      CourseTitle: "course name here",
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
        },
      ],
      Instructor: "professor name here",
      Room: "GRSC 143 - Engineering Computer Lab",
      CHI: 3,
    };

    const slot: TimeSlot = {
      hour: 11,
      minute: 0,
      timeOfDay: "AM"
    }

    expect(isCourseInTimeSlot(course, slot, 'T')).toBe(true)
  });
  it("can confirm that course is not in time slot", () => {
    const course: CourseData = {
      CRN: "4455",
      Course: "CS 1810",
      Section: "001",
      CourseTitle: "course name here",
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
        },
      ],
      Instructor: "professor name here",
      Room: "GRSC 143 - Engineering Computer Lab",
      CHI: 3,
    };

    const slot: TimeSlot = {
      hour: 11,
      minute: 0,
      timeOfDay: "AM"
    }

    expect(isCourseInTimeSlot(course, slot, 'W')).toBe(false)
  });
});
