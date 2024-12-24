router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Teacher routes
router.post('/exams', authenticate, authorize(['teacher']), examController.createExam);
router.put('/exams/:examId/publish', authenticate, authorize(['teacher']), examController.publishExam);

// Student routes
router.post('/exams/:examId/start', authenticate, authorize(['student']), examController.startExam);
router.post('/attempts/:attemptId/answer', authenticate, authorize(['student']), examController.submitAnswer);
router.post('/attempts/:attemptId/submit', authenticate, authorize(['student']), examController.submitExam);

module.exports = router;
