//const express = require('express');
import express from 'express';
const app = express();

// const questionRoutes = require('./routes/questionRoute.js');
// const sessionRoutes = require('./routes/sessionRoute');
// const submissionRoutes = require('./routes/submissionRoute');
import questionRoutes from './routes/questionRoute.js';
import sessionRoutes from './routes/sessionRoute.js';
import submitExam from './routes/submission.js';
import connectToMongo from './utils/dbConnect.js';

app.use(express.json());
app.use('/api/questions', questionRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/submissions', submitExam);

connectToMongo().then(() => {
    app.listen(6969, () => {
        console.log('Server is running on port 6969');
    });
})
