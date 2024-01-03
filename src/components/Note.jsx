import React, { useState, useRef } from "react";
import styles from "../styles/Note.module.css";

export const Note = ({ id, x, y, content, handleDelete, handleEdit }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [noteContent, setNoteContent] = useState(content);
  const [isPinned, setIsPinned] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const noteRef = useRef(null);

  const handleMouseDown = (e) => {
    if (isPinned) return;

    setIsDragging(true);

    const boundingRect = noteRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - boundingRect.left,
      y: e.clientY - boundingRect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    noteRef.current.style.left = `${newX}px`;
    noteRef.current.style.top = `${newY}px`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSaveClick = () => {
    setIsEditing(true);
    handleEdit(id, noteContent);
  };

  const handleEditClick = () => {
    setIsEditing(false);
  };
  const handlePinned = () => {
    setIsPinned(!isPinned);
  };
  return (
    <div
      className={styles.cont}
      id={id}
      style={{
        top: `${y}px`,
        left: `${x}px`,
        cursor: isDragging ? "move" : "pointer",
        zIndex: isPinned ? 2 : 1,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={noteRef}
    >
      <div className={styles.topBtnCont}>
        <div className={styles.btnCont1}></div>
        <div className={styles.btnCont}>
          {isPinned ? (
            <button className={styles.pinned} onClick={handlePinned}>
              🔴
            </button>
          ) : (
            <button className={styles.pin} onClick={handlePinned}>
              🟤
            </button>
          )}
          <button className={styles.delBtn} onClick={() => handleDelete(id)}>
            X
          </button>
        </div>
      </div>
      {isEditing ? (
        <div className={styles.savedCont}>{noteContent}</div>
      ) : (
        <textarea
          placeholder="add a new note"
          className={styles.txt}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
      )}

      {isEditing ? (
        <button className={styles.editDel} onClick={handleEditClick}>
          Edit
        </button>
      ) : (
        <button className={styles.editDel} onClick={handleSaveClick}>
          Save
        </button>
      )}
    </div>
  );
};
