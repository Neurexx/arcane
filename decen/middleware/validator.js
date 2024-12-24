export const validateQuestion = (req, res, next) => {
    const { question, options } = req.body;
    if (!question || !options) {
        return res.status(400).json({ error: 'Invalid question format' });
    }
    next();
};