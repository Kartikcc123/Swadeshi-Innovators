import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    message: { type: String, trim: true, maxlength: 2000, default: '' },
    source: { type: String, default: 'portal' },
  },
  { timestamps: true },
);

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
