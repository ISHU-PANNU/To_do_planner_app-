const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let notes = []; // Temporary storage (use DB later if needed)

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Note content is required' });

  const newNote = {
    id: Date.now(),
    content
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

app.listen(PORT, () => {
  console.log(`✅ AI server is running at http://localhost:${PORT}`);
});
