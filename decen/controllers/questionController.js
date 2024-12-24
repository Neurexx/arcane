import Question from '../models/Questions.js';
import uniqid from 'uniqid';
import sss from 'shamirs-secret-sharing';

import { encrypt, decrypt, generateKey, generateIV } from '../utils/encryption.js';

export const storeQuestion = async (req, res) => {

    try {
        const { questionContents } = req.body;
        const examId = uniqid();
        const key = generateKey();
        const iv = generateIV();


        // Map through the array of questions and encrypt each one
        const questions = await Promise.all(questionContents.map(async (content) => {

            const encryptedQuestion = encrypt(content, key, iv);

            return new Question({
                encryptedQuestion,
                examId,
                key: key.toString('hex'),
                iv: iv.toString('hex')
            });
        }));

        // Save all questions to the database
        await Question.insertMany(questions);

        res.status(201).json({
            message: 'Questions stored successfully',
            examId,
            questionCount: questions.length
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "error while storing papers" });
    }
};

export const activateExam = async (req, res) => {
    try {
        const { examId } = req.body;

        const { key: enKey } = await Question.findOne({ _id: "6769cc4d0db4f117cc069d8b" })
        // Exam activation logic here
        const secret = Buffer.from(enKey);
        const shares = sss.split(secret, { shares: 3, threshold: 3 });
        const smallerShares = shares.slice(0, 2); // ["asdid9d9"]
        const recovered = sss.combine(smallerShares)

        console.log(shares.map(x => x.toString('hex')));
        console.log(recovered.toString()) // 'Encryption key'

        return res.json({ message: 'Exam activated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getExamQuestions = async (req, res) => {
    try {
        const { examId } = req.params;
        // Question retrieval logic here
        const questions = await Question.find({ _id: examId });
        const decryptedQuestions = questions.map(question => {
            let { encryptedQuestion, key, iv } = question;
            key = Buffer.from(key, 'hex');
            iv = Buffer.from(iv, 'hex');
            const decryptedQuestion = decrypt(encryptedQuestion, key, iv);
            return decryptedQuestion;
        });
        console.log(decryptedQuestions)
        res.json({ questions: decryptedQuestions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

