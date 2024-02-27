
export interface TimePeriod {
  day: "M" | "T" | "W" | "R" | "F";
  start: Date;
  end: Date;
}