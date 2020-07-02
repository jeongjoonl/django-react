import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Student(props) {
  const location = useLocation();
  const [student, setStudent] = useState({});
  
  useEffect(() => {
    axios
      .get(location.pathname)
      .then(response => setStudent(response.data));
  }, [location]);

  function onEdit() {
    props.history.push("/student/edit", {data: {...student}});
  }

  function onDelete() {

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