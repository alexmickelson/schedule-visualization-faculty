import { useState } from "react";
import { CourseData } from "./models/courseData";
import { ProfessorSchedule } from "./ProfessorSchedule";
import { RoomSchedule } from "./RoomSchedule";

export const App = () => {
  const [inputString, setInputString] =
    useState(`CRN	Course	Section #	Course Title	Meeting Pattern	Instructor Name	Room	Credit Hrs
  5302	CS 1400	N01	Programming Fundamentals	Does Not Meet	Lewellen, Michael, J. 	ONLINE ONLINE - Completely Online	3
  5884	CS 1400	003	Programming Fundamentals	MWF 8:30am-9:20am	Allen, Heber 	GRSC 337 - Classroom (IVC)	3
  4012	CS 1400	002	Programming Fundamentals	MWF 2:30pm-3:20pm	Allen, Heber 	GRSC 323 - Classroom (IVC)	3
  4369	CS 1400	001	Programming Fundamentals	MWF 8:30am-9:20am	Allen, Jonathan, D 	GRSC 123 - Classroom	3
  5303	CS 1405	N01	Programming Fundamentals Lab	Does Not Meet	Lewellen, Michael, J. 	ONLINE ONLINE - Completely Online	1
  5885	CS 1405	003	Programming Fundamentals Lab	R 1:30pm-3:20pm	Allen, Heber 	GRSC 143 - Engineering Computer Lab	1
  4013	CS 1405	002	Programming Fundamentals Lab	R 3:30pm-5:20pm	Allen, Jonathan, D 	GRSC 143 - Engineering Computer Lab	1
  4014	CS 1405	001	Programming Fundamentals Lab	R 7:30am-9:20am	Allen, Jonathan, D 	GRSC 143 - Engineering Computer Lab	1
  5799	CS 1410	N01	Object-Oriented Programming	Does Not Meet	Lewellen, Michael, J. 	ONLINE ONLINE - Completely Online	3
  4360	CS 1410	001	Object-Oriented Programming	MWF 8:30am-9:20am	Mickelson, Steven, Alexandre 	GRSC 323 - Classroom (IVC)	3
    CS 1410				#VALUE!		
  5800	CS 1415	N01	Object-Oriented Program Lab	Does Not Meet	Lewellen, Michael, J. 	ONLINE ONLINE - Completely Online	1
  4365	CS 1415	001	Object-Oriented Program Lab	T 7:30am-9:20am	Mickelson, Steven, Alexandre 	GRSC 143 - Engineering Computer Lab	1
    CS 1415				#VALUE!		
  5520	CS 1430	002	User Experience Design	R 8:30am-9:20am	Mickelson, Steven, Alexandre 	GRSC 142 - Engineering Computer Lab	1
  5058	CS 1430	001	User Experience Design	R 9:30am-10:20am	Mickelson, Steven, Alexandre 	GRSC 142 - Engineering Computer Lab	1
  4455	CS 1810	001	Intro to Web Development	TR 11am-12:15pm	Mickelson, Steven, Alexandre 	GRSC 143 - Engineering Computer Lab	3
    CS 1810				#VALUE!		
  4015	CS 2420	001	Data Structures & Algorithms	MWF 8:30am-9:20am	Teichert, Adam 	GRSC 143 - Engineering Computer Lab	3
    CS 2450		Intro to SE		#VALUE!		
  5881	CS 2700	002	Digital Circuits	MWF 9:30am-10:20am	Simper, Austin Dallan 	GRSC 143 - Engineering Computer Lab	3
    CS 2700	003	Digital Circuits		#VALUE!		
  4516	CS 2700	001	Digital Circuits	MWF 9:30am-10:20am	Teichert, Adam 	GRSC 124 - Classroom	3
  5792	CS 2810	002	Computer Organiz/Architecture	MWF 8:30am-9:20am	Simper, Austin Dallan 	HLIB 024A - PC Lab	3
  4476	CS 2810	001	Computer Organiz/Architecture	MWF 9:30am-10:20am	Sorenson, Garth, O 	GRSC 142 - Engineering Computer Lab	3
    CS 2860		Operating Systems		#VALUE!		
  4623	ENGR 1000	02S	Intro to Engineering	T 3:30pm-5:20pm; R 1:30pm-2:20pm	Steurer, Keith, A 	GRSC 142 - Engineering Computer Lab; GRSC 353 - Organic Chemistry; HLIB 101A - Auditorium	2
  4622	ENGR 1000	01S	Intro to Engineering	T 1:30pm-3:20pm; R 1:30pm-2:20pm	Steurer, Keith, A 	GRSC 142 - Engineering Computer Lab; GRSC 353 - Organic Chemistry; HLIB 101A - Auditorium	2
  4155	ENGR 1300	001	Engr Graphic & Design/Mechanic	MWF 8:30am-9:20am	Bradshaw, Riley, D 	GRSC 142 - Engineering Computer Lab	3
  5060	ENGR 1400	001	Programming Fundamentals	MWF 2:30pm-3:20pm	Simper, Austin Dallan 	NOYES 130 - Classroom	3
  5061	ENGR 1405	001	Programming Fundamentals Lab	R 2:30pm-4:20pm	Simper, Austin Dallan 	GRSC 142 - Engineering Computer Lab	1
  5427	ENGR 1410	001	Object-Oriented Programming	MWF 2:30pm-3:20pm	Sorenson, Garth, O 	GRSC 123 - Classroom	3
  5426	ENGR 1415	001	Object-Oriented Prog. Lab	R 8:30am-10:20am	Sorenson, Garth, O 	GRSC 124 - Classroom	1
  5321	ENGR 1997	130	Engineering Internship I	Does Not Meet	Sorenson, Garth, O 	ONLINE ONLINE - Completely Online	
  5021	ENGR 2030	001	Dynamics	MTWF 8:30am-9:20am	Steurer, Keith, A 	GRSC 351 - Organic Chemistry	3
  4382	ENGR 2140	001	Mechanics of Materials	MTWF 9:30am-10:20am	Bradshaw, Riley, D 	GRSC 123 - Classroom	3
  4259	ENGR 2240	001	Survey & Global Positioning	TR 8:30am-9:20am; R 10:30am-1:20pm	Bradshaw, Riley, D 	GRSC 123 - Classroom; GRSC 142 - Engineering Computer Lab	3
  4118	ENGR 2250	001	Analog Circuits	MWF 11:30am-12:20pm	Sorenson, Garth, O 	GRSC 225 - Classroom	3
  4119	ENGR 2255	001	Analog Circuits Laboratory	T 3:30pm-5:20pm	Sorenson, Garth, O 	GRSC 341 - Physics	1
  5728	ENGR 2270	001	Engr Graphics & Design-Civil	MW 11:30am-12:20pm; F 11:30am-1:20pm	Steurer, Keith, A 	HLIB 024A - PC Lab	3
  5887	ENGR 2700	002	Digital Circuits	MWF 9:30am-10:20am	Simper, Austin Dallan 	General Assignment Room	3
  4517	ENGR 2700	001	Digital Circuits	MWF 9:30am-10:20am	Teichert, Adam 	General Assignment Room	3
  4518	ENGR 2705	001	Digital Circuits Lab	T 8:30am-10:20am	Simper, Austin Dallan 	GRSC 142 - Engineering Computer Lab	1
    SE 3140		Ethics & Pers. Software Proc.		#VALUE!		
  4519	SE 3250	001	Survey of Languages	MWF 2:30pm-3:20pm	Teichert, Adam 	GRSC 143 - Engineering Computer Lab	3
  5724	SE 3520	001	Database Systems	MWF 11:30am-12:20pm	Allen, Heber 	GRSC 143 - Engineering Computer Lab	3
    SE 3630		Mobile App Dev		#VALUE!		
  5059	SE 3820	001	Back-End Web Development	MWF 10:30am-11:20am	Allen, Jonathan, D 	GRSC 143 - Engineering Computer Lab	3
    SE3830		Cloud App Dev		#VALUE!		
  5162	SE 4230	001	Advanced Algorithms	MWF 10:30am-11:20am	Teichert, Adam 	GRSC 142 - Engineering Computer Lab	3
  5163	SE 4270	001	Software Maintenance Prac.	MWF 1:30pm-2:20pm	Allen, Jonathan, D 	GRSC 142 - Engineering Computer Lab	3
  4456	SE 4400	001	SE Practicum I	MW 3:30pm-5:20pm	Allen, Heber 	GRSC 143 - Engineering Computer Lab	4
  5165	SE 4850	001	Advanced Front-End Dev.	MW 2:30pm-3:20pm; F 2:30pm-4:20pm	Mickelson, Steven, Alexandre 	GRSC 142 - Engineering Computer Lab	4`);

  const parsedCourses = parseCourseData(inputString);

  const coursesByProfessor = parsedCourses.reduce((acc, course) => {
    if (acc[course.Instructor]) {
      return {
        ...acc,
        [course.Instructor]: [...acc[course.Instructor], course],
      };
    } else {
      return {
        ...acc,
        [course.Instructor]: [course],
      };
    }
  }, {} as Record<string, CourseData[]>);

  const coursesByRoom = parsedCourses.reduce((acc, course) => {
    if (acc[course.Room]) {
      return {
        ...acc,
        [course.Room]: [...acc[course.Room], course],
      };
    } else {
      return {
        ...acc,
        [course.Room]: [course],
      };
    }
  }, {} as Record<string, CourseData[]>);

  return (
    <>
      <div>
        <label htmlFor="spreadsheet-data">Paste in Schedule Spreadsheet</label>
        <br />
        <textarea
          id="spreadsheet-data"
          value={inputString}
          onChange={(e) => {
            console.log(e.target.value);
            setInputString(e.target.value);
          }}
        />
      </div>

      
      {Object.keys(coursesByProfessor).map((professor) => (
        <ProfessorSchedule
          key={"professor" + professor}
          courses={coursesByProfessor[professor]}
          professor={professor}
        />
      ))}

      {Object.keys(coursesByRoom).map((room) => (
        <RoomSchedule
          key={"room" + room}
          courses={coursesByRoom[room]}
          roomName={room}
        />
      ))}
    </>
  );
};

function parseCourseData(data: string): CourseData[] {
  // Split the input data into lines
  const lines = data.split("\n");

  // Skip the header row and map each line to an object
  const courses = lines.slice(1).map((line) => {
    const [
      CRN,
      Course,
      Section,
      CourseTitle,
      MeetingPattern,
      Instructor,
      Room,
      CHI,
    ] = line.split("\t");

    return {
      CRN,
      Course,
      Section: Section.trim(), // Trim to remove any leading/trailing whitespace
      CourseTitle,
      MeetingPattern,
      Instructor,
      Room,
      CHI: parseInt(CHI, 10), // Convert string to number
    };
  });

  return courses;
}
