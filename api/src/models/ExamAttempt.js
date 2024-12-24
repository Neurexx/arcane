//const mongoose = require('mongoose');
import mongoose from 'mongoose';

const examAttemptSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  answers: [{
    question: {
      type: mongoose.Schema.Types.ObjectId
    },
    selectedOption: Number,
    isCorrect: Boolean
  }],
  startTime: {
    type: Date,
    default: Date.now
  },
  score: Number,
  status: {
    type: String,
    enum: ['in-progress', 'submitted', 'evaluated'],
    default: 'in-progress'
  },
  seating: {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room'
    },
    seatNumber: String
  }
}, {
  timestamps: true
});

const ExamAttempt = mongoose.model('ExamAttempt', examAttemptSchema);
//module.exports = ExamAttempt;
export default ExamAttempt;