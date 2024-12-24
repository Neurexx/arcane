export const verifyStudent = async (req, res, next) => {
    try {
        const { sessionId } = req.headers;
        if (!sessionId) {
            return res.status(401).json({ error: 'No session provided' });
        }
        // Session verification logic
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid session' });
    }
};