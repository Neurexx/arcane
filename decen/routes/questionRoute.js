// const express = require('express');
import express from 'express';
const router = express.Router();
//const questionController = require('../controllers/questionController.js');
import { storeQuestion, activateExam, getExamQuestions } from '../controllers/questionController.js';

router.post('/store', storeQuestion);
router.post('/activate', activateExam);
router.get('/:examId', getExamQuestions);

export default router;