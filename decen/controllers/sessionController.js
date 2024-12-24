//const StudentExamSession = require('../models/StudentExamSession');
import StudentExamSession from '../models/UserSession.js';
//const { generateKeypair } = require('../utils/cryptography');
import { generateKeypair } from '../utils/cryptography.js';

export const startSession = async (req, res) => {
    try {
        const { studentId, examId } = req.body;
        const keypair = await generateKeypair();

        const session = new StudentExamSession({
            studentId,
            examId,
            publicKey: keypair.publicKey,
            encryptedPrivateKey: keypair.encryptedPrivateKey,
            // other session data...
        });

        await session.save();
        res.status(201).json({
            sessionId: session._id,
            publicKey: keypair.publicKey
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const verifySession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = await StudentExamSession.findById(sessionId);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        res.status(200).json({
            studentId: session.studentId,
            examId: session.examId,
            publicKey: session.publicKey,
            // other session data...
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 
