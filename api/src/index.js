import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app=express()
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/exams', examRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/students', studentRouter);
app.use('/api/scheduler', schedulerRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
