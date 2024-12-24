import mongoose from 'mongoose';

const MCQSchema = new mongoose.Schema({
    encryptedQuestion: {
        type: String,
        required: true,
    },

    examId: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    iv: {
        type: String,
        required: true
    },
    paper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paper',
        required: true
    },


}, {
    timestamps: true
});

// Validators
// MCQSchema.pre('save', function (next) {
//     // Ensure exactly one correct answer
//     const correctAnswers = Object.values(this.encryptedOptions)
//         .filter(option => option.isCorrect)
//         .length;

//     if (correctAnswers !== 1) {
//         next(new Error('MCQ must have exactly one correct answer'));
//     }

//     // Update timestamp
//     this.updatedAt = Date.now();
//     next();
// });

// // Indexes
// MCQSchema.index({ examId: 1, isActive: 1 });
// MCQSchema.index({ createdAt: 1 });

const Question = mongoose.model('Question', MCQSchema);

export default Question;