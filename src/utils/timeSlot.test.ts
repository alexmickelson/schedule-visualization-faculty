import { describe, it, expect } from 'vitest';
import { TimeSlot } from '../models/timeSlot';
import { timeSlotToString } from './timeSlotUtilities';

describe('timeSlotToString', () => {
  // Define a series of tests
  it('converts 9:30 AM correctly', () => {
    const timeSlot: TimeSlot = { hour: 9, minute: 30, timeOfDay: "AM" };
    expect(timeSlotToString(timeSlot)).toBe("9:30 AM");
  });

  it('pads minute below 10 with leading zero', () => {
    const timeSlot: TimeSlot = { hour: 4, minute: 5, timeOfDay: "PM" };
    expect(timeSlotToString(timeSlot)).toBe("4:05 PM");
  });

  it('handles noon correctly', () => {
    const timeSlot: TimeSlot = { hour: 12, minute: 0, timeOfDay: "PM" };
    expect(timeSlotToString(timeSlot)).toBe("12:00 PM");
  });

  it('handles midnight correctly', () => {
    const timeSlot: TimeSlot = { hour: 12, minute: 15, timeOfDay: "AM" };
    expect(timeSlotToString(timeSlot)).toBe("12:15 AM");
  });
});