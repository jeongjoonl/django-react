
import React from 'react';

function Student({ data, onEdit, onDelete }) {

  function onEditClick(e) {
    e.preventDefault();
    onEdit();
  }

  function onDeleteClick(e) {
    e.preventDefault();
    onDelete();
  }

  console.log("Student render");
  return (
    <div className="Student">
      <h4>{data.name}</h4>
      <li>Age: {data.age}</li>
      <li>GPA: {data.gpa}</li>

      <input
        type="button"
        value="Edit"
        onClick={onEditClick}
      />

      <input
        type="button"
        value="Delete"
        onClick={onDeleteClick}
      />
    </div>
  );
}

export default Student;