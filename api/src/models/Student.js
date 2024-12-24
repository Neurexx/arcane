import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    rollNumber: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    semester: {
      type: Number,
      required: true
    },
    examAttempts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ExamAttempt'
    }]
  }, {
    timestamps: true
  });
  
  const Student = mongoose.model('Student', studentSchema);

  export default Student