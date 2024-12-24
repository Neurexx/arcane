//const express = require('express');
//const { authenticate, authorize } = require('../middleware/auth.middleware');
//const AuthController = require('../controllers/auth.controller');
//const ExamController = require('../controllers/exam.controller');

import express from 'express';
import AuthController from '../controllers/auth.controller';
import ExamController from '../controllers/exam.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = express.Router();
const authController = new AuthController();
const examController = new ExamController();

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Teacher routes
router.post('/exams', authenticate, authorize(['teacher']), examController.createExam);
router.put('/exams/:examId/publish', authenticate, authorize(['teacher']), examController.publishExam);

// Student routes
router.post('/exams/:examId/start', authenticate, authorize(['student']), examController.startExam);
router.post('/attempts/:attemptId/answer', authenticate, authorize(['student']), examController.submitAnswer);
router.post('/attempts/:attemptId/submit', authenticate, authorize(['student']), examController.submitExam);

//module.exports = router;
export default router;