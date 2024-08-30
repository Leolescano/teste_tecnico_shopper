import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import { connectDB } from './config/database';
import uploadRouter from './routes/uploadRouter';
import confirmRouter from './routes/confirmRouter';
import listRouter from './routes/listRouter';


dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Defined' : 'Undefined');
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY is not set in the environment variables');
  process.exit(1);
} else {
  console.log('GEMINI_API_KEY is set:', apiKey.substring(0, 5) + '...');
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));

connectDB();

app.use('/upload', uploadRouter);
app.use('/confirm', confirmRouter);
app.use('/', listRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});