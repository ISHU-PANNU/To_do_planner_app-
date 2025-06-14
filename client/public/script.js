const form = document.getElementById("noteForm");
const notesContainer = document.getElementById("notesContainer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const res = await fetch("http://localhost:3000/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  const data = await res.json();
  addNoteToUI(data.note);
  form.reset();
});

function addNoteToUI(note) {
  const div = document.createElement("div");
  div.classList.add("note");
  div.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
  notesContainer.prepend(div);
}

async function fetchNotes() {
  const res = await fetch("http://localhost:3000/notes");
  const notes = await res.json();
  notes.forEach(addNoteToUI);
}

fetchNotes();
