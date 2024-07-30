// models/Schedule.ts

import mongoose, { Schema, Document, Model } from 'mongoose';
import { ISubject, SubjectSchema } from './User';

// Define the interface for a Schedule
export interface ISchedule extends Document {
  mon: ISubject[];
  tue: ISubject[];
  wed: ISubject[];
  thu: ISubject[];
  fri: ISubject[];
  sat: ISubject[];
  sun: ISubject[];
}

// Define the schema for a Schedule
const ScheduleSchema: Schema = new Schema({
  mon: { type: [SubjectSchema], required: true },
  tue: { type: [SubjectSchema], required: true },
  wed: { type: [SubjectSchema], required: true },
  thu: { type: [SubjectSchema], required: true },
  fri: { type: [SubjectSchema], required: true },
  sat: { type: [SubjectSchema], required: true },
  sun: { type: [SubjectSchema], required: true },
});

// Create the Schedule model
const Schedule: Model<ISchedule> = mongoose.models.Schedule || mongoose.model<ISchedule>('Schedule', ScheduleSchema);

export default Schedule;
