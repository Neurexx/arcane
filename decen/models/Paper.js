import mongoose from "mongoose";

const PaperSchema = new mongoose.Schema({

    paperName: {
        type: String,
        required: true,
    },
    description: {
        type: String,

    },
    encryptedQuestions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Question',
    }

}, { timestamps: true });

const Paper = mongoose.model('Paper', PaperSchema);

export default Paper;