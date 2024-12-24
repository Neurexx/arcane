// const express = require('express');
import express from 'express';
const router = express.Router();
// const sessionController = require('../controllers/sessionController');
import { startSession, verifySession } from '../controllers/sessionController.js';

router.post('/start', startSession);
router.get('/verify/:sessionId', verifySession);

export default router;
