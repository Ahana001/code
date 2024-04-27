import React, { useState } from 'react';
import { Note } from '../../types/Note';
import NoteForm from './NoteForm';
import NoteTable from './NoteTable';

const NoteManager: React.FC = () => {
  const initialNote: Note = { id: 1, title: 'Initial Note', content: 'This is the initial note content.' };
  const [notes, setNotes] = useState<Note[]>([initialNote]);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  const handleAddNote = (note: Note) => {
    if (note.title.trim() === '' || note.content.trim() === '') {
      return; // Don't add if title or content is empty
    }
    setNotes([...notes, note]);
    setNoteToEdit(null); // Reset noteToEdit after adding
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEditNote = (editedNote: Note) => {
    setNotes(notes.map(note =>
      note.id === editedNote.id ? { ...note, title: editedNote.title, content: editedNote.content } : note
    ));
    setNoteToEdit(null); // Reset noteToEdit after editing
  };

  return (
    <div className="layout-column align-items-center justify-content-start" data-testid="note-manager">
      <NoteForm onSubmit={handleAddNote} noteToEdit={noteToEdit} />
      <NoteTable notes={notes} onDelete={handleDeleteNote} onEdit={setNoteToEdit} />
    </div>
  );
};

export default NoteManager;
