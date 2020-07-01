import React from 'react';

function StudentList(props) {
  const category = props.category;

  function onCreate() {
    props.history.push("/student/create");
  }

  return (
    <div>
      <h1>Student List: {category}</h1>
      <button type="button" onClick={onCreate}>Add</button>
    </div>
  );
}

export default StudentList;