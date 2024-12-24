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
