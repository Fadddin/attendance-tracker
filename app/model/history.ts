// models/historyModel.ts

import { Schema, model, models, Document } from 'mongoose';

interface IHistory extends Document {
    user: string;
    subjectName: string;
    date: Date;
    time: string;
    status: 'present' | 'absent';
}

const historySchema = new Schema<IHistory>({
    user: { type: String, required: true },
    subjectName: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['present', 'absent'], required: true }
});

const History = models.History || model<IHistory>('History', historySchema);

export default History;
