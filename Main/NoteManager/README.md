The component must have the following functionalities:

• The type of input for the Note Title should be text.
• The initial view should have no notes in the list.
⚫ Clicking the Add Note button should:
。 add a note in the notes list with the Note Title, Note Content, an Edit button, and a Delete button
respectively.
• Do not add a note to the list if the input fields for either Note Title or Note Content are empty then keep the Add Note_button disabled.
• reset the input fields for the Note Title and Note Content to empty after adding a valid note to the list.
• Clicking the Delete button should delete the corresponding note from the list.
⚫ Clicking the Edit button should:
• populate the input fields with the selected note's title and content.
• change the text of the Add Note button to Update.
• should maintain the order of notes and update the note with new values after editing
The following types needs to be updated:

Туре
Properties
NoteFormProps onSubmit: (note: Note) => void,
noteToEdit(optional): Note
NoteTableProps notes: Note[], onDelete: (id:

NoteTableProps
NoteltemProps
notes: Note[], onDelete: (id: number) => void, onEdit: (note: Note) => void
note: Note, onDelete: (id: number) => void, onEdit: (note: Note) => void
Note
id: number, title: string, content: string
The following data-testid attributes are required in the components for the tests to pass:
Attribute
Component
form-input
Input box for note title
form-textarea
Textarea for note content
form-submit-
Button for adding/updating
button
note
notes-list
List of notes
Note:
• Components have data-testid attributes for test cases and certain classes and ids for rendering purposes. They should not be changed.
• The file that should be modified by the candidate is src/NoteManager.tsx and the other three components in their respective files.
• Avoid making changes to other files in the project structure.
Software Instructions
ChatGPT
