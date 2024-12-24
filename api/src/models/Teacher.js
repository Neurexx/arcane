import mongoose from ('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  exams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam'
  }]
}, {
  timestamps: true
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;