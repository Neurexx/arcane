//const Exam = require('../models/exam.model');
//const ExamAttempt = require('../models/examAttempt.model');
//const Room = require('../models/room.model');
import Exam from '../models/exam.model';
import ExamAttempt from '../models/examAttempt.model';
import Room from '../models/room.model';

class ExamController {
  // Teacher methods
  async createExam(req, res) {
    try {
      const examData = { ...req.body, teacher: req.user.profileId };
      const exam = await Exam.create(examData);
      res.status(201).json(exam);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async publishExam(req, res) {
    try {
      const { examId } = req.params;
      const exam = await Exam.findByIdAndUpdate(
        examId,
        { status: 'published' },
        { new: true }
      );
      res.json(exam);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Student methods
  async startExam(req, res) {
    try {
      const { examId } = req.params;
      const studentId = req.user.profileId;

      const exam = await Exam.findById(examId);
      if (!exam || exam.status !== 'published') {
        throw new Error('Exam not available');
      }

      const attempt = await ExamAttempt.create({
        exam: examId,
        student: studentId
      });

      res.json(attempt);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async submitAnswer(req, res) {
    try {
      const { attemptId } = req.params;
      const { questionId, selectedOption } = req.body;

      const attempt = await ExamAttempt.findById(attemptId);
      const exam = await Exam.findById(attempt.exam);

      const question = exam.questions.id(questionId);
      const isCorrect = question.correctOption === selectedOption;

      attempt.answers.push({
        question: questionId,
        selectedOption,
        isCorrect
      });

      await attempt.save();
      res.json(attempt);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async submitExam(req, res) {
    try {
      const { attemptId } = req.params;

      const attempt = await ExamAttempt.findById(attemptId);
      const exam = await Exam.findById(attempt.exam);

      const score = attempt.answers.reduce((total, answer) => {
        return total + (answer.isCorrect ? exam.questions.id(answer.question).marks : 0);
      }, 0);

      attempt.status = 'submitted';
      attempt.endTime = new Date();
      attempt.score = score;
      await attempt.save();

      res.json(attempt);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}