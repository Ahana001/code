import React, { useState } from 'react';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleAddNote = () => {
    if (title.trim() === '' || content.trim() === '') {
      return;
    }
    const newNote = {
      id: Date.now(),
      title,
      content,
    };
    setNotes([...notes, newNote]);
    setTitle('');
    setContent('');
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      handleDeleteNote(id);
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          data-testid="form-input"
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          data-testid="form-textarea"
        />
        <button
          type="button"
          onClick={handleAddNote}
          disabled={!title.trim() || !content.trim()}
          data-testid="form-submit-button"
        >
          Add Note
        </button>
      </form>
      <ul data-testid="notes-list">
        {notes.map((note) => (
          <li key={note.id}>
            {note.title} - {note.content}
            <button onClick={() => handleEditNote(note.id)} data-testid="edit-button">
              Edit
            </button>
            <button onClick={() => handleDeleteNote(note.id)} data-testid="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
