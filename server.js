
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
global.fetch = fetch;

const { OpenAI } = require('openai');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

app.post('/ask', async (req, res) => {
  const { message } = req.body;
  console.log("👉 Received message from frontend:", message);

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'mistralai/mistral-7b-instruct',
      messages: [{ role: 'user', content: message }],
    });

    res.json({ reply: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("❌ Error from OpenRouter:", error);
    res.status(500).json({ error: 'Something went wrong with OpenRouter API.' });
  }
});

app.listen(port, () => {
  console.log(`✅ AI server is running at http://localhost:${port}`);
});

  

const express = require("express");
const App = express();
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let notes = [];

// Load notes from JSON file if needed
// if (fs.existsSync("notes.json")) {
//   notes = JSON.parse(fs.readFileSync("notes.json"));
// }

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  const newNote = { title, content, id: Date.now() };
  notes.push(newNote);

  // Optionally save to file
  // fs.writeFileSync("notes.json", JSON.stringify(notes));

  res.json({ message: "Note added successfully", note: newNote });
});

app.listen(3000, () => {
  console.log("✅ Notes server running on http://localhost:3000");
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let Notes = [];

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const { title, content, link } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content required' });

  const newNote = { id: Date.now(), title, content, link };
  notes.push(newNote);
  res.status(201).json({ message: 'Note added', note: newNote });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
