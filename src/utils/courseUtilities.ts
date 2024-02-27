import { CourseData } from "../models/courseData";

export const sumChi = (courses: CourseData[]) =>
  courses.reduce((acc, c) => acc + (c.CHI ? c.CHI : 0), 0);