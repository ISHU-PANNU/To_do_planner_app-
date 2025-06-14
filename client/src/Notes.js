import React, { useState, useEffect } from 'react';
import './Notes.css';

const Notes = () => {
  const [note, setNote] = useState('');
  const [noteList, setNoteList] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/notes');
      const data = await response.json();
      setNoteList(data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  const addNote = async () => {
    if (!note.trim()) return;
    try {
      const response = await fetch('http://localhost:3000/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: note })
      });
      const newNote = await response.json();
      setNoteList([newNote, ...noteList]);
      setNote('');
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="notes-container">
      <h2>📝 Notes & Resources</h2>
      <textarea
        placeholder="Write a note or paste a link/resource..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button onClick={addNote}>➕ Add Note</button>

      <ul className="note-list">
        {noteList.map((n) => (
          <li key={n.id}>{n.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
