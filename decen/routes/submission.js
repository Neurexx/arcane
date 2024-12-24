// src/routes/submissionRoute.js
// const express = require('express');
import express from 'express';
const router = express.Router();
//const submissionController = require('../controllers/submissionController');
import { submitExam, getResults } from '../controllers/submissionController.js';

router.post('/submit/:examId', submitExam);
router.get('/result/:examId', getResults);

export default router;