import React, { useState, useEffect } from 'react';
import "./index.css";
import { Note } from '../../types/Note';

export interface NoteFormProps {
  onSubmit: (note: Note) => void;
  noteToEdit?: Note | null;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, noteToEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    }
  }, [noteToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: Date.now(), title, content }); // Generate unique id using timestamp
    setTitle('');
    setContent('');
  };

  return (
    <div className="layout-column align-items-center justify-content-start" data-testid="note-form">
      <div className="card w-200 pt-30 pb-8 mt-15 mb-15">
        <form onSubmit={handleSubmit}>
          <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
            <label className="form-title-label">Title:</label>
            <input
              type="text" // Changed to text type
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              data-testid="form-input"
            />
          </section>
          <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
            <label className="form-content-label">Content:</label>
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-textarea"
              data-testid="form-textarea"
            />
          </section>
          <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
            <button data-testid="form-submit-button" type="submit" disabled={!title.trim() || !content.trim()}>
              {noteToEdit ? 'Update' : 'Add'}
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
