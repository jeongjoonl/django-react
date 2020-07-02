import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Student(props) {
  const [student, setStudent] = useState({});
  
  useEffect(() => {
    axios
      .get(props.location.pathname)
      .then(response => setStudent(response.data));
  }, [props.location]);

  function onEdit() {
    props.history.push("/student/edit", {data: {...student}});
  }

  function onDelete() {
    const previousPageCategory = props.location.state.category;
    const redirectURL = previousPageCategory === "all" ? "/" : `/${previousPageCategory}/`;

    axios
      .delete(props.location.pathname)
      .then(() => props.history.replace(redirectURL));
  }

  return (
    <div>
      <h2>{student.name}</h2>
      <p>Age: {student.age}</p>
      <p>GPA: {student.gpa}</p>

      <button
        type="button"
        onClick={onEdit}
      >
        Edit
      </button>
      <button
        type="button"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default Student;