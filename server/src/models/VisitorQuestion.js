import mongoose from 'mongoose';

const visitorQuestionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    mobile: { type: String, required: true, trim: true, maxlength: 20 },
    question: { type: String, required: true, trim: true, maxlength: 2000 },
    source: { type: String, enum: ['typed', 'voice'], default: 'typed' },
  },
  { timestamps: true },
);

export const VisitorQuestion = mongoose.model('VisitorQuestion', visitorQuestionSchema);
