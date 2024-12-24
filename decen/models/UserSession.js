import mongoose from 'mongoose';

const StudentExamSessionSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: [true, 'Student ID is required'],
        index: true
    },
    examId: {
        type: String,
        required: [true, 'Exam ID is required'],
        index: true
    },
    publicKey: {
        type: String,
        required: [true, 'Public key is required']
    },
    encryptedPrivateKey: {
        type: String,
        required: [true, 'Encrypted private key is required']
    },
    answers: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MCQQuestion'
        },
        selectedOption: String,
        answeredAt: Date,
        signature: String,  // Digital signature of the answer
        isVerified: {
            type: Boolean,
            default: false
        }
    }],
    sessionStatus: {
        startTime: {
            type: Date,
            default: Date.now
        },
        endTime: Date,
        lastActiveTime: {
            type: Date,
            default: Date.now
        },
        timeRemaining: Number,  // in seconds
        currentQuestionIndex: {
            type: Number,
            default: 0
        }
    },
    securityMetrics: {
        tabSwitches: {
            type: Number,
            default: 0
        },
        focusLosts: {
            type: Number,
            default: 0
        },
        warnings: {
            type: Number,
            default: 0
        },
        violations: [{
            type: {
                type: String,
                enum: ['TAB_SWITCH', 'FOCUS_LOSS', 'UNAUTHORIZED_ACCESS', 'MULTIPLE_WINDOWS']
            },
            timestamp: Date,
            details: String
        }]
    },
    deviceInfo: {
        userAgent: String,
        ipAddress: String,
        browserFingerprint: String,
        screenResolution: String,
        timezone: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ['CREATED', 'STARTED', 'IN_PROGRESS', 'COMPLETED', 'EXPIRED', 'TERMINATED'],
        default: 'CREATED'
    },
    result: {
        totalQuestions: Number,
        attemptedQuestions: Number,
        correctAnswers: Number,
        incorrectAnswers: Number,
        score: Number,
        percentage: Number,
        submittedAt: Date
    }
}, {
    timestamps: true
});

// Indexes
StudentExamSessionSchema.index({ studentId: 1, examId: 1 }, { unique: true });
StudentExamSessionSchema.index({ 'sessionStatus.startTime': 1 });
StudentExamSessionSchema.index({ status: 1 });

// Methods
StudentExamSessionSchema.methods.isSessionValid = function () {
    if (!this.isActive) return false;

    const maxSessionDuration = 4 * 60 * 60 * 1000; // 4 hours
    const currentDuration = Date.now() - this.sessionStatus.startTime;
    return currentDuration <= maxSessionDuration;
};

StudentExamSessionSchema.methods.recordViolation = function (violationType, details) {
    this.securityMetrics.violations.push({
        type: violationType,
        timestamp: new Date(),
        details
    });
    this.securityMetrics.warnings += 1;
    return this.save();
};

StudentExamSessionSchema.methods.submitAnswer = function (questionId, selectedOption, signature) {
    this.answers.push({
        questionId,
        selectedOption,
        answeredAt: new Date(),
        signature
    });
    this.sessionStatus.lastActiveTime = new Date();
    return this.save();
};

// Virtual for session duration
StudentExamSessionSchema.virtual('duration').get(function () {
    const end = this.sessionStatus.endTime || new Date();
    return end - this.sessionStatus.startTime;
});

const StudentExamSession = mongoose.model('StudentExamSession', StudentExamSessionSchema);

export default StudentExamSession;