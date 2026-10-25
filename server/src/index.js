import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import XLSX from 'xlsx';
import { Inquiry } from './models/Inquiry.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const clientDistDirectory = path.resolve(currentDirectory, '../../client/dist');
const visitorQuestionsFile = path.resolve(currentDirectory, '../data/visitor-questions.xlsx');
const visitorQuestionHeaders = ['Submitted at', 'Visitor name', 'Mobile number', 'Question', 'Question source'];
let questionWorkbookQueue = Promise.resolve();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'swadeshi-innovators-api', database: mongoose.connection.readyState === 1 ? 'connected' : 'fallback' });
});

function spreadsheetSafe(value) {
  const text = String(value ?? '').trim();
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

async function saveVisitorQuestion(question) {
  await fs.promises.mkdir(path.dirname(visitorQuestionsFile), { recursive: true });

  const workbook = fs.existsSync(visitorQuestionsFile)
    ? XLSX.readFile(visitorQuestionsFile)
    : XLSX.utils.book_new();
  let worksheet = workbook.Sheets.Questions;

  if (!worksheet) {
    worksheet = XLSX.utils.aoa_to_sheet([visitorQuestionHeaders]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Questions');
  }

  const nextRow = XLSX.utils.decode_range(worksheet['!ref'] || 'A1').e.r + 1;
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [[
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      spreadsheetSafe(question.name),
      question.mobile,
      spreadsheetSafe(question.question),
      question.source,
    ]],
    { origin: `A${nextRow + 1}` },
  );

  XLSX.writeFile(workbook, visitorQuestionsFile);
}

app.post('/api/visitor-questions', async (req, res) => {
  const { name, mobile, question, source = 'typed' } = req.body;
  const cleanName = typeof name === 'string' ? name.trim() : '';
  const cleanMobile = typeof mobile === 'string' ? mobile.replace(/\s|-/g, '') : '';
  const cleanQuestion = typeof question === 'string' ? question.trim() : '';

  if (!cleanName || cleanName.length > 100 || !/^\+?[1-9]\d{7,14}$/.test(cleanMobile) || !cleanQuestion || cleanQuestion.length > 2000) {
    return res.status(400).json({ message: 'Please enter your name, a valid mobile number, and your question.' });
  }

  const visitorQuestion = {
    name: cleanName,
    mobile: cleanMobile,
    question: cleanQuestion,
    source: source === 'voice' ? 'voice' : 'typed',
  };

  try {
    // Queue writes so simultaneous event submissions do not overwrite one another.
    questionWorkbookQueue = questionWorkbookQueue
      .catch(() => undefined)
      .then(() => saveVisitorQuestion(visitorQuestion));
    await questionWorkbookQueue;
    return res.status(201).json({ message: 'Thank you! We have received your question and will reply on WhatsApp.' });
  } catch (error) {
    console.error('Unable to save visitor question:', error);
    return res.status(500).json({ message: 'Your question could not be saved. Please try again or speak with our team.' });
  }
});

app.post('/api/inquiries', async (req, res) => {
  const { name, email, message = '' } = req.body;
  const emailIsValid = typeof email === 'string' && /^\S+@\S+\.\S+$/.test(email);

  if (!name?.trim() || !emailIsValid) {
    return res.status(400).json({ message: 'Please provide a name and a valid email address.' });
  }

  const inquiry = { name: name.trim(), email: email.trim().toLowerCase(), message: message.trim() };

  if (mongoose.connection.readyState === 1) {
    await Inquiry.create(inquiry);
  } else {
    console.info('[inquiry:fallback]', inquiry);
  }

  return res.status(201).json({ message: 'Thanks — the Swadeshi Innovators team will be in touch.' });
});

// Production hosting: Render starts this Express server after `npm run build` creates client/dist.
// Static files are served directly, while frontend URLs load the React single-page app.
if (fs.existsSync(clientDistDirectory)) {
  app.use(express.static(clientDistDirectory));
  app.get('*', (_req, res) => res.sendFile(path.join(clientDistDirectory, 'index.html')));
} else {
  console.warn(`Client build not found at ${clientDistDirectory}. Run \`npm run build\` before starting the production server.`);
}

async function startServer() {
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.info('MongoDB connected');
    } catch (error) {
      console.warn(`MongoDB unavailable; running in fallback mode: ${error.message}`);
    }
  } else {
    console.info('MONGO_URI not set; inquiries will be logged in fallback mode.');
  }

  app.listen(port, () => console.info(`API listening on http://localhost:${port}`));
}

startServer();
