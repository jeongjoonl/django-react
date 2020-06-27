import React from 'react';


function StudentList({studentList, selectedCategory, onViewStudent}) {
  let result = (<li>No Data</li>);
  let filteredStudentList = studentList;

  if (selectedCategory !== "all") {
    filteredStudentList = studentList.filter(student => (
      student.category === selectedCategory
    ));
  }

  if (filteredStudentList.length !== 0) {
    result = filteredStudentList.map(student => (
      <li key={student.id}>
        <a
          href="/"
          onClick={onViewStudent.bind(this, student.id)}
        >
          {student.name}
        </a>
      </li>
    ));
  }

  return (
    <nav>
      <ul>
        {result}
      </ul>
    </nav>
  );
}

export default StudentList;