// const { verifySignature } = require('../utils/cryptography');
import { verifySignature } from '../utils/cryptography.js';
import connectToMongo from "../utils/dbConnect.js"

export const submitExam = async (req, res) => {
    try {
        const { answers, sessionId } = req.body;
        const { examId } = req.params;

        // Verify signatures and process submission
        const results = await verifySignature(answers, sessionId, examId);
        return res.json({ success: true, results });
    } catch (error) {
        return res.status(500).json({ error: "error while submitting answer" });
    }
};
export const getResults = async (req, res) => {
    try {
        const { examId } = req.params;
        // Fetch results from database
        await fetchResults(examId);
        return res.json({ success: true, results });

    } catch (error) {
        return res.status(500).json({ error: "erro while fetching results" });
    }
}

const fetchResults = async (examId) => {
    try {
        await connectToMongo();
        const Exam = mongoose.model("Exam");
        const results = await Exam.findOne({ examId });
        return results;

    } catch (error) {
        return res.status(500).json({ error: "error while fetching results" });
    }
}
