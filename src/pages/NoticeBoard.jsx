import React, { useState } from "react";
import styles from "../styles/Notice.module.css";
import { Note } from "../components/Note";

export const NoticeBoard = () => {
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    const newNote = {
      id: +Date.now(),
      content: "",
      x: 50,
      y: 50,
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((el) => el.id !== id);
    setNotes(updatedNotes);
  };

  const editNote = (id, newContent) => {
    const updatedNotes = notes.map((el) =>
      el.id === id ? { ...el, content: newContent } : el
    );
    setNotes(updatedNotes);
  };

  return (
    <div className={styles.main}>
      <button className={styles.addBtn} onClick={addNote}>
        +
      </button>
      {notes.map((el) => (
        <Note
          key={el.id}
          id={el.id}
          x={el.x}
          y={el.y}
          content={el.content}
          handleDelete={deleteNote}
          handleEdit={editNote}
        />
      ))}
    </div>
  );
};
