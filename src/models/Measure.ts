import mongoose from 'mongoose';

const MeasureSchema = new mongoose.Schema({
  customerCode: { type: String, required: true },
  measureDatetime: { type: Date, required: true },
  measureType: { type: String, enum: ['WATER', 'GAS'], required: true },
  measureValue: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  uuid: { type: String, required: true, unique: true },
  confirmed: { type: Boolean, default: false }
});

export const Measure = mongoose.model('Measure', MeasureSchema);