import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  course: {
    code: String,
    name: String,
    department: String,
    semester: Number
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  questions: [{
    question: String,
    options: [String],
    correctOption: Number,
    marks: Number
  }],
  duration: {
    type: Number,
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  passingMarks: {
    type: Number,
    required: true
  },
  schedule: {
    date: Date,
    startTime: Date,
    endTime: Date,
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room'
    }
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'in-progress', 'completed'],
    default: 'draft'
  }
}, {
  timestamps: true
});

const Exam = mongoose.model('Exam', examSchema);
// module.exports = Exam;
export default Exam;
