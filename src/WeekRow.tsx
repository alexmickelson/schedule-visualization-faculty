import React, { FC } from 'react'
import { CourseData } from './models/courseData'

export const WeekRow: FC<{timeSlot: string, courses: CourseData[]}> = ({timeSlot, courses}) => {
  return (
    <div>WeekRow</div>
  )
}
